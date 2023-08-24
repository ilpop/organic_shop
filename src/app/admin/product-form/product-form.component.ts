// product-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductFormService } from 'src/app/product-form.service'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
  productForm: FormGroup;
  
  constructor(public productFormService: ProductFormService) {}

  ngOnInit() {
    this.productForm = this.productFormService.productForm;
  }

  save() {
    this.productFormService.saveProduct();
  }
}