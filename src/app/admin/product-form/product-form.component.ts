import { initializeApp } from '@angular/fire/app';
// product-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFormService } from 'src/app/product-form.service'
import { ProductService } from 'src/app/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
  products: any[];
  productForm: FormGroup;
  productId: string ;
  categories$: Observable<any[]>;
  //categories$ = this.productFormService.categories$;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public productFormService: ProductFormService,
    private productService: ProductService
    ) {
      
  }
  async ngOnInit() {
    const categories = await this.productFormService.getCategories();
    this.categories$ = categories; // Update the categories list
  
    this.productForm = this.productFormService.productForm; // Initialize the form
  
    this.route.paramMap.subscribe(async params => {
      const productId = params.get('id');
      console.log('productId:', productId); // Check if productId is obtained correctly
      this.productId = productId || null;
  
      if (this.productId) {
        console.log('Editing existing product:', this.productId); // Check if correct branch is executed
        const product = await this.productService.get(this.productId);
        console.log('Loaded product for editing:', product); // Check if product is loaded
        if (product) {
          this.productFormService.initializeProductForm(product);
          this.productForm.setValue(this.productFormService.productForm.value);
          //this.productForm = this.productFormService.productForm;
        }
      } else {
        this.productFormService.initializeProductForm(null);
        this.productForm = this.productFormService.productForm;
      }
    });
  }

  save() {
    this.productFormService.saveProduct(this.productId);
    //this.router.navigate(['/admin/products']);
  }

  async deleteProduct(productId: string) {
    const confirmation = confirm('Are you sure you want to delete this product?');
    if (confirmation) {
      try {
        await this.productService.deleteProduct(productId);
        // Update the products list after deletion
        this.products = await this.productService.getAll().toPromise();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }
  

}

