import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QueryResponse } from '../../../models/responses/query-response.model';
import { Product } from '../../../models/product/product.model';
import { ProductRequest } from '../../../models/requests/product-request.model';
import { SingleResponse } from '../../../models/responses/single-response.model';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../core/services/modals/modal.service';
import { DetailsProductModalComponent } from '../../../core/components/modals/product/details-product-modal/details-product-modal.component';

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

  @ViewChild('detailsProductModal', { read: ViewContainerRef })
  detailsProductEntry!: ViewContainerRef;
  detailsProductSub!: Subscription;

  constructor(private _productService: ProductService,
    private _modalService: ModalService<any>,
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
    this._productService.getProductById(id).subscribe((response: SingleResponse<Product>) => {
      if(response && response.success && response.data) {
        this.detailsProductSub = this._modalService.openModal(
          this.detailsProductEntry, 
          DetailsProductModalComponent,
          response.data,
          false).subscribe(() => {})
      }
      
    })
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

  ngOnDestroy(): void {
    this.detailsProductSub?.unsubscribe();
  }

}
