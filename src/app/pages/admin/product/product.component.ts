import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QueryResponse } from '../../../models/responses/query-response.model';
import { Product } from '../../../models/product/product.model';
import { ProductRequest } from '../../../models/requests/product-request.model';
import { TestRequest } from '../../../models/requests/test-request';

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
  //skip: number = 0;
  //itemsPerPage : number = 10;
  currentPage = 1;
  totalPages: number[] = [];
  //sortOrder: string = 'desc';
  filterForm: FormGroup;

  productRequest: ProductRequest = {
    skip: 0,
    take: 10,
    category: '',
    subcategorty: '',
    sort: 'desc'
  };

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

  loadProducts(): void {
    this._productService.getProducts(this.productRequest).subscribe((response: QueryResponse<Product[]>) => {
      if (response && response.success && response.data) {
        this.products = response.data;
      } else {
        this.products = [];
      }

      this.totalCount = typeof response?.totalCount === 'number' ? response.totalCount : 0;

      this.calculateTotalPages();
    });
  }

  createProduct() {
    
  }

  detailsProduct(id: any): void {
    console.log(id);
  }

  updateProduct(product: Product): void {
    console.log(product);
  }

  deleteProduct(product: Product) : void {
    console.log(product);
    
  }

  calculateTotalPages(): void {
    const pages = Math.ceil(this.totalCount / this.productRequest.take);
    this.totalPages = Array.from({ length: pages }, (_, i) => i + 1);
  }

  toggleSortOrder() {
    this.productRequest.sort = this.productRequest.sort === 'asc' ? 'desc' : 'asc';
    this.loadProducts();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.productRequest.skip = (page - 1) * this.productRequest.take;
    this.loadProducts();
  }

  onItemsPerPageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const parsedValue = Number(selectElement.value);
    if (!isNaN(parsedValue)) {
      this.productRequest.take = parsedValue;
      this.productRequest.skip = 0;
      this.currentPage = 1;
      this.loadProducts();
    }
  }
  

  onFilterChange(): void {
    this.productRequest.skip = 0;
    this.loadProducts();
  }

  previousPage(): void {
    if (this.productRequest.skip > 0) {
      this.productRequest.skip -= this.productRequest.take;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.productRequest.skip + this.productRequest.take < this.totalCount) {
      this.productRequest.skip += this.productRequest.take;
      this.loadProducts();
    }
  }

}
