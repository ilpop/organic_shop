import { Product } from 'src/app/models/product';
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
import { AngularFireAuthGuard, canActivate } from '@angular/fire/compat/auth-guard';
import { AuthGuard } from './auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';

const routes: Routes = [   
  { path: '', component: ProductsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },


  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard]},
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },

  { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard]},
  { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard]},
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard] },

  { path: 'protected', component: ProtectedComponent, canActivate: [AngularFireAuthGuard] },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
