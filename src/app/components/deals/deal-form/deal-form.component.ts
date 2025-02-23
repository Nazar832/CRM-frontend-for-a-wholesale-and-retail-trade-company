import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DealsService } from '../../../services/deals/deals.service';
import { ProductsService } from '../../../services/products/products.service';
import { IProduct } from '../../products/product.model';
import { map, Observable, startWith } from 'rxjs';
import { IBuyer } from '../../buyers/buyer.model';
import { BuyersService } from '../../../services/buyers/buyers.service';
import { MatFormField } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { IDealExtended, Product } from '../deal.model';

@Component({
  selector: 'app-deal-form',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormField, MatAutocompleteModule, MatInputModule],
  templateUrl: './deal-form.component.html',
  styleUrl: './deal-form.component.css'
})
export class DealFormComponent {
  productForm: FormGroup;
  totalPrice = 0;
  statuses = ['unpaid', 'paid'];
  products_: IProduct[] = [];
  buyers: IBuyer[] = [];
  deal?: IDealExtended;
  isChangeForm = false;
  wholesaleNumber = 100;

  buyerCtrl = new FormControl();
  filteredBuyers: Observable<IBuyer[]>;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private buyersService: BuyersService,
    private dealsService: DealsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      buyer: this.buyerCtrl,
      status: ['unpaid', Validators.required],
      products: this.fb.array([this.createProduct()])
    });

    this.filteredBuyers = this.buyerCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterBuyers(value))
    );
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadProducts();
    this.loadBuyers();
    this.subscribeToProductChanges();
  }

  private initializeForm(): void {
    if (!this.router.url.endsWith('change')) return;

    this.statuses.push('cancelled');
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.isChangeForm = true;

    this.dealsService.getDealById(id).subscribe(deal => {
      this.deal = deal;
      this.buyerCtrl.setValue(deal.buyer.name);
      this.productForm.patchValue({ status: deal.status });
      this.setProducts(deal.products);
    });
  }

  private loadProducts(): void {
    this.productsService.getProducts().subscribe(products => (this.products_ = products));
  }

  private loadBuyers(): void {
    this.buyersService.getBuyers().subscribe(buyers => {
      this.buyers = buyers;
      this.buyerCtrl.setValue(this.buyerCtrl.value);
    });
  }

  private subscribeToProductChanges(): void {
    this.products.valueChanges.subscribe(() => this.updateTotalPrice());
  }

  get products(): FormArray {
    return this.productForm.get('products') as FormArray;
  }

  filterBuyers(name: string | null): IBuyer[] {
    if (!name) return this.buyers;
    return this.buyers?.filter(buyer =>
      buyer.name?.toLowerCase().startsWith(name.toLowerCase())
    );
  }


  private createProduct(product: any = {}): FormGroup {
    return this.fb.group({
      product: [product.product || '', Validators.required],
      amount: [product.amount || 1, [Validators.required, Validators.min(1)]]
    });
  }

  private setProducts(products: Product[] | undefined): void {
    this.products.clear();
    products?.forEach(product => this.products.push(this.createProduct(product)));
  }

  addProduct(): void {
    this.products.push(this.createProduct());
  }

  removeProduct(index: number): void {
    if (this.products.length > 1) this.products.removeAt(index);
  }

  submitForm(): void {
    if (!this.productForm.valid || !this.buyerCtrl.value) return;

    const isWholesale = this.products.controls.every(p => p.value.amount >= this.wholesaleNumber);
    const isRetail = this.products.controls.every(p => p.value.amount < this.wholesaleNumber);

    if (!isWholesale && !isRetail) return alert('The deal cannot be both wholesale and retail');

    const buyerPhone = this.buyers.find(buyer => buyer.name === this.buyerCtrl.value)?.phoneNumber;
    if (!buyerPhone) return alert("There's no such buyer");

    const data = { ...this.productForm.value, buyerPhone, totalPrice: this.totalPrice, isWholesale };
    const request = this.isChangeForm
      ? this.dealsService.updateDeal(this.deal?._id, data)
      : this.dealsService.createDeal(data);

    request.subscribe(() => this.router.navigate(['deals']));
  }

  private updateTotalPrice(): void {
    let total = 0;
    let discount = 0;

    this.products.controls.forEach(control => {
      const selectedProduct = this.products_.find(p => p.name === control.value.product);
      const amount = control.value.amount || 0;
      if (!selectedProduct) return;

      const price = amount >= this.wholesaleNumber ? selectedProduct.wholesalePrice : selectedProduct.retailPrice;
      total += price! * amount;
      discount += this.calculateDiscount(price!, amount);
    });

    total -= discount;
    if (total > 10000) total *= 0.9;
    else if (total > 5000) total *= 0.95;

    this.totalPrice = total;
  }

  private calculateDiscount(price: number, amount: number): number {
    if (amount > 500) return price * amount * 0.2;
    if (amount > 200) return price * amount * 0.1;
    return 0;
  }

  cancel(): void {
    this.router.navigate(['deals', this.isChangeForm ? this.activatedRoute.snapshot.paramMap.get('id') : '']);
  }

  reset(): void {
    this.products.clear();
    this.products.push(this.createProduct());
  }
}
