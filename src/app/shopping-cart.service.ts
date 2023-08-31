import { Injectable } from '@angular/core';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Product } from './models/product';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

@Injectable()
export class ShoppingCartService {
  cartComponent: ShoppingCartComponent;

  constructor(private firestore: AngularFireDatabase) {}

  private create() {
    return this.firestore.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.firestore.object('/shopping-carts/' + cartId).valueChanges().pipe(
      map((x: ShoppingCart) => new ShoppingCart(x.items))
    );
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
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.productId);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item) item$.update({ quantity: item.quantity + change });
        else item$.set({ product: product, quantity: 1 });
      });
  }
}
