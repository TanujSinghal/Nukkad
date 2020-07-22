import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PasswordModule} from 'primeng/password';
import {BlockUIModule} from 'primeng/blockui';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {StepsModule} from 'primeng/steps';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {ListboxModule} from 'primeng/listbox';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputNumberModule} from 'primeng/inputnumber';
import {TabViewModule} from 'primeng/tabview';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ToastModule} from 'primeng/toast';
import {MultiSelectModule} from 'primeng/multiselect';
import {FieldsetModule} from 'primeng/fieldset';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {PanelModule} from 'primeng/panel';
import {DynamicDialogModule} from 'primeng/dynamicdialog';

import { HttpConfigInterceptor} from './interceptor/httpconfig.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from 'primeng/api';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProductsComponent,
    StockComponent,
    OrdersComponent,
    CatalogueComponent,
    CartComponent,
    LoginbComponent,
    SignupbComponent,
    LoginPopupComponent,
    SignupPopupComponent,
    OrderSuccessComponent,
    OrderDetailComponent,
    OrderListComponent,
    OrderProcessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SidebarModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    PasswordModule,
    BlockUIModule,
    ProgressSpinnerModule,
    StepsModule,
    DropdownModule,
    CheckboxModule,
    ListboxModule,
    InputSwitchModule,
    InputNumberModule,
    TabViewModule,
    SelectButtonModule,
    ToastModule,
    MultiSelectModule,
    FieldsetModule,
    DataViewModule,
    DialogModule,
    PanelModule,
    DynamicDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
