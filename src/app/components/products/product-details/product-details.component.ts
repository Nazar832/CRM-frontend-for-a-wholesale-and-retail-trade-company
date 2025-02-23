import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product.model';
import { ProductsService } from '../../../services/products/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  public product?: IProduct;

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    this.productsService.getProductById(id).subscribe(product => this.product = product);
  }

  public deleteProduct(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    this.productsService.deleteProduct(id).subscribe(() => this.router.navigate(['/products']));
  }

  public navigateOnChange(id: string | undefined): void {
    this.router.navigate(['products', id, 'change']);
  }
}
