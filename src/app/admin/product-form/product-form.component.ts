import { initializeApp } from '@angular/fire/app';
// product-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFormService } from 'src/app/product-form.service'
import { ProductService } from 'src/app/product.service';
import { Observable, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
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

    this.productFormService.initializeProductForm(null); // Initialize with default values
    this.productForm = this.productFormService.productForm;
  
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      this.productId = productId || null;
  
      if (this.productId) {
        this.productService.get(this.productId).then(product => {
          if (product) {
            this.productFormService.initializeProductForm(product);
            this.productForm.setValue(this.productFormService.productForm.value);
          }
        });
      }
    });
  }

  save() {
    this.productFormService.saveProduct();
    //this.router.navigate(['/admin/products']);
  }

}

