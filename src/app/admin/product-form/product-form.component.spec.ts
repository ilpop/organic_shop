import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFormComponent } from './product-form.component';
import { ProductFormService } from 'src/app/product-form.service';
import { ProductService } from 'src/app/product.service';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let router: Router;
  let productService: ProductService;
  let productFormService: ProductFormService;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ProductService, useValue: productService },
        { provide: ProductFormService, useValue: productFormService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    productService = TestBed.inject(ProductService);
    productFormService = TestBed.inject(ProductFormService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the product form', () => {
    spyOn(productFormService, 'initializeProductForm');
    component.ngOnInit();
    expect(productFormService.initializeProductForm).toHaveBeenCalledWith(null);
  });

  // it('should load product for editing', async () => {
  //   const productId = 'existingProductId';
  //   const product = { title: 'Product Title' };
  //   component.router.snapshot.paramMap.set('id', productId);
  //   spyOn(component.productService, 'get').and.returnValue(Promise.resolve(product));
  //   spyOn(productFormService, 'initializeProductForm');
  //   component.ngOnInit();
  //   await component.route.snapshot.paramMap.pipe();
  //   expect(component.productService.get).toHaveBeenCalledWith(productId);
  //   expect(productFormService.initializeProductForm).toHaveBeenCalledWith(product);
  // });

  it('should save a product', async () => {
    spyOn(productFormService, 'saveProduct');
    component.save();
    expect(productFormService.saveProduct).toHaveBeenCalledWith(
      component.productId
    );
  });

  it('should delete a product', async () => {
    const productId = 'productToDeleteId';
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(productService, 'deleteProduct').and.returnValue(Promise.resolve());
    spyOn(router, 'navigate');
    component.deleteProduct(productId);
    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this product?'
    );
    expect(productService.deleteProduct).toHaveBeenCalledWith(productId);
    expect(router.navigate).toHaveBeenCalledWith(['/admin/products']);
  });
});

class RouterStub {
  navigate(url: string[]) {
    return url;
  }
}

class ActivatedRouteStub {
  snapshot = {
    paramMap: {
      get: (param: string) => {
        return null;
      },
    },
  };
}

class ProductServiceStub {
  deleteProduct(productId: string) {
    return Promise.resolve();
  }
}

class ProductFormServiceStub {
  initializeProductForm(product: any | null) {
    return;
  }

  saveProduct(productId: string | null) {
    return Promise.resolve();
  }
}
