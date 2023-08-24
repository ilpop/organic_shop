import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private firestore: Firestore) { }

  getCategories(): Observable<any[]> {
    const categoriesCollection = collection(this.firestore, 'categories');
    return collectionData(categoriesCollection);
  }
}

