import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';
import { RestPasswordComponent } from '../rest-password/rest-password.component';


@Component({
  selector: 'app-forgert-password',
  templateUrl: './forgert-password.component.html',
  styleUrls: ['./forgert-password.component.css']
})
export class ForgertPasswordComponent {
  isLoading:boolean=false;
  forgetPasswordForm:FormGroup = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
   
  })
 
 constructor(private _reativeformesmodule:ReactiveFormsModule , private _auth:AuthService , private _rout:Router){}

 forgetPassword(data:FormGroup)
 {
  this.isLoading=true
   this._auth.forgetPassword(data.value).subscribe({
    next:(res)=>{
      this.isLoading=false;
      this._rout.navigate(['/restPasswordCode'])
    },
    error:()=>{this.isLoading=false;}
   })
 }
   

}
