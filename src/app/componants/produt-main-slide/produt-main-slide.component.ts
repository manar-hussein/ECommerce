import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { GetProductService } from 'src/app/shared/services/get-product.service';

@Component({
  selector: 'app-produt-main-slide',
  templateUrl: './produt-main-slide.component.html',
  styleUrls: ['./produt-main-slide.component.css']
})
export class ProdutMainSlideComponent implements OnInit{
  productId:string='';
  userChossenProduct:Product={}as Product;
  clickedPhotoSrc:string='';
  constructor(private _activatedRout:ActivatedRoute , private _getProductServices:GetProductService ,private _cartService:CartService){
    this._activatedRout.paramMap.subscribe({
      next:(res:any)=>{this.productId=res.params.id}
    })
  }

  ngOnInit(): void {
    this._getProductServices.specificProduct(this.productId).subscribe({
      next:(res=>{this.userChossenProduct=res.data;
        this.clickedPhotoSrc=this.userChossenProduct.imageCover;})
    });  
  }

  changeMainPhoto(event:any){
    this.clickedPhotoSrc=event.target.getAttribute('src');
  }
  addToCart()
  {
    this._cartService.addProductToCart(this.productId).subscribe({
      next:(res)=>{console.log(res),this._cartService.numberOfItemsInCart.next(res.numOfCartItems)
        
      }
    })
  }

}
