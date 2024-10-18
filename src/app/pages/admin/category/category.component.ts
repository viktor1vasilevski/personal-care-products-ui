import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CategoryModalService } from '../../../core/services/modals/category-modal.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private _categoryService: CategoryService,
    private _categoryModalService: CategoryModalService,
    private _toastr: ToastrService,
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
    this.createCategorySub = this._categoryModalService.openModal(this.createCategoryEntry).subscribe((data: any) => {
      this._categoryService.createCategory(data).subscribe((response: any) => {
        if(response && response.data) {
          this.loadCategories();
          this._toastr.success(response.message, 'Success', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        } else {
          this._toastr.error(response.message, 'Error', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        }
      })
      
    })
  }

  deleteCategory(id: string) {
    this._categoryService.deleteCategory(id).subscribe((response: any) => {
      if(response && response.data) {
        this.loadCategories();
        this._toastr.success(response.message, 'Success', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      } else {
        this._toastr.error(response.message, 'Error', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      }
      
    })
    
  }

}