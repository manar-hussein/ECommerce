import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from 'src/app/shared/interfaces/cart';


@Component({
  selector: 'app-order-summry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summry.component.html',
  styleUrls: ['./order-summry.component.css']
})
export class OrderSummryComponent {
  @Input () cart:Cart={}as Cart

}
