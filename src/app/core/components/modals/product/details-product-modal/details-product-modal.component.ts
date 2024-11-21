import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-details-product-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-product-modal.component.html',
  styleUrl: './details-product-modal.component.css'
})
export class DetailsProductModalComponent {

  @Output() closeMeEvent = new EventEmitter();

  data: any;

  get imageSrc(): string {
    debugger
    return `data:image/${this.data.imageType};base64,${this.data.imageData}`;
  }
  
  closeMe() {
    this.closeMeEvent.emit();
  }

}
