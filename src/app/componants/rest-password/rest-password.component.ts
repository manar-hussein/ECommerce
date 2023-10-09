import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.css']
})
export class RestPasswordComponent {
  isLoading:boolean=false;
  restPasswordCodeForm:FormGroup = new FormGroup({
    resetCode: new FormControl('',Validators.required)
  })

  constructor(private _authService:AuthService ,private _router:Router){}
  sentCode(data:FormGroup)
  {
    this.isLoading=true
    this._authService.VerifyResetCode(data.value).subscribe({
      next:(res)=>{this.isLoading=false,this._router.navigate(['/restPassword'])},
      error:(Error)=>{this.isLoading=false}
    })
  }

}
