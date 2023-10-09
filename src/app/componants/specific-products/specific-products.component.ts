import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/category';
import { GetProductService } from 'src/app/shared/services/get-product.service';

@Component({
  selector: 'app-specific-products',
  templateUrl: './specific-products.component.html',
  styleUrls: ['./specific-products.component.css']
})
export class SpecificProductsComponent implements OnInit{
  allCategories:Category[]=[];
  constructor(private _getProductServices:GetProductService){}
  ngOnInit(): void {
      this._getProductServices.category().subscribe({
        next:(res)=>{this.allCategories=res.data,
          console.log(this.allCategories)
        }
      })
  }

}
