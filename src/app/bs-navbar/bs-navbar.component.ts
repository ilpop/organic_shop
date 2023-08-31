import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { User } from 'firebase/auth';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: ' bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  user$: User | undefined;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { 

}

async ngOnInit() {
  this.auth.user.subscribe(async (user) => {
    this.user$ = user;  });

    this.cart$ = await this.shoppingCartService.getCart();
  
}

  logout() {
    this.auth.logout();
  }
}
