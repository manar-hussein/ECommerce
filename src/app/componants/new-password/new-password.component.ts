import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {
  isLoading:boolean=false;
  apiError:string=''
  restPasswordForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required ,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)])
  })

  constructor(private _auth:AuthService,private _router:Router){}

  submit(form:FormGroup)
  {
    this.isLoading=true;
    if(form.valid)
    {
      this._auth.restPassword(form.value).subscribe({
        next:(res)=>{
          this.isLoading=false;
          localStorage.setItem('userToken',res.token)
           this._auth.getUserData()
           this._router.navigate(['/home'])
        },
        error:(err)=>{this.isLoading=false;this.apiError=err.massege}
      })
    }
  }
}
