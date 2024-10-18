import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SubcategoryService } from '../../../core/services/subcategory/subcategory.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

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

  constructor(private _subcategoryService: SubcategoryService
  ) {}

  ngOnInit(): void {
    this.loadSubcategories();
  }

  loadSubcategories() {
    // const { category, subCategory } = this.filterForm.value;
    this._subcategoryService.getSubcategories({ skip: 0, take: 10 }).subscribe((response: any) => {
      if (response && response.data) {
        this.subcategories = response.data;
      } else {
        this.subcategories = [];
      }

      // this.totalCount = typeof response?.totalCount === 'number' ? response.totalCount : 0;

      // this.calculateTotalPages();
    });
  }

  openCreateSubcategoryModal() {
    console.log('openCreateSubcategoryModal');
    

    
  }

}
