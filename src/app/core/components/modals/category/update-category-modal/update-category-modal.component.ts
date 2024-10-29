import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-category-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-category-modal.component.html',
  styleUrl: './update-category-modal.component.css'
})
export class UpdateCategoryModalComponent {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<any>();
  
  data: any;
  updateCategoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.updateCategoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.updateCategoryForm.patchValue({
        name: this.data.name
      });
    }
  }

  get name() {
    return this.updateCategoryForm.get('name');
  }

  closeMe() {
    this.closeMeEvent.emit();
  }

  confirm() { 
    if (this.updateCategoryForm.valid) {
      const { name } = this.updateCategoryForm.value;
      const updatedCategoryData: any = { name };
      
      this.confirmEvent.emit(updatedCategoryData);
    }
  }

}
