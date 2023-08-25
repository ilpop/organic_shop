import { Component, OnInit, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  products$;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll(); 

  }

  ngOnInit() {
  }

}
