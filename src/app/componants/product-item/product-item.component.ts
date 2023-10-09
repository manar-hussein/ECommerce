import { Product } from 'src/app/shared/interfaces/product';
import { GetProductService } from './../../shared/services/get-product.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{
  @Input() product:Product = {} as Product;
 
  
  ngOnInit(): void {

   
   
  }

}
