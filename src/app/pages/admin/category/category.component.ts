import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DeleteCategoryModalComponent } from '../../../core/components/modals/category/delete-category-modal/delete-category-modal.component';
import { CreateCategoryModalComponent } from '../../../core/components/modals/category/create-category-modal/create-category-modal.component';
import { ModalService } from '../../../core/services/modals/modal.service';
import { ToastrNotificationService } from '../../../core/services/toastr-notification.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  categories : any[] = [];
  totalCount: number = 0;
  skip: number = 0;
  itemsPerPage : number = 5;
  currentPage = 1;
  totalPages: number[] = [];

  @ViewChild('createCategoryModal', { read: ViewContainerRef })
  createCategoryEntry!: ViewContainerRef;
  createCategorySub!: Subscription;

  @ViewChild('deleteCategoryModal', { read: ViewContainerRef })
  deleteCategoryEntry!: ViewContainerRef;
  deleteCategorySub!: Subscription;

  constructor(private _categoryService: CategoryService,
    private _toastrNotification: ToastrNotificationService,
    private _modalService: ModalService<any>
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    // const { category, subCategory } = this.filterForm.value;
    this._categoryService.getCategories({ skip: this.skip, take: this.itemsPerPage }).subscribe((response: any) => {
      if (response && response.data) {
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
    this.createCategorySub = this._modalService.openModal(this.createCategoryEntry, CreateCategoryModalComponent).subscribe((data: any) => {
      this._categoryService.createCategory(data).subscribe((response: any) => {
        if(response && response.data) {
          this.loadCategories();
          this._toastrNotification.showNotification(response);
        } else {
          this._toastrNotification.showNotification(response);
        }
      })
      
    })
  }

  deleteCategory(id: string) {
    this.deleteCategorySub = this._modalService.openModal(this.deleteCategoryEntry, DeleteCategoryModalComponent).subscribe((date: any) => {
      this._categoryService.deleteCategory(id).subscribe((response: any) => {
        if(response && response.data) {
          this.loadCategories();
          this._toastrNotification.showNotification(response);
        } else {
          this._toastrNotification.showNotification(response);
        }
        
      })
    })   
  }

}
