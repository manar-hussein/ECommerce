import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Header } from 'primeng/api';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  userCart:Cart={}as Cart;
  numberOfItemsInCart:BehaviorSubject<number>=new BehaviorSubject(0)
  constructor(private _http:HttpClient) {}
  addProductToCart(id:string):Observable<any>
  {
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {productId:id},
    {
      headers:{token:`${localStorage.getItem('userToken')}`}
    }
    )
}
 cartProduct():Observable<any>
 {
   return this._http.get(`https://ecommerce.routemisr.com/api/v1/cart`,
   {headers:{token:`${localStorage.getItem('userToken')}`}})
 }

 updateCartProductQty(count:number,productId:string):Observable<any>
 {
   return this._http.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
   {
    "count":count
   },
   {headers:{token:`${localStorage.getItem('userToken')}`,}},
   )
 }

 removeItemFromCart(productId:string):Observable<any>
 {
   return this._http.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,

   {headers:{token:`${localStorage.getItem('userToken')}`,}},
   )
 }

 removeCart():Observable<any>
 {
   return this._http.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
   {headers:{token:`${localStorage.getItem('userToken')}`,}},
   )
 }

 

}
