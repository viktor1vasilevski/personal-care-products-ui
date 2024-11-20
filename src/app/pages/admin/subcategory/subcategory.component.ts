import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SubcategoryService } from '../../../core/services/subcategory/subcategory.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../core/services/modals/modal.service';
import { DetailsSubcategoryModalComponent } from '../../../core/components/modals/subcategory/details-subcategory-modal/details-subcategory-modal.component';
import { Subcategory } from '../../../models/subcategory/subcategory.model';
import { SingleResponse } from '../../../models/responses/single-response.model';
import { DeleteSubcategoryModalComponent } from '../../../core/components/modals/subcategory/delete-subcategory-modal/delete-subcategory-modal.component';
import { ToastrNotificationService } from '../../../core/services/toastr-notification.service';
import { UpdateSubcategoryModalComponen } from '../../../core/components/modals/subcategory/update-subcategory-modal/update-subcategory-modal.component';
import { CreateSubcategoryModalComponent } from '../../../core/components/modals/subcategory/create-subcategory-modal/create-subcategory-modal.component';
import { QueryResponse } from '../../../models/responses/query-response.model';
import { SubcategoryRequest } from '../../../models/requests/subcategory-request.model';
import { CategoryService } from '../../../core/services/category/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css'
})
export class SubcategoryComponent implements OnInit {

  subcategories : any[] = [];
  currentPage = 1;
  totalPages: number[] = [];
  totalCount: number = 0;

  subcategoryRequest: SubcategoryRequest = {
    skip: 0,
    take: 10,
    name: '',
    categoryId: '',
    sort: 'desc'
  };

  categoryDropdown: any[] = [];

  @ViewChild('createSubcategoryModal', { read: ViewContainerRef })
  createSubcategoryEntry!: ViewContainerRef;
  createSubcategorySub!: Subscription;

  @ViewChild('detailsSubcategoryModal', { read: ViewContainerRef })
  detailsSubcategoryEntry!: ViewContainerRef;
  detailsSubcategorySub!: Subscription;

  @ViewChild('deleteSubcategoryModal', { read: ViewContainerRef })
  deleteSubcategoryEntry!: ViewContainerRef;
  deleteSubcategorySub!: Subscription;

  @ViewChild('updateSubcategoryModal', { read: ViewContainerRef })
  updateSubcategoryEntry!: ViewContainerRef;
  updateSubcategorySub!: Subscription;

  constructor(private _subcategoryService: SubcategoryService,
    private _categoryService: CategoryService,
    private _toastrNotification: ToastrNotificationService,
    private _modalService: ModalService<any>
  ) { }

  ngOnInit(): void {
    this.loadSubcategories();
    this.loadCategoriesDropdown();
  }

  loadSubcategories() {
    this._subcategoryService.getSubcategories(this.subcategoryRequest).subscribe((response: QueryResponse<Subcategory[]>) => {
      if (response && response.success && response.data) {
        this.subcategories = response.data;
      } else {
        this.subcategories = [];
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

  onCategoryChange(event: Event): void {
    debugger
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.subcategoryRequest.categoryId = selectedValue;
    this.loadSubcategories()
  }

  calculateTotalPages(): void {
    const pages = Math.ceil(this.totalCount / this.subcategoryRequest.take);
    this.totalPages = Array.from({ length: pages }, (_, i) => i + 1);
  }

  detailsSubcategory(id: string) {
    this._subcategoryService.getSubcategoryById(id).subscribe((response: SingleResponse<Subcategory>) => {
      if(response && response.success && response.data) { 
        this.detailsSubcategorySub = this._modalService.openModal(
          this.detailsSubcategoryEntry, 
          DetailsSubcategoryModalComponent, 
          response.data, 
          false).subscribe(() => { })
      }
      
    })
    
  }

  deleteSubcategory(subcategory: Subcategory) {
    this.deleteSubcategorySub = this._modalService.openModal(
      this.deleteSubcategoryEntry,
      DeleteSubcategoryModalComponent,
      subcategory,
      true
    ).subscribe(() => {
      this._subcategoryService.deleteSubcategory(subcategory.id).subscribe((response: SingleResponse<Subcategory>) => {
        if(response && response.success && response.data) {
          this.loadSubcategories();
          this._toastrNotification.showNotification(response.message, response.notificationType);
        } else {
          this._toastrNotification.showNotification(response.message, response.notificationType);
        }
      })
    })

  }

  updateSubcategory(subcategory: Subcategory) {
    debugger
    subcategory.categories = this.categoryDropdown;    
    this.updateSubcategorySub = this._modalService.openModal(
      this.updateSubcategoryEntry, 
      UpdateSubcategoryModalComponen, 
      subcategory, 
      true).subscribe((data: any) => {
        this._subcategoryService.updateSubcategory(subcategory.id, data).subscribe((response:any) => {
          debugger
          if(response && response.success && response.data) {
            this.loadSubcategories();
            this._toastrNotification.showNotification(response.message, response.notificationType);
          } else {
            this._toastrNotification.showNotification(response.message, response.notificationType);
          }
          
        })
        
        
    })
    
  }

  createSubcategory() {
    this._categoryService.getCategoriesDropdownList().subscribe((res:any) => {
      this.createSubcategorySub = this._modalService.openModal(
        this.updateSubcategoryEntry,
        CreateSubcategoryModalComponent,
        res.data,
        true
      ).subscribe((data: any) => {
        this._subcategoryService.createSubcategory(data).subscribe((response: any) => {
          if(response && response.success && response.data) {
            this.loadSubcategories();
            this._toastrNotification.showNotification(response.message, response.notificationType);
          } else {
            this._toastrNotification.showNotification(response.message, response.notificationType);
          }    
        })  
      }) 
    })
  }

  onNameChange() {
    this.subcategoryRequest.skip = 0;
    this.loadSubcategories();
  }

  toggleSortOrder(): void {
    this.subcategoryRequest.sort = this.subcategoryRequest.sort === 'asc' ? 'desc' : 'asc';
    this.loadSubcategories();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.subcategoryRequest.skip = (page - 1) * this.subcategoryRequest.take;
    this.loadSubcategories();
  }

  onItemsPerPageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const parsedValue = Number(selectElement.value);
    if (!isNaN(parsedValue)) {
      this.subcategoryRequest.take = parsedValue;
      this.subcategoryRequest.skip = 0;
      this.currentPage = 1;
      this.loadSubcategories();
    }
  }

}
