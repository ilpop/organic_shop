// product-form.component.ts

import { Component } from '@angular/core';
import { ProductFormService } from 'src/app/product-form.service'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  constructor(public productFormService: ProductFormService) {}

  save() {
    this.productFormService.saveProduct();
  }
}