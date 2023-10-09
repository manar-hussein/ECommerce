import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJtYW5hcm5hYmlsOTExQGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IkM2dXhJeWJPTFNKcGFNUWx5X2lwMWNNSFRlWVlhMzlKT2VKUk56UmhwU05XNWg4VXNfV0lGakYwZWxYQmJGX0FqX3cifSwiZXhwIjoxNjk2Njc5MDM1fQ.Q0O_hwwUMmv9397TTdmt97rKTgzfQyCoMHhUHGWHhA8
@Injectable({
  providedIn: 'root'
})
export class PlaceOrderService {

  constructor(private _http:HttpClient) { }
  payCashOnDelivery(addressForm:FormGroup,cartId:string):Observable<any>
  {
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,addressForm.value,
    {headers:{token:`${localStorage.getItem('userToken')}`}}
    )
  }
  payByVisa(addressForm:FormGroup,cartId:string):Observable<any>
  {
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,addressForm.value,
    {headers:{token:`${localStorage.getItem('userToken')}`}}
    )
  }


  getEgyptCities():Observable<any>
  {
    return this._http.post(`https://countriesnow.space/api/v0.1/countries/cities`,
    {
      
        "country": "egypt"
    
    }
    )
  }

  allOrders(userId:string):Observable<any>
 {
   return this._http.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
 }
}
