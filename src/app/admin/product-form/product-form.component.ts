import { ProductService } from './../../product.service';
import { Component, OnInit, inject} from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit{
  categories$: Observable<any[]> | undefined;
  product: any = { categoryId: '', title: '', price: '', imageUrl: '' };
  productForm: FormGroup; 

  constructor(private firestore: Firestore, 
    private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder) { }

  async ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
        // Initialize the productForm with form controls and validators
        this.productForm = this.formBuilder.group({
          categoryId: ['', Validators.required],
          title: ['', Validators.required],
          price: ['', [Validators.required, Validators.min(0)]], // Validate for non-negative values
          imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]] // Validate URL pattern
        });
  }

  async save(product) {
    this.productService.saveProduct(product);
    this.productForm.reset();
  }
}

