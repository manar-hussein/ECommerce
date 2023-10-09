import { Component, OnChanges, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { GetProductService } from 'src/app/shared/services/get-product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/shared/interfaces/category';
import { WishItemsService } from 'src/app/shared/services/wish-items.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  productList:Product[]=[];
  categoryList:Category[]=[];
  index:number=0;
  responsiveOptions: any[] | undefined;
  wishProduct:Product[]=[]
  
 
  constructor(private _product:GetProductService ,private _wishListService:WishItemsService){}
  ngOnInit(): void {
    this._wishListService.wishListProduct().subscribe({
      next:(res)=>{
        this.wishProduct=res.data;
      }
    })

    this._product.Product().subscribe({
      next:(res)=>{
        this.productList=res.data;
      }
    });
    this._product.category().subscribe({
      next:(res)=>{
        this.categoryList=res.data;
      }
    });

   

    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 5,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 5,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 5,
          numScroll: 1
      }
  ];
  }
}
