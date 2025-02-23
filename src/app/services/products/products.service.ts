import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../components/products/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:3000/products');
  }

  public getProductById(id: string | null): Observable<IProduct> {
    return this.http.get<IProduct>(`http://localhost:3000/products/${id}`);
  }

  public deleteProduct(id: string | null): Observable<object> {
    return this.http.delete<object>(`http://localhost:3000/products/${id}`);
  }

  public createProduct(productData: IProduct): Observable<object> {
    return this.http.post<object>('http://localhost:3000/products', productData);
  }

  public updateProduct(id: string | null, productData: IProduct): Observable<object> {
    return this.http.patch<object>(`http://localhost:3000/products/${id}`, productData);
  }
}
