import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  constructor(private _reactiveFormsModule:ReactiveFormsModule , private _authService:AuthService , private _router:Router){}
  isLoading:boolean=false;
  apiErros:string='';
  logInForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl(''),
  })

  logIn(logInForm:FormGroup)
  {
    if(logInForm.valid){
      this.isLoading=true
      this._authService.signIn(logInForm.value).subscribe({
        next:(res)=>{
          this.isLoading=false;
          localStorage.setItem('userToken',res.token)
          this._authService.getUserData()
          this._router.navigate(['/home'])
        },
        error:(err)=>{
          this.isLoading=false;
          this.apiErros=err.error.message;
        }
      })
    }
  }
}
