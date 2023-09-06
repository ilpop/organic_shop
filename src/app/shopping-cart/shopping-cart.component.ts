import { Component, Inject, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  shoppingCartItemCount;
  tableData = [];
  prices = [];
  quantities = [];

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();

    this.cart$.subscribe((cart: any) => {
      this.shoppingCartItemCount = 0;
      const cartInfo = {
        items: cart.items,
        // Add any other properties you want to log here
      };
      console.log(cartInfo); // Log the cart information
      for (let productId in cart.items) {
        this .shoppingCartItemCount += cart.items[productId].quantity;
          this.tableData = this.transformCartToTableData(cart.items);
        
      }
    });
  }
  private transformCartToTableData(cartItems: {
    [productId: string]: ShoppingCartItem;
  }) {
    // Iterate through cart items and transform them into the desired format
    const data = [];

    for (const productId in cartItems) {
      const cartItem = cartItems[productId];
      if (cartItems[productId].quantity > 0) {
      const row = {
        title: cartItem.product.title,
        quantity: cartItem.quantity,
        price: cartItem.product.price * cartItem.quantity,
      };
    
      data.push(row);
    }
  }

    return data;
  }
}
