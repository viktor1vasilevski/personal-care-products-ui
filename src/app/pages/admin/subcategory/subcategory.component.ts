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

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css'
})
export class SubcategoryComponent implements OnInit {

  subcategories : any[] = [];

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
    private _toastrNotification: ToastrNotificationService,
    private _modalService: ModalService<any>
  ) { }

  ngOnInit(): void {
    this.loadSubcategories();
  }

  loadSubcategories() {
    // const { category, subCategory } = this.filterForm.value;
    this._subcategoryService.getSubcategories({ skip: 0, take: 10 }).subscribe((response: any) => {
      if (response && response.success && response.data) {
        this.subcategories = response.data;
      } else {
        this.subcategories = [];
      }

      // this.totalCount = typeof response?.totalCount === 'number' ? response.totalCount : 0;

      // this.calculateTotalPages();
    });
  }

  detailsSubcategory(id: string) {
    this._subcategoryService.getByIdSubcategory(id).subscribe((response: SingleResponse<Subcategory>) => {
      if(response && response.data) {
        this.detailsSubcategorySub = this._modalService.openModal(this.detailsSubcategoryEntry, DetailsSubcategoryModalComponent, response.data).subscribe((data: any) => {
          alert()
          
        })
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
          this._toastrNotification.showNotification(response);
        } else {
          this._toastrNotification.showNotification(response);
        }
      })
    })

  }

  updateSubcategory(subcategory: Subcategory) {
    this.updateSubcategorySub = this._modalService.openModal(
      this.updateSubcategoryEntry, 
      UpdateSubcategoryModalComponen, 
      subcategory, 
      true).subscribe((data: any) => {

    })
    
  }

  openCreateSubcategoryModal() {
    
    

    
  }

}
