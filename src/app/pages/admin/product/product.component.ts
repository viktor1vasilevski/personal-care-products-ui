import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { CommonModule } from '@angular/common';
import { Product } from './product.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  totalCount: number = 0;
  skip: number = 0;
  itemsPerPage : number = 5;
  currentPage = 1; // Track the current page
  totalPages: number[] = []; // Array to hold total page numbers

  filterForm: FormGroup;

  constructor(private _productService: ProductService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      category: [''],
      subCategory: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    const { category, subCategory } = this.filterForm.value;
    this._productService.getProducts({ skip: this.skip, take: this.itemsPerPage }).subscribe((response: any) => {
      if (response && response.data) {
        this.products = response.data;
      } else {
        this.products = [];
      }

      // Ensure totalCount is defined and a number, defaulting to 0 if not
      this.totalCount = typeof response?.totalCount === 'number' ? response.totalCount : 0;

      this.calculateTotalPages();
    });
  }

  calculateTotalPages(): void {
    const pages = Math.ceil(this.totalCount / this.itemsPerPage);
    this.totalPages = Array.from({ length: pages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.skip = (page - 1) * this.itemsPerPage; // Calculate skip value based on current page
    this.loadProducts();
  }

  onItemsPerPageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Cast to HTMLSelectElement
    const parsedValue = Number(selectElement.value); // Convert the value to a number
    if (!isNaN(parsedValue)) { // Check if the conversion was successful
      this.itemsPerPage = parsedValue; // Update items per page
      this.skip = 0; // Reset to first page
      this.currentPage = 1; // Reset current page
      this.loadProducts(); // Load products with new items per page
    }
  }
  

  onFilterChange(): void {
    this.skip = 0; // Reset to the first page when filtering
    this.loadProducts();
  }

  previousPage(): void {
    if (this.skip > 0) {
      this.skip -= this.itemsPerPage;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.skip + this.itemsPerPage < this.totalCount) {
      this.skip += this.itemsPerPage;
      this.loadProducts();
    }
  }

}
