import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishItemsService } from 'src/app/shared/services/wish-items.service';
import { Product } from 'src/app/shared/interfaces/product';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';






@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
 
})
export class WishListComponent implements OnInit{
  
  ProductList:Product[]=[];
  constructor(private _wishListServise:WishItemsService ,private _cartService:CartService ){}

  ngOnInit(): void {
      this._wishListServise.wishListProduct().subscribe({
        next:(res)=>{
          this.ProductList=res.data
        }
      })
  }

  getWishList()
  {
    this._wishListServise.wishListProduct().subscribe({
      next:(res)=>{
        this.ProductList=res.data;
        if(res.data.length ==0)
        {
          this._wishListServise.addedToWishList.next(false)
        }
      }
    })
  }

  addToCart(productId:string)
  {
    this._cartService.addProductToCart(productId).subscribe({
      next:(res)=>{this._cartService.numberOfItemsInCart.next(res.numOfCartItems)
        
      }
    })
  };
  removeItem(productId:string)
  {
    this._wishListServise.RemoveProductFromWishList(productId).subscribe({
      next:(res)=>{this.getWishList()
      }
    })
  }

}
