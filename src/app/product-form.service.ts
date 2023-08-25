// product-form.service.ts

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './product.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {
  productForm: FormGroup;
  categories$: Observable<any[]>;
  successMessage$ = new BehaviorSubject<string | null>(null);
  errorMessage$ = new BehaviorSubject<string | null>(null);

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService,
    private firestore: AngularFirestore) {
    
      this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.*$/)]]
    });
    this.categories$ = this.firestore.collection('/categories').valueChanges();
    console.log(this.categories$);
  }

  getCategories(): Observable<any[]> {
    return this.firestore.collection('/categories').valueChanges();
  }

  async saveProduct() {
    if (this.productForm.valid) {
      try {
        await this.productService.saveProduct(this.productForm.value);
        this.successMessage$.next('Product saved successfully!');
        this.productForm.reset();
        setTimeout(() => {
          this.successMessage$.next(null); // Reset the success message after a delay
        }, 2000);
      } catch (error) {
        this.errorMessage$.next('Error saving product. Please try again.');
      }
    }
    
  }

  initializeProductForm(product: any | null): void {
    this.productForm.setValue({
      title: product ? product.title : '',
      price: product ? product.price : '',
      category: product ? product.category : '',
      imageUrl: product ? product.imageUrl : ''
    });
  }

}