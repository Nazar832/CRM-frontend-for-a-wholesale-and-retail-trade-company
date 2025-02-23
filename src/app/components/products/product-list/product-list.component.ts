import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product.model';
import { ProductsService } from '../../../services/products/products.service';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-product-list',
  imports: [TableComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: IProduct[] | undefined = [];

  constructor(private productsService: ProductsService, private router: Router) {}

  public ngOnInit(): void {
    this.productsService.getProducts().subscribe(products => this.products = products);
  }

  navigateToProduct(product: IProduct): void {
    this.router.navigate(['products', product._id]);
  }

  navigateToCreateProduct(): void {
    this.router.navigate(['products/create']);
  }
}
