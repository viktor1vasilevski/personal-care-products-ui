import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-product-modal.component.html',
  styleUrl: './create-product-modal.component.css'
})
export class CreateProductModalComponent {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<any>();

  data: any;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  selectedImageFile: File | null = null;
  selectedImageData?: ArrayBuffer;

  createProductForm = this.fb.group({
    name: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    description: ['', [Validators.required]],
    unitPrice: [null, [Validators.required, Validators.min(0.01)]],
    unitQuantity: [null, [Validators.required, Validators.min(1)]],
    volume: [null, [Validators.required, Validators.min(1)]],
    scent: [''],
    edition: [''],
    image: [null as ArrayBuffer | null, [Validators.required]],  // Change from File to ArrayBuffer
    subcategoryId: ['', [Validators.required]],
  });
  


  constructor(private fb: FormBuilder) {}

  get name() {
    return this.createProductForm.get('name');
  }
  
  get brand() {
    return this.createProductForm.get('brand');
  }
  
  get description() {
    return this.createProductForm.get('description');
  }
  
  get unitPrice() {
    return this.createProductForm.get('unitPrice');
  }
  
  get unitQuantity() {
    return this.createProductForm.get('unitQuantity');
  }
  
  get volume() {
    return this.createProductForm.get('volume');
  }
  
  get scent() {
    return this.createProductForm.get('scent');
  }
  
  get edition() {
    return this.createProductForm.get('edition');
  }
  
  get image() {
    return this.createProductForm.get('image');
  }
  
  get subcategoryId() {
    return this.createProductForm.get('subcategoryId');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      this.selectedImageFile = input.files[0];
  
      // Preview the image
      this.previewImage(this.selectedImageFile);
  
      // Convert the file to ArrayBuffer for further processing
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          this.selectedImageData = reader.result; // Store the ArrayBuffer
        } else {
          console.error("FileReader result is not an ArrayBuffer.");
        }
      };
      reader.readAsArrayBuffer(this.selectedImageFile);
    }
  }

  // Preview image in the modal
  previewImage(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imagePreviewUrl = reader.result; // Set the image preview URL
    };
    reader.readAsDataURL(file); // Convert the file to base64 format
  }
  
  closeMe() {
    this.closeMeEvent.emit();
  }


  confirm() {
    const productData = this.createProductForm.value;
    if (this.selectedImageData) {
      productData.image = this.selectedImageData;
      this.confirmEvent.emit(productData);
    }
  }
  
  

}
