import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormService } from './product-form.service';

describe('ProductFormService', () => {
  let service: ProductFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [ProductFormService]
    });
    service = TestBed.inject(ProductFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the product form', () => {
    service.initializeProductForm(null);
    expect(service.productForm).toBeDefined();
  });

  it('should reset the product form', () => {
    service.productForm.get('title')?.setValue('Test Product');
    service.productForm.get('price')?.setValue(10);
    service.productForm.get('category')?.setValue('Test Category');
    service.productForm.get('imageUrl')?.setValue('https://example.com/test.jpg');
    
    service.productForm.reset();
    
    expect(service.productForm.get('title')?.value).toBe('');
    expect(service.productForm.get('price')?.value).toBe('');
    expect(service.productForm.get('category')?.value).toBe('');
    expect(service.productForm.get('imageUrl')?.value).toBe('');
  });
});
