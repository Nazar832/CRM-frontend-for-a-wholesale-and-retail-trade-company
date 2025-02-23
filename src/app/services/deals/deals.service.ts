import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDeal, IDealExtended } from '../../components/deals/deal.model';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  constructor(private http: HttpClient) { }

  public getDeals(): Observable<IDeal[]> {
    return this.http.get<IDeal[]>('http://localhost:3000/deals');
  }

  public getDealById(id: string | null): Observable<IDealExtended> {
    return this.http.get<IDealExtended>(`http://localhost:3000/deals/${id}`);
  }

  public createDeal(dealData: IDeal): Observable<object> {
    return this.http.post<object>('http://localhost:3000/deals', dealData);
  }

  public updateDeal(id: string | undefined, dealData: IDeal): Observable<object> {
    return this.http.patch<object>(`http://localhost:3000/deals/${id}`, dealData);
  }

  public downloadInvoice(id: string | undefined): Observable<Blob> {
    return this.http.get(`http://localhost:3000/invoices/${id}`, {
      responseType: 'blob'
    });
  }
}
