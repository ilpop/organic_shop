import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './product.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductFormService {
  productForm: FormGroup;
  categories$: Observable<any[]>;
  successMessage$ = new BehaviorSubject<string | null>(null);
  errorMessage$ = new BehaviorSubject<string | null>(null);
  productId;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public firestore: AngularFirestore
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: [
        '',
        [Validators.required, Validators.pattern(/^https?:\/\/.*$/)],
      ],
    });

    this.categories$ = this.firestore.collection('/categories').valueChanges();
    console.log(this.categories$);
  }

  getCategories(): Observable<any[]> {
    return this.firestore.collection('/categories').valueChanges();
  }

  async saveProduct(productId: string | null) {
    if (this.productForm.valid) {
      try {
        const productData = this.productForm.value;
        console.log('productId in save method:', this.productId);
        console.log('productId in save method:', productId); // Check if productId is obtained correctly
        if (productId && productId != 'new') {
          // If productId exists, it means we are updating an existing product
          await this.productService.updateProduct(productId, productData);
          this.successMessage$.next('Product updated successfully!');
        } else {
          // Otherwise, we are creating a new product
          await this.productService.saveProduct(productData);
          this.successMessage$.next('Product saved successfully!');
        }

        this.productForm.reset();
        setTimeout(() => {
          this.successMessage$.next(null); // Reset the success message after a delay
        }, 2000);
      } catch (error) {
        this.errorMessage$.next('Error saving product. Please try again.');
      }
    }
  }
  async deleteProduct(productId: string) {
    try {
      const productDocRef = this.firestore.doc('products');
      await productDocRef.delete();
      console.log('Product deleted successfully:', productId);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error; // Rethrow the error to be caught in the component
    }
  }

  initializeProductForm(product: any | null): void {
    this.productForm.setValue({
      title: product ? product.title : '',
      price: product ? product.price : '',
      category: product ? product.category : '',
      imageUrl: product ? product.imageUrl : '',
    });
  }
}
