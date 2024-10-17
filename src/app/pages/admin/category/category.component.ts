import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CategoryModalService } from '../../../core/services/modals/category-modal.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  categories : any[] = [];

  @ViewChild('createCategoryModal', { read: ViewContainerRef })
  createCategoryEntry!: ViewContainerRef;
  createCategorySub!: Subscription;

  constructor(private _categoryService: CategoryService,
    private _categoryModalService: CategoryModalService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    // const { category, subCategory } = this.filterForm.value;
    this._categoryService.getCategories({ skip: 0, take: 10 }).subscribe((response: any) => {
      if (response && response.data) {
        this.categories = response.data;
      } else {
        this.categories = [];
      }

      // this.totalCount = typeof response?.totalCount === 'number' ? response.totalCount : 0;

      // this.calculateTotalPages();
    });
  }

  createCategory() {
    debugger
    this.createCategorySub = this._categoryModalService.openModal(this.createCategoryEntry).subscribe((model: any) => {
      console.log(model);
      
      alert();
      // this._accountService.registerUser(model).subscribe((response: any) => {
             
      //   this._toastr.success(`User ${response.userName} registered!`, 'Success', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      // })
      
    })
  }

}
