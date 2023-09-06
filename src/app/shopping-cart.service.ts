import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Product } from './models/product';
import { map, take } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .valueChanges()
    .pipe(map((data: any) => new ShoppingCart(data?.items)));
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

      let result = await this.create();
        localStorage.setItem('cartId', result.key);
        return result.key;  
  }

  // async addToCart(product: Product) {
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.productId);
  //   item$
  //   .valueChanges()
  //   .pipe(take(1))
  //   .subscribe((item: any) => {
  //     if(item) item$.update({ quantity: item.quantity + 1 });
  //     else item$.set({ product: product, quantity: 1 });
  //   });
  // }

  // async removeFromCart(product: Product) {
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.productId);
  //   item$
  //   .valueChanges()
  //   .pipe(take(1))
  //   .subscribe((item: any) => {
  //     if(item) item$.update({ quantity: item.quantity - 1 });
  //     else item$.set({ product: product, quantity: 1 });
  //   });
  // } 

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.productId);
    item$
    .valueChanges()
    .pipe(take(1))
    .subscribe((item: any) => {
      if(item) item$.update({ quantity: (item.quantity || 0) + change });
      else item$.set({ product: product, quantity: 1 });
    });

  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }
}
