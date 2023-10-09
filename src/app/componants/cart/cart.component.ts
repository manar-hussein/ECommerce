import { Component, OnInit, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/shared/services/cart.service';
import { Cart } from 'src/app/shared/interfaces/cart';
import { Product } from 'src/app/shared/interfaces/product';
import { Router,  } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cart:Cart ={} as Cart;
  apiError:string=''
 
  constructor(private _cartService:CartService , private _router:Router){}

  ngOnInit(): void {
      this._cartService.cartProduct().subscribe({
        next:(res)=>{this.cart=res.data,this._cartService.numberOfItemsInCart.next(res.numOfCartItems)},
        error:(err)=>{
          this.apiError=err.statusText
        }
      })
  };

  updateCartProductQty(count:number,productId:string)
  {
    if(count>0)
    {
      this._cartService.updateCartProductQty(count,productId).subscribe({
        next:(res)=>{
          this.cart=res.data;
        }
  
      })
    }else
    {
      this.removeItem(productId)
    }

  };

  removeItem(productId:string)
  {
    this._cartService.removeItemFromCart(productId).subscribe({
      next:(res)=>{
        this.cart=res.data;
        this._cartService.numberOfItemsInCart.next(res.numOfCartItems);
      },

      error:(err)=>{}

    })
  }

  backhome()
  {
    this._router.navigate(['home'])
  }
  removeCart()
  {
    this._cartService.removeCart().subscribe({
      next:(res)=>{
        this.apiError='not Found',
        this.cart.products=[]
        this._cartService.numberOfItemsInCart.next(0);
      }
    })
  };

  checkOut()
  {
    this._router.navigate(['/checkOut'])
  }


}
