import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { User } from 'firebase/auth';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: ' bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  user$: User | undefined;
  shoppingCartItemCount: number = 0;


  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { 
}
async ngOnInit() {
  this.auth.user.subscribe((user) => {
    this.user$ = user;
  });
  let cart$ = await this.shoppingCartService.getCart();
  cart$.valueChanges().subscribe((cart: any) => {
    this.shoppingCartItemCount = 0;
    for(let productId in cart.items) {
      this.shoppingCartItemCount += cart.items[productId].quantity;
    }
  });
}
  logout() {
    this.auth.logout();
  }
}
