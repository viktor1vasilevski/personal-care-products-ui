import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-subcategory-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-subcategory-modal.component.html',
  styleUrls: ['./create-subcategory-modal.component.css']
})
export class CreateSubcategoryModalComponent {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<any>();

  createSubcategoryForm: FormGroup;
  name: any;
  categoryId: any;
  data: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createSubcategoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      categoryId: ['', Validators.required] // Add category form control
    });
  }

  closeMe() {
    this.closeMeEvent.emit();
  }


  confirm() {
    debugger
    if (this.createSubcategoryForm.valid) {
      const { name, categoryId } = this.createSubcategoryForm.value;
      const createSubcategoryData = { name, categoryId };
      debugger
      // Emit the form data
      this.confirmEvent.emit(createSubcategoryData);
    }
  }
}
