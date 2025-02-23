import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  name?: string;
  wholesalePrice?: number;
  retailPrice?: number;
  description?: string;
  isChangeForm: boolean = false;

  constructor(private productsService: ProductsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.name = '';
    this.wholesalePrice = 0.01;
    this.retailPrice = 0.01;
    this.description = '';
  }

  public ngOnInit(): void {
    if (this.router.url.endsWith('change')) {
      const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
      this.isChangeForm = true;

      this.productsService.getProductById(id).subscribe(product => {
        this.name = product.name;
        this.wholesalePrice = product.wholesalePrice;
        this.retailPrice = product.retailPrice;
        this.description = product.description;
      })
    };
  }

  createProduct(): void {
    this.productsService.createProduct({
      name: this.name,
      wholesalePrice: this.wholesalePrice,
      retailPrice: this.retailPrice,
      description: this.description
    }).subscribe(() => this.router.navigate(['products']));
  }

  change(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    this.productsService.updateProduct(id, {
      name: this.name,
      wholesalePrice: this.wholesalePrice,
      retailPrice: this.retailPrice,
      description: this.description
    }).subscribe(() => this.router.navigate(['products', id]));
  }

  cancelCreation(): void {
    this.router.navigate(['products']);
  }

  cancelUpdating(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    this.router.navigate(['products', id]);
  }
}

