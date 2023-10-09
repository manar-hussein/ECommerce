import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  isLoading:boolean=false;
  apiErros:string='';
  isNotValid:boolean=false;
  constructor(private _authService:AuthService , private _router:Router)
  {}


  registerForm:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
    rePassword:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
  },

  {validators:this.rePasswordValidator}
 
  );


  register(registerForm:FormGroup)
  {
    if(registerForm.valid)
    {
      this.isLoading=true;
      this._authService.register(registerForm.value).subscribe({
        next:(res:any) => {
          this.isLoading=false;
          this._router.navigate(['/signIn'])
          
        },

        error:(err:any)=>{
          this.isLoading=false;
          if(err.error.message == 'fail')
          {
            this.apiErros=err.error.errors.msg
          }else{
            this.apiErros=err.error.message;
          }
        }
      })
    }else{
      this.isNotValid=true
    }
  }

//   rePasswordValidator():ValidatorFn
// {
//   return (rePassword:AbstractControl):ValidationErrors|null => {
//     let Password=this.registerForm.get('password');
//     let RePassword=rePassword.value;
//     let ValidationErrors ={RePasswordNotMatch:{value: rePassword.value}}
//     return (Password ==RePassword)? null:ValidationErrors
//   }
// }

/** A hero's name can't match the given regular expression */
rePasswordValidator(registerForm:any) {
  let password=registerForm.get('password');
  let rePassword =registerForm.get('rePassword');
  if(password.value==rePassword.value)
  {
    return null
  }else
  {
    rePassword?.setErrors({rePasswordNotMatch:'rePassword not match'})
    return {rePasswordNotMatch:'rePassword not match'}
  }
 
}

}
