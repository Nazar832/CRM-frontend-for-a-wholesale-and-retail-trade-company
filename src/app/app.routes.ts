import { Routes } from '@angular/router';
import { DealListComponent } from './components/deals/deal-list/deal-list.component';
import { DealFormComponent } from './components/deals/deal-form/deal-form.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { BuyerListComponent } from './components/buyers/buyer-list/buyer-list.component';
import { BuyerFormComponent } from './components/buyers/buyer-form/buyer-form.component';
import { BuyerDetailsComponent } from './components/buyers/buyer-details/buyer-details.component';
import { Error404Component } from './components/error-404/error-404.component';
import { DealDetailsComponent } from './components/deals/deal-details/deal-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: '', redirectTo: 'deals', pathMatch: 'full' },
  { path: 'deals', component: DealListComponent },
  { path: 'deals/create', component: DealFormComponent },
  { path: 'deals/:id', component: DealDetailsComponent },
  { path: 'deals/:id/change', component: DealFormComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/create', component: ProductFormComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'products/:id/change', component: ProductFormComponent },
  { path: 'buyers', component: BuyerListComponent },
  { path: 'buyers/create', component: BuyerFormComponent },
  { path: 'buyers/:id', component: BuyerDetailsComponent },
  { path: 'buyers/:id/change', component: BuyerFormComponent },
  { path: 'not-found', component: Error404Component },
  { path: '**', redirectTo: 'deals', pathMatch: 'full' },
];
