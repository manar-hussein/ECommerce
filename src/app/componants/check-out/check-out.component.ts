import { User } from './../../../core/interfaces/user';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CartService } from 'src/app/shared/services/cart.service';
import { Cart } from 'src/app/shared/interfaces/cart';
import { PlaceOrderService } from 'src/app/shared/services/place-order.service';
import { Router } from '@angular/router';
import { State } from 'src/app/shared/interfaces/state';
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [
    CommonModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  paymentMethod!: string;
  cart: Cart = {} as Cart;
  shippingAddress: FormGroup;
  userInfo: FormGroup = new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phones: new FormArray([new FormControl('')]),
  });
  EgyptCities: string[] = [];
  user: User = {} as User;
  add: boolean = false;

  constructor(
    private _cartServise: CartService,
    private _placeOrder: PlaceOrderService,
    private _router: Router,
    private _auth: AuthService
  ) {

    this.shippingAddress = new FormGroup({
      details: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),

      city: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    this._cartServise.cartProduct().subscribe({
      next: (res) => {
        (this.cart = res.data);
      },
    });
    this.getEgyptCities();
  }
 
  payCashOnDelivery(shippingAddress: FormGroup) {
    this._placeOrder
      .payCashOnDelivery(shippingAddress, this.cart._id)
      .subscribe({
        next: (res) => {
          this._cartServise.numberOfItemsInCart.next(0)
          this._router.navigate(['/allorders']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  payByVisa(shippingAddress: FormGroup) {
    this._placeOrder.payByVisa(shippingAddress, this.cart._id).subscribe({
      next: (res) => {
        this._cartServise.numberOfItemsInCart.next(0)
        window.location.href=res.session.url
         
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getEgyptCities() {
    this._placeOrder.getEgyptCities().subscribe({
      next: (res) => {
        this.EgyptCities = res.data;
      },
      error: (err) => {
        this.EgyptCities = ['Abu Hammad','Al Mahallah al Kubra',
'Al Mansurah','Al Marj','Alexandria','Almazah','Ar Rawdah','Assiut','Az Zamalik','Badr','Banha','Bani Suwayf','Cairo','Damietta','Faraskur','Flaminj','Giza','Heliopolis','Helwan','Hurghada','Ismailia','Kafr ash Shaykh','Luxor','Madinat an Nasr','Madinat as Sadis min Uktubar','Minya','Nasr','New Cairo','Port Said','Rafah','Ramsis','Sadat','Shirbin','Shubra','Sohag','Suez','Tanta','Toukh','Zagazig','Abu Simbel','Aswan','Idfū','Kawm Umbū','Abnūb','Abū Tīj','Al Badārī','Al Qūşīyah','Asyūţ','Dayrūţ','Manfalūţ','Abū al Maţāmīr','Ad Dilinjāt','Damanhūr','Ḩawsh ‘Īsá','Idkū','Kafr ad Dawwār','Kawm Ḩamādah','Rosetta','Al Fashn','Banī Suwayf','Būsh','Sumusţā as Sulţānī','Ḩalwān','‘Izbat al Burj','Ajā','Al Jammālīyah','Al Manşūrah','Al Manzalah','Al Maţarīyah','Bilqās','Dikirnis','Minyat an Naşr','Shirbīn','Ţalkhā','Az Zarqā','Fāraskūr','Al Fayyūm','Al Wāsiţah','Ibshawāy','Iţsā','Ţāmiyah','Al Maḩallah al Kubrá','Basyūn','Kafr az Zayyāt','Quţūr','Samannūd','Tanda','Zefta','Al ‘Ayyāţ','Al Bawīţī','Al Ḩawāmidīyah','Aş Şaff','Awsīm','Madīnat Sittah Uktūbar','Al Ḩāmūl','Disūq','Fuwwah','Markaz Disūq','Munshāt ‘Alī Āghā','Sīdī Sālim','Markaz al Uqşur','Al ‘Alamayn','Mersa Matruh','Siwa Oasis','Abū Qurqāş','Al Minyā','Banī Mazār','Dayr Mawās','Mallawī','Maţāy','Samālūţ','Al Bājūr','Ash Shuhadā’','Ashmūn','Munūf','Quwaysinā','Shibīn al Kawm','Talā','Al Khārijah','Qaşr al Farāfirah','Arish','Al Khānkah','Al Qanāţir al Khayrīyah','Banhā','Qalyūb','Shibīn al Qanāṭir','Dishnā','Farshūţ','Isnā','Kousa',"Naja' Ḥammādī",'Qinā','Al Quşayr','El Gouna','Makadi Bay','Marsa Alam','Ras Gharib','Safaga','Akhmīm','Al Balyanā','Al Manshāh','Jirjā','Juhaynah','Markaz Jirjā','Markaz Sūhāj','Ţahţā','Dahab','El-Tor','Nuwaybi‘a','Saint Catherine','Sharm el-Sheikh','Ain Sukhna',
        ];
      },
    });
  }
  get phones() {
    return this.userInfo.get('phones') as FormArray;
  }
  addPhoneInput(event: any) {
    this.phones.push(new FormControl(''));
  }
  removePhoneInput(event: any) {
    this.phones.controls.pop();
  }

 
}
