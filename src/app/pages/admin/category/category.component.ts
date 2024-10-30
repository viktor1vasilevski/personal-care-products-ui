import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DeleteCategoryModalComponent } from '../../../core/components/modals/category/delete-category-modal/delete-category-modal.component';
import { CreateCategoryModalComponent } from '../../../core/components/modals/category/create-category-modal/create-category-modal.component';
import { ModalService } from '../../../core/services/modals/modal.service';
import { ToastrNotificationService } from '../../../core/services/toastr-notification.service';
import { DetailsCategoryModalComponent } from '../../../core/components/modals/category/details-category-modal/details-category-modal.component';
import { UpdateCategoryModalComponent } from '../../../core/components/modals/category/update-category-modal/update-category-modal.component';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../models/category/category.model';
import { QueryResponse } from '../../../models/responses/query-response.model';
import { SingleResponse } from '../../../models/responses/single-response.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  totalCount: number = 0;
  skip: number = 0;
  itemsPerPage : number = 5;
  currentPage = 1;
  totalPages: number[] = [];
  nameFilter: string = '';
  sortOrder: string = 'desc';


  @ViewChild('createCategoryModal', { read: ViewContainerRef })
  createCategoryEntry!: ViewContainerRef;
  createCategorySub!: Subscription;

  @ViewChild('deleteCategoryModal', { read: ViewContainerRef })
  deleteCategoryEntry!: ViewContainerRef;
  deleteCategorySub!: Subscription;

  @ViewChild('detailsCategoryModal', { read: ViewContainerRef })
  detailsCategoryEntry!: ViewContainerRef;
  detailsCategorySub!: Subscription;

  @ViewChild('updateCategoryModal', { read: ViewContainerRef })
  updateCategoryEntry!: ViewContainerRef;
  updateCategorySub!: Subscription;

  constructor(private _categoryService: CategoryService,
    private _toastrNotification: ToastrNotificationService,
    private _modalService: ModalService<any>
  ) {}


  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this._categoryService.getCategories({
      skip: this.skip,
      take: this.itemsPerPage,
      sort: this.sortOrder,
      name: this.nameFilter
    }).subscribe((response: QueryResponse<Category[]>) => {
      if (response && response.data && response.success) {
        this.categories = response.data;
      } else {
        this.categories = [];
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
    this.loadCategories();
  }

  onItemsPerPageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const parsedValue = Number(selectElement.value);
    if (!isNaN(parsedValue)) {
      this.itemsPerPage = parsedValue;
      this.skip = 0;
      this.currentPage = 1;
      this.loadCategories();
    }
  }

  onFilterChange(): void {
    this.skip = 0;
    this.loadCategories();
  }

  previousPage(): void {
    if (this.skip > 0) {
      this.skip -= this.itemsPerPage;
      this.loadCategories();
    }
  }

  nextPage(): void {
    if (this.skip + this.itemsPerPage < this.totalCount) {
      this.skip += this.itemsPerPage;
      this.loadCategories();
    }
  }

  createCategory() {
    this.createCategorySub = this._modalService.openModal(this.createCategoryEntry, CreateCategoryModalComponent, null, true).subscribe((data: any) => {
      this._categoryService.createCategory(data).subscribe((response: SingleResponse<Category>) => {
        if(response && response.success && response.data) {
          this.loadCategories();
          this._toastrNotification.showNotification(response);
        } else {
          this._toastrNotification.showNotification(response);
        }
      })
      
    })
  }

  detailsCategory(id: string) {
    this._categoryService.getCategoryById(id).subscribe((response: SingleResponse<Category>) => {
      if(response && response.success && response.data) {
        this.detailsCategorySub = this._modalService.openModal(this.detailsCategoryEntry, DetailsCategoryModalComponent, response.data, false).subscribe(() => { })
      }
    })
  }

  updateCategory(category: any) {
    this.updateCategorySub = this._modalService.openModal(this.updateCategoryEntry, UpdateCategoryModalComponent, category, true).subscribe((data: any) => {
      if(data) {
        this._categoryService.updateCategory(category.id, data).subscribe((response: SingleResponse<Category>) => {
          if(response && response.success && response.data) {
            this.loadCategories();
            this._toastrNotification.showNotification(response);
          } else {
            this._toastrNotification.showNotification(response);
          }      
        })
      }
    })
  }

  deleteCategory(category: Category) {
    this.deleteCategorySub = this._modalService.openModal(this.deleteCategoryEntry, DeleteCategoryModalComponent, category, true).subscribe(() => {
      this._categoryService.deleteCategory(category.id).subscribe((response: SingleResponse<Category>) => {
        debugger
        if(response && response.success && response.data) {
          this.loadCategories();
          this._toastrNotification.showNotification(response);
        } else {
          this._toastrNotification.showNotification(response);
        }  
      })
    })
  }

  onNameChange() {
    this.skip = 0;
    this.loadCategories();
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.createCategorySub?.unsubscribe();
    this.deleteCategorySub?.unsubscribe();
    this.detailsCategorySub?.unsubscribe();
    this.updateCategorySub?.unsubscribe();
  }

}
