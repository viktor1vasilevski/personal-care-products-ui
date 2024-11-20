import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueryResponse } from '../../../models/responses/query-response.model';
import { Product } from '../../../models/product/product.model';
import { ProductRequest } from '../../../models/requests/product-request.model';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../core/services/modals/modal.service';
import { DetailsProductModalComponent } from '../../../core/components/modals/product/details-product-modal/details-product-modal.component';
import { CategoryService } from '../../../core/services/category/category.service';
import { SubcategoryService } from '../../../core/services/subcategory/subcategory.service';
import { CreateProductModalComponent } from '../../../core/components/modals/product/create-product-modal/create-product-modal.component';
import { ToastrNotificationService } from '../../../core/services/toastr-notification.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products: any[] = [];
  totalCount: number = 0;
  currentPage = 1;
  totalPages: number[] = [];

  productRequest: ProductRequest = {
    name: '',
    brand: '',
    edition:'',
    scent:'',
    categoryId: '',
    subcategoryId: '',
    skip: 0,
    take: 10,
    sort: 'desc'
  };

  categoryDropdown: any[] = [];
  subcategoryDropdown: any[] = [];

  @ViewChild('detailsProductModal', { read: ViewContainerRef })
  detailsProductEntry!: ViewContainerRef;
  detailsProductSub!: Subscription;

  @ViewChild('createProductModal', { read: ViewContainerRef })
  createProductEntry!: ViewContainerRef;
  createProductSub!: Subscription;

  constructor(private _productService: ProductService,
    private _categoryService: CategoryService,
    private _subcategoryService: SubcategoryService,
    private _toastrNotification: ToastrNotificationService,
    private _modalService: ModalService<any>
  ) {

  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategoriesDropdown();
    this.loadSubcategoriesDropdown();
  }

  loadProducts(): void {
    this._productService.getProducts(this.productRequest).subscribe((response: any) => {
      if (response && response.success && response.data) {
        console.log(response.data);
        
        this.products = response.data;
      } else {
        this.products = [];
      }

      this.totalCount = typeof response?.totalCount === 'number' ? response.totalCount : 0;

      this.calculateTotalPages();
    });
  }

  loadCategoriesDropdown(): void {
    this._categoryService.getCategoriesDropdownList().subscribe((response: any) => {
      this.categoryDropdown = response.data;
    })
  }

  loadSubcategoriesDropdown(): void {
    this._subcategoryService.getSubcategoriesDropdownList().subscribe((response: any) => {
      this.subcategoryDropdown = response.data;
    })
  }

  createProduct() {
    this.createProductSub = this._modalService.openModal(
      this.createProductEntry,
      CreateProductModalComponent,
      this.subcategoryDropdown,
      true).subscribe((data:any) => {  
        this._productService.createProduct(data).subscribe((response: any) => {
          debugger
          if(response && response.success && response.data) {
            this.loadProducts();
            this._toastrNotification.showNotification(response.message, response.notificationType);
          } else {
            this._toastrNotification.showNotification(response.message, response.notificationType);
          }
          
        })
        
      })
  }

  detailsProduct(product: any): void {
    this.detailsProductSub = this._modalService.openModal(
      this.detailsProductEntry, 
      DetailsProductModalComponent,
      product,
      false).subscribe(() => {})
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

  onCategoryChange(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.productRequest.categoryId = selectedValue;
    this.loadProducts()
  }

  onSubcategoryChange(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.productRequest.subcategoryId = selectedValue;
    this.loadProducts()
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
    this.createProductSub?.unsubscribe();
  }

}
