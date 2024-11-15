import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-subcategory-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-subcategory-modal.component.html',
  styleUrl: './update-subcategory-modal.component.css'
})
export class UpdateSubcategoryModalComponen  implements OnInit {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<any>();

  data: any;
  updateSubcategoryForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.updateSubcategoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      categoryId: ['', Validators.required] // Add category form control
    });
  }


  ngOnInit() {
    debugger
    if (this.data) {
      this.updateSubcategoryForm.patchValue({
        name: this.data.name,
        categoryId: this.data.categoryId
      });
    }
  }

  get name() {
    return this.updateSubcategoryForm.get('name');
  }

  get categoryId() {
    return this.updateSubcategoryForm.get('categoryId');
  }

  closeMe() {
    this.closeMeEvent.emit();
  }

  confirm() { 
    debugger
    if (this.updateSubcategoryForm.valid) {
      const { name, categoryId } = this.updateSubcategoryForm.value;
      const updatedSubcategoryData: any = { name, categoryId };
      
      this.confirmEvent.emit(updatedSubcategoryData);
    }
  }
}
