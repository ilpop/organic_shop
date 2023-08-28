import { Component, OnInit, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  products: {title: string}[];
  filteredProducts: any[];
  subscription: Subscription;

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