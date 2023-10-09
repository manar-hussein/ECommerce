import { Component } from '@angular/core';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { RatingModule } from 'primeng/rating';


@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent {
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
