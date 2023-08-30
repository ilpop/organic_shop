import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  //firestore: Firestore = inject(Firestore);
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  product: Product;


  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
    .subscribe(products => this.filteredProducts = this.products = products); 

  }

  filter(query: string) {
   this.filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :    
    this.products;
    
  }

  ngOnInit() {
  
  }

  ngOnDestroy() { 
    this.subscription.unsubscribe();

}

}