import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/shared/interfaces/brand';
import { GetProductService } from 'src/app/shared/services/get-product.service';

@Component({
  selector: 'app-all-brands',
  templateUrl: './all-brands.component.html',
  styleUrls: ['./all-brands.component.css']
})
export class AllBrandsComponent implements OnInit{
  allBrands:Brand[]=[];
  constructor(private _getProductServices:GetProductService){}
  ngOnInit(): void {
      this._getProductServices.Brand().subscribe({
        next:(res)=>{this.allBrands=res.data,
          console.log(this.allBrands)
        }
      })
  }

}
