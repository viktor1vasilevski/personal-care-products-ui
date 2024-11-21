import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-product-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-product-modal.component.html',
  styleUrl: './update-product-modal.component.css'
})
export class UpdateProductModalComponent implements OnInit {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<any>();

  updateProductForm: FormGroup;
  data: any;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  imagePrefix = 'data:image/jpeg;base64,';

    
  constructor(private fb: FormBuilder) {
    this.updateProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      brand: ['', [Validators.required]],
      description: ['', [Validators.required]],
      unitPrice: ['', [Validators.required, Validators.min(0.01)]],
      unitQuantity: [null, [Validators.required, Validators.min(1)]],
      image: ['', [Validators.required]],
      volume: [null, [Validators.required, Validators.min(1)]],
      scent: [''],
      edition: [''],
      subcategoryId: ['', [Validators.required]],
    });
  }
  
  ngOnInit() {
    if (this.data) {
      if(this.data.imageData != "") {
        this.imagePreviewUrl = `${this.imagePrefix}${this.data.imageData}`;
        this.updateProductForm.patchValue({ image: this.data.ImageData })
      }
      this.updateProductForm.patchValue({
        name: this.data.name,
        brand: this.data.brand,
        description: this.data.description,
        unitPrice: this.data.unitPrice,
        edition: this.data.edition,
        volume: this.data.volume,
        scent: this.data.scent,
        unitQuantity: this.data.unitQuantity,
        subcategoryId: this.data.subcategoryId
      });
    }
  }

  get name() {
    return this.updateProductForm.get('name');
  }
  
  get brand() {
    return this.updateProductForm.get('brand');
  }
  
  get description() {
    return this.updateProductForm.get('description');
  }
  
  get unitPrice() {
    return this.updateProductForm.get('unitPrice');
  }
  
  get unitQuantity() {
    return this.updateProductForm.get('unitQuantity');
  }
  
  get volume() {
    return this.updateProductForm.get('volume');
  }
  
  get scent() {
    return this.updateProductForm.get('scent');
  }
  
  get edition() {
    return this.updateProductForm.get('edition');
  }
  
  get image() {
    return this.updateProductForm.get('image');
  }
  
  get subcategoryId() {
    return this.updateProductForm.get('subcategoryId');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.imagePreviewUrl = base64String;
        this.updateProductForm.patchValue({ image: base64String });
      };

      reader.readAsDataURL(file); 
    }
  }


  closeMe() {
    this.closeMeEvent.emit();
  }


  confirm(): void {
    this.confirmEvent.emit();
  }

}
