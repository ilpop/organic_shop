import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: Firestore) { }

  async saveProduct(product: any) {
    try {
      const productsCollection = collection(this.firestore, 'products');
      await addDoc(productsCollection, product);
      console.log('Product saved successfully:', product);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  }
}

