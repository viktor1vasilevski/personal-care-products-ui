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
  itemsPerPage : number = 10;
  currentPage = 1;
  totalPages: number[] = [];

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
    this.skip = (page - 1) * this.itemsPerPage;
    this.loadProducts();
  }

  onItemsPerPageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const parsedValue = Number(selectElement.value);
    if (!isNaN(parsedValue)) {
      this.itemsPerPage = parsedValue;
      this.skip = 0;
      this.currentPage = 1;
      this.loadProducts();
    }
  }
  

  onFilterChange(): void {
    this.skip = 0;
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
