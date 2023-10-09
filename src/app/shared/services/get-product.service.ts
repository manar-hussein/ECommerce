import { Category } from 'src/app/shared/interfaces/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class GetProductService {
  

  constructor(private _http:HttpClient) { }
  Product():Observable<any>{
    return this._http.get(`https://ecommerce.routemisr.com/api/v1/products`)
  };
  category():Observable<any>{
    return this._http.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  };
  Brand():Observable<any>{
    return this._http.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  };
  specificProduct(productId:string):Observable<any>{
    return this._http.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
  }

  getProductsByCategoryName(products:Product[], categoryName:string)
  {
    let res=products.filter(function(product){return product.category.name == categoryName})
    return res
  }


}
