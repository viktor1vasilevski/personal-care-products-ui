import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-subcategory-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-subcategory-modal.component.html',
  styleUrl: './delete-subcategory-modal.component.css'
})
export class DeleteSubcategoryModalComponent {

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
