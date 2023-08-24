import { Component, inject} from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  firestore: Firestore = inject(Firestore);
  categories$: Observable<any[]> | undefined;
  constructor() {
    const aCollection = collection(this.firestore, 'categories')
    this.categories$ = collectionData(aCollection);
    }

    async save(product: any) {
      try {
        const productsCollection = collection(this.firestore, 'products');
        await addDoc(productsCollection, product);
        console.log('Product saved successfully:', product);
      } catch (error) {
        console.error('Error saving product:', error);
      }
    }
}

