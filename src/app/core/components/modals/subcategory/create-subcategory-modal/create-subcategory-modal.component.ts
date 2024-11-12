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
export class CreateSubcategoryModalComponent implements OnInit {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<any>();

  createSubcategoryForm: FormGroup;
  filteredData: any[] = []; // Store backend-filtered categories
  showOptions: boolean = false; // Controls dropdown visibility
  private apiUrl = 'https://localhost:44342/api/categories/GetCategoriesDropdown';
  name: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createSubcategoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required] // Add category form control
    });
  }

  ngOnInit(): void {
    // Listen for changes in the category input field
    this.createSubcategoryForm.get('category')?.valueChanges
      .pipe(
        debounceTime(300), // Wait 300ms after the last input
        distinctUntilChanged(), // Only fetch when the input changes
        switchMap(value => this.fetchCategories(value)) // Fetch categories from the backend
      )
      .subscribe(categories => {
        this.filteredData = categories;
        this.showOptions = true;
      });
  }

  // Fetch categories from the backend
  fetchCategories(name: string) {
    debugger
    const params = { name };
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  // Select a category from the list
  selectCategory(category: any) {
    this.createSubcategoryForm.get('category')?.setValue(category.name); // Set selected category name
    this.showOptions = false; // Hide the dropdown
  }

  showDropdown() {
    this.showOptions = true;
  }

  hideDropdown() {
    setTimeout(() => {
      this.showOptions = false;
    }, 200); // Small delay to allow item selection before hiding the dropdown
  }

  // Close the modal
  closeMe() {
    this.closeMeEvent.emit();
  }

  // Confirm and submit the form data
  confirm() {
    if (this.createSubcategoryForm.valid) {
      const { name, category } = this.createSubcategoryForm.value;
      const createSubcategoryData = { name, category };
      
      // Emit the form data
      this.confirmEvent.emit(createSubcategoryData);
    }
  }
}
