import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-subcategory-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-subcategory-modal.component.html',
  styleUrl: './create-subcategory-modal.component.css'
})
export class CreateSubcategoryModalComponent {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<any>();

  createSubcategoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createSubcategoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get name() {
    return this.createSubcategoryForm.get('name');
  }

  closeMe() {
    this.closeMeEvent.emit();
  }
  
  confirm() { 
    if (this.createSubcategoryForm.valid) {
      const { name } = this.createSubcategoryForm.value;
      const createSubcategoryData: any = { name };
      
      this.confirmEvent.emit(createSubcategoryData);
    }

    
  }

}
