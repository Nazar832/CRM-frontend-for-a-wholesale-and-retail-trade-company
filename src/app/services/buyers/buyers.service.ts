import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBuyer, IBuyerDetailed } from '../../components/buyers/buyer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyersService {

  constructor(private http: HttpClient) { }

  public getBuyers(): Observable<IBuyer[]> {
    return this.http.get<IBuyer[]>('http://localhost:3000/buyers');
  }

  public getBuyerById(id: string | null): Observable<IBuyerDetailed> {
    return this.http.get<IBuyerDetailed>(`http://localhost:3000/buyers/${id}`);
  }

  public deleteBuyer(id: string | null): Observable<object> {
    return this.http.delete<object>(`http://localhost:3000/buyers/${id}`);
  }

  public createBuyer(buyerData: IBuyer): Observable<object> {
    return this.http.post<object>('http://localhost:3000/buyers', buyerData);
  }

  public updateBuyer(id: string | null, buyerData: IBuyer): Observable<object> {
    return this.http.patch<object>(`http://localhost:3000/buyers/${id}`, buyerData);
  }
}
