import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable()
export class ShoppingCartService {
  cartComponent: ShoppingCartComponent;

  constructor(private firestore: AngularFireDatabase ) { }


   create()  {
   return this.firestore.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
   })
  
    }
  
}
