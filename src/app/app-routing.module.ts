import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { RegisterComponent } from './register/register.component';
import { ProtectedComponent } from './protected/protected.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

const routes: Routes = [   
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'my/orders', component: MyOrdersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AngularFireAuthGuard] },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
