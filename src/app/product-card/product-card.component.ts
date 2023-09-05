import { ShoppingCartService } from './../shopping-cart.service';

import { ProductFormComponent } from './../admin/product-form/product-form.component';
import { Component, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  //@Input('productForm.control') productForm: ProductFormComponent;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);

    }

    getQuantity() {
      if(!this.shoppingCart) return 0;
     let item = this.shoppingCart.items[this.product.productId];
     return item ? item.quantity: 0;
    }
}
