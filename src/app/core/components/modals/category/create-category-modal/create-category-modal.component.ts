import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCategoryModel } from '../../category-modal/create-category.model';

@Component({
  selector: 'app-create-category-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-category-modal.component.html',
  styleUrl: './create-category-modal.component.css'
})
export class CreateCategoryModalComponent {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<any>();

  createCategoryForm: FormGroup;
  passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$';

  constructor(private fb: FormBuilder) {
    this.createCategoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get name() {
    return this.createCategoryForm.get('name');
  }

  closeMe() {
    this.closeMeEvent.emit();
  }
  
  confirm() { 
    if (this.createCategoryForm.valid) {
      const { name } = this.createCategoryForm.value;
      const createCategoryData: CreateCategoryModel = { name };
      
      this.confirmEvent.emit(createCategoryData);
    }

    
  }
}
