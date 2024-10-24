import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-category-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-category-modal.component.html',
  styleUrl: './delete-category-modal.component.css'
})
export class DeleteCategoryModalComponent {

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
