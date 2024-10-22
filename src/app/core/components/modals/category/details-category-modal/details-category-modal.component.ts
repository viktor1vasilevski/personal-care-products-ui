import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-details-category-modal',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './details-category-modal.component.html',
  styleUrl: './details-category-modal.component.css'
})
export class DetailsCategoryModalComponent implements OnInit {


  @Output() closeMeEvent = new EventEmitter();

  data: any;

  ngOnInit(): void {
    console.log(this.data);
    
  }

  closeMe() {
    this.closeMeEvent.emit();
  }

}
