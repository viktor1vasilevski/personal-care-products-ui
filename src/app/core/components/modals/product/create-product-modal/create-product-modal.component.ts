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
    image: [ '' , [Validators.required]],
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
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.imagePreviewUrl = base64String;
        this.createProductForm.patchValue({ image: base64String });
      };

      reader.readAsDataURL(file); 
    }
  }
  
  
  closeMe() {
    this.closeMeEvent.emit();
  }


  confirm(): void {
    if (this.createProductForm.valid) {
      this.confirmEvent.emit(this.createProductForm.value);
    }
  }
  
  

}
