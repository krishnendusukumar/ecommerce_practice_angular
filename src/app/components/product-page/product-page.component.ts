import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  products: any[] = [];
  categoryId: string | null = null;

  // Modal and Form State
  isAddProductModalOpen: boolean = false;
  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      image: [
        '',
        [Validators.required, Validators.pattern(/(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i)],
      ],
    });
  }

  ngOnInit() {

    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('categoryId');
      if (this.categoryId) {
        this.getProducts(this.categoryId);
      } else {
        this.router.navigate(['/category/1']); // Default to Electronics category
      }
    });
  }

  getProducts(categoryId: string | null) {
    if (categoryId) {
      this.productService.getProductsByCategory(categoryId).subscribe({
        next: (response) => {
          this.products = response.data.products;
        },
        error: (err) => {
          console.error('Error fetching products:', err);
        },
      });
    }
  }

  // Open Add Product Modal
  openAddProductModal(): void {
    this.isAddProductModalOpen = true;
    this.productForm.reset();
  }

  // Close Add Product Modal
  closeAddProductModal(): void {
    this.isAddProductModalOpen = false;
  }

  // Save Product
  saveProduct(): void {
    if (this.categoryId) {
      const newProduct = {
        ...this.productForm.value,
        categoryId: parseFloat(this.categoryId),
        images: [this.productForm.value.image],
      };

      this.productService.addProduct(newProduct).subscribe({
        next: () => {
          this.getProducts(this.categoryId);
          this.closeAddProductModal();
        },
        error: (err) => {
          console.error('Error adding product:', err);
        },
      });
    }
  }

  // Add to Cart
  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}
