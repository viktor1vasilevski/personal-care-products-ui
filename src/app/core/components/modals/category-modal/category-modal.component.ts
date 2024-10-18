import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateCategoryModel } from './create-category.model';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.css'
})
export class CategoryModalComponent {

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
