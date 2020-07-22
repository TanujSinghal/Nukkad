import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { StockComponent } from './stock/stock.component';
import { OrdersComponent } from './orders/orders.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CartComponent } from './cart/cart.component';
import { LoginbComponent } from './loginb/loginb.component';
import { SignupbComponent } from './signupb/signupb.component';
import { LoginPopupComponent } from './popup/login-popup/login-popup.component';
import { SignupPopupComponent } from './popup/signup-popup/signup-popup.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderProcessComponent } from './order-process/order-process.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup/:mobile', component: SignupComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'stock', component: StockComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'order-process/:orderId/:status', component: OrderProcessComponent },
  { path: 'catalogue/:sellerId', component: CatalogueComponent },
  { path: 'login-b', component: LoginbComponent },
  { path: 'signup-b/:mobile', component: SignupbComponent },
  { path: 'signup-b', component: SignupbComponent },
  { path: 'cart/:sellerId', component: CartComponent },
  { path: 'login-popup', component: LoginPopupComponent },
  { path: 'signup-popup', component: SignupPopupComponent },
  { path: 'order-success/:orderId', component: OrderSuccessComponent },
  { path: 'order-detail/:orderId', component: OrderDetailComponent },
  { path: 'order-list', component: OrderListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
