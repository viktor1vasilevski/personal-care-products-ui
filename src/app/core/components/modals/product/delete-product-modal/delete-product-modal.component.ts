import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-product-modal',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './delete-product-modal.component.html',
  styleUrl: './delete-product-modal.component.css'
})
export class DeleteProductModalComponent {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<any>();

  data: any;

  closeMe() {
    this.closeMeEvent.emit();
  }
  
  confirm() {    
    this.confirmEvent.emit(true);   
  }

}
