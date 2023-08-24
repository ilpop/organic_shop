import { ProductService } from './../../product.service';
import { Component, OnInit, inject} from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit{
  //firestore: Firestore = inject(Firestore);
  categories$: Observable<any[]> | undefined;
  product: any = { categoryId: '', title: '', price: '', imageUrl: '' };

  constructor(private firestore: Firestore, 
    private categoryService: CategoryService,
    private productService: ProductService) { }

  async ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
   
  }

  async save(product) {
    this.productService.saveProduct(product);
  }
}

