import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-details-subcategory-modal',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './details-subcategory-modal.component.html',
  styleUrl: './details-subcategory-modal.component.css'
})
export class DetailsSubcategoryModalComponent {

  @Output() closeMeEvent = new EventEmitter();

  data: any;

  ngOnInit(): void {
    console.log(this.data);
    
  }

  closeMe() {
    this.closeMeEvent.emit();
  }

}
