import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishItemsService {
  baseUrl:string=`https://ecommerce.routemisr.com`;
  addedToWishList:BehaviorSubject<boolean>= new BehaviorSubject(false);
  wishListProductsId:string[]=[]
  isInWishList:BehaviorSubject<boolean>= new BehaviorSubject(false);
  constructor(private _http:HttpClient) { }

  addProductToWishList(productId:string):Observable<any>
  {
    return this._http.post(`${this.baseUrl}/api/v1/wishlist`,
    {
      "productId":productId
    },
    {
      headers:{token:`${localStorage.getItem('userToken')}`}
    }
    )
  };

  RemoveProductFromWishList(productId:string):Observable<any>
  {
    return this._http.delete(`${this.baseUrl}/api/v1/wishlist/${productId}`,
    {
      headers:{token:`${localStorage.getItem('userToken')}`}
    }
    )
  };

  wishListProduct():Observable<any>
  {
    return this._http.get(`${this.baseUrl}/api/v1/wishlist`,
    {
      headers:{token:`${localStorage.getItem('userToken')}`}
    }
    )
  };


}
