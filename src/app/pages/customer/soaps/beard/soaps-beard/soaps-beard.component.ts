import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../core/services/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-soaps-beard',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './soaps-beard.component.html',
  styleUrl: './soaps-beard.component.css'
})
export class SoapsBeardComponent implements OnInit {

  soapsBeardProducts: any[] = [];

  constructor(private _productService: ProductService
  ) {

  }

  ngOnInit(): void {
    this._productService.getProducts({category: 'soaps', subcategory: 'beard', skip: 0, take: 100 }).subscribe((response: any) => {
      if(response.success) {
        this.soapsBeardProducts = response.data;

      }  
    })
  }




}
