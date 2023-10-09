import { BehaviorSubject } from 'rxjs';
import { Component, OnChanges, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthService } from 'src/core/services/auth.service';
import { WishItemsService } from 'src/app/shared/services/wish-items.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  isLoggIn:boolean=false;
  numOfCartItems:number=0;
  hasFavoutiteProduct:boolean=false;
  constructor(private _auth:AuthService , private _cart:CartService , private _wishListService:WishItemsService){
    this._cart.cartProduct().subscribe({
      next:(res)=>{this._cart.numberOfItemsInCart.next(res.numOfCartItems)},
      error:(err)=>{
         if(err.statusText == 'Not Found')
         {
           this._cart.numberOfItemsInCart.next(0)
         }
      }
    });

    this._wishListService.wishListProduct().subscribe({
      next:(res)=>{
        if(res.count>0)
        {
          this.hasFavoutiteProduct=true;
        }else
        {
          this.hasFavoutiteProduct=false
        }
      }
    });


    this._wishListService.addedToWishList.subscribe({
      next:(res)=>{
        this.hasFavoutiteProduct=res;
      }
    })

    this._auth.userData.subscribe((res)=>{
      if(this._auth.userData.getValue())
      {
        this.isLoggIn=true;
      }else
      {
        this.isLoggIn=false;
      }
    });
    this._cart.numberOfItemsInCart.subscribe({
      next:(res)=>{this.numOfCartItems=res}
    })
  }
  ngOnInit(): void {
    this._cart.numberOfItemsInCart.subscribe()
   
  }
  logOut(){this._auth.logOut()}
}
