import { Injectable } from '@angular/core';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from './models/product';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ShoppingCartService {
  cartComponent: ShoppingCartComponent;

  constructor(private firestore: AngularFireDatabase) {}

  private create() {
    return this.firestore.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.firestore.object('/shopping-carts/' + cartId).valueChanges()
  }

  private getItem(cartId: string, productId: string) {
    return this.firestore.object(
      '/shopping-carts/' + cartId + '/items/' + productId
    );
  }

  private async getOrCreateCartId(): Promise<string> {
    console.log('Add to cart clicked');
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.productId);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item) item$.update({ quantity: item.quantity + 1 });
        else item$.set({ product: product, quantity: 1 });
      });
  }
}
