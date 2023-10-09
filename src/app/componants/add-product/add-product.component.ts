import { Component ,EventEmitter,Input ,Output} from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishItemsService } from 'src/app/shared/services/wish-items.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  @Input() productId:string = '';
  @Input() addedToWishList:boolean|undefined=false;
 
 
  constructor(private _cartService:CartService,private _wishListService:WishItemsService){

  }
  addToCart()
  {
    this._cartService.addProductToCart(this.productId).subscribe({
      next:(res)=>{this._cartService.numberOfItemsInCart.next(res.numOfCartItems)}
    })
  }

  addToWishList()
  {
    this._wishListService.addProductToWishList(this.productId).subscribe({
      next:(res)=>{
        this._wishListService.addedToWishList.next(true),
        this.addedToWishList=this._wishListService.addedToWishList.getValue(),
        this._wishListService.wishListProductsId=(res.data),
        localStorage.setItem('wishListProductsId',JSON.stringify(this._wishListService.wishListProductsId))
      }
    })
  }

  

}
