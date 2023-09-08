import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

  getAll(): Observable<any[]> {
    const productsCollection = collection(this.firestore, 'products')
    return collectionData(productsCollection, { idField: 'productId' });
  }

  async get(productId: string): Promise<any | undefined> {
    try {
      const productDocRef = doc(this.firestore, 'products', productId);
      const productSnapshot = await getDoc(productDocRef);
      if (productSnapshot.exists()) {
        return productSnapshot.data();
      } else {
        console.log(`Product with ID ${productId} not found.`);
        return undefined;
      }
    } catch (error) {
      console.error('Error getting product:', error);
      return undefined;
    }
  }


  async updateProduct(productId: string, updatedProduct: any) {
    try {
      const productDocRef = doc(this.firestore, 'products', productId);
      await updateDoc(productDocRef, updatedProduct);
      console.log('Product updated successfully:', updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  async deleteProduct(productId: string) {
    try {
      const productDocRef = doc(this.firestore, 'products', productId);
      await deleteDoc(productDocRef);
      console.log(`Product with ID ${productId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
}

