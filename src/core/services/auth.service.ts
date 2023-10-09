import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode'
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient , private _router:Router) {
    if(localStorage.getItem('userToken'))
    {
      this.getUserData()
      this._router.navigate(['/home']);
      
    }
   }
  userData:BehaviorSubject<any>=new BehaviorSubject('');


  register (user:User):Observable<any>
  {
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,user)
  }

  signIn(user:User):Observable<any>
  {
     return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,user)
  }

  getUserData()
  {
    let token =JSON.stringify(localStorage.getItem('userToken'));
    let enCoded = jwtDecode(token)
    this.userData.next(enCoded);
  }

  logOut()
  {
    this.userData.next(null);
    localStorage.removeItem('userToken');
    this._router.navigate(['/signIn'])
  }

  forgetPassword(data:FormGroup):Observable<any>
  {
   return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,data)
  }

  VerifyResetCode(data:FormGroup):Observable<any>
  {
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,data)
  }

  restPassword(data:FormGroup):Observable<any>
  {
    return this._http.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,data)
  }


}
