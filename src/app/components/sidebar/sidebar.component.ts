import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categories: any[] = [];
  error: string | null = null;
  isCategoryModalOpen: boolean = false;
  isEditing: boolean = false;
  selectedCategoryId: string | null = null;
  categoryForm: FormGroup;

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private router: Router) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Minimum 3 characters for name
      image: [
        '',
        [Validators.required, Validators.pattern(/(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i)], // URL validation
      ],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  // Fetch categories from the service
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data.categories;
      },
      error: (err) => {
        this.error = 'Failed to load categories.';
        console.error(err);
      },
    });
  }

  navigateToCategory(categoryId: string): void {
    this.router.navigate(['/category', categoryId]);
  }



  // Select a category
  selectCategory(categoryId: string): void {
    console.log(`Selected category ID: ${categoryId}`);
    // Add logic to display products for the selected category
  }

  // Open Add/Edit Category Modal
  openAddCategoryModal(category?: any): void {
    this.isCategoryModalOpen = true;
    this.isEditing = !!category;
    this.selectedCategoryId = category ? category.id : null;

    if (this.isEditing) {
      this.categoryForm.patchValue({
        name: category.name,
        image: category.image,
      });
    } else {
      this.categoryForm.reset();
    }
  }

  // Close Modal
  closeCategoryModal(): void {
    this.isCategoryModalOpen = false;
    this.isEditing = false;
    this.selectedCategoryId = null;
  }

  // Save Category (Add or Update)
  saveCategory(): void {
    if (this.isEditing && this.selectedCategoryId) {
      // Update category logic
      console.log('Updating Category:', this.selectedCategoryId, this.categoryForm.value);

      this.categoryService.updateCategory(this.selectedCategoryId, this.categoryForm.value).subscribe({
        next: () => {
          console.log('Category updated successfully');
          this.loadCategories(); // Refresh categories
          this.closeCategoryModal();
        },
        error: (err) => {
          this.error = 'Failed to update category.';
          console.error('Update category error:', err.graphQLErrors || err.networkError || err);
        },
      });
    } else {
      // Add new category logic
      console.log('Adding Category:', this.categoryForm.value);

      this.categoryService.addCategory(this.categoryForm.value).subscribe({
        next: () => {
          console.log('Category added successfully');
          this.loadCategories(); // Refresh categories
          this.closeCategoryModal();
        },
        error: (err) => {
          this.error = 'Failed to add category.';
          console.error('Add category error:', err.graphQLErrors || err.networkError || err);
        },
      });
    }
  }





  editCategory(category: any): void {
    this.openAddCategoryModal(category); // Reuse the modal logic
  }

  // Delete a category
  deleteCategory(categoryId: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      console.log('Deleting Category:', categoryId);

      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          console.log('Category deleted successfully');
          this.loadCategories(); // Refresh categories
        },
        error: (err) => {
          this.error = 'Failed to delete category.';
          console.error('Delete category error:', err.graphQLErrors || err.networkError || err);
        },
      });
    }
  }

}