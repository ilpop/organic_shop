import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFormService } from 'src/app/product-form.service';
import { ProductService } from 'src/app/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId: string;
  categories$: Observable<any[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public productFormService: ProductFormService,
    private productService: ProductService
  ) {}
  async ngOnInit() {
    this.productForm = this.productFormService.productForm;
    this.populateData();
  }

  private async populateData() {
    const categories = await this.productFormService.getCategories();
    this.categories$ = categories;

    this.route.paramMap.subscribe(async (params) => {
      const productId = params.get('id');
      this.productId = productId || null;

      if (this.productId) {
        const product = await this.productService.get(this.productId);
        if (product) {
          this.productFormService.initializeProductForm(product);
          this.productForm.setValue(this.productFormService.productForm.value);
        }
      } else {
        this.productFormService.initializeProductForm(null);
        this.productForm = this.productFormService.productForm;
      }
    });
  }

  save() {
    this.productFormService.saveProduct(this.productId);
  }
  async deleteProduct(productId: string) {
    const confirmation = confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmation) {
      try {
        await this.productService.deleteProduct(productId);
        this.router.navigate(['/admin/products']);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }
}
