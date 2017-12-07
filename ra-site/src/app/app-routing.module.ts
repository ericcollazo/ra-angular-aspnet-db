import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components to route
import {DashboardComponent}   from './dashboard/dashboard.component';
import {ProductsComponent} from '../app/products/products.component';
import {ProductDetailComponent} from '../app/product-detail/product-detail.component';

// Routes
const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: ProductDetailComponent},
  {path: 'products', component: ProductsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}