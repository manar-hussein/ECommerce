import { Component, OnInit } from '@angular/core';
import { PlaceOrderService } from 'src/app/shared/services/place-order.service';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit{
  userId:string=''
  orders:any;
  constructor(private _auth:AuthService,private _orders:PlaceOrderService)
  {
    this._auth.userData.subscribe((res)=>
    {
      this.userId=res.id
      console.log(this.userId)
    })
  }

  ngOnInit(): void {
      this._orders.allOrders(this.userId).subscribe({
        next:(res)=>{console.log(res),this.orders=res}
      })
  }



}
