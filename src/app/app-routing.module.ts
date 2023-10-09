import { CartComponent } from './componants/cart/cart.component';
import { SpecificProductsComponent } from './componants/specific-products/specific-products.component';
import { BrandComponent } from './componants/brand/brand.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './componants/sign-up/sign-up.component';
import { LogInComponent } from './componants/log-in/log-in.component';
import { HomeComponent } from './componants/home/home.component';
import { authGuard } from './auth.guard';
import { ProdutMainSlideComponent } from './componants/produt-main-slide/produt-main-slide.component';
import { CategoryComponent } from './componants/category/category.component';
import { OtherComponent } from './componants/other/other.component';
import { AllBrandsComponent } from './componants/all-brands/all-brands.component';
import { ForgertPasswordComponent } from './componants/forgert-password/forgert-password.component';
import { RestPasswordComponent } from './componants/rest-password/rest-password.component';
import { NewPasswordComponent } from './componants/new-password/new-password.component';
import { AllordersComponent } from './componants/allorders/allorders.component';
import { NotFoundComponent } from './componants/not-found/not-found.component';


const routes: Routes = [
  {path:'',redirectTo:'Register',pathMatch:'full'},
  {path:'Register',component:SignUpComponent},
  {path:'signIn',component:LogInComponent},
  {path:'forgetPassword',component:ForgertPasswordComponent},
  {path:'restPasswordCode',component:RestPasswordComponent},
  {path:'restPassword',component:NewPasswordComponent},
  {path:'home',canActivate:[authGuard] ,component:HomeComponent},
  {path:'product/:id',canActivate:[authGuard] ,component:ProdutMainSlideComponent},
  {path:'category',canActivate:[authGuard] ,component:CategoryComponent},
  {path:'brand',canActivate:[authGuard] ,component:BrandComponent},
  {path:'other',canActivate:[authGuard] ,component:OtherComponent},
  {path:'AllCategories',canActivate:[authGuard] ,component:SpecificProductsComponent},
  {path:'AllBrands',canActivate:[authGuard] ,component:AllBrandsComponent},
  {path:'allorders',canActivate:[authGuard] ,component:AllordersComponent},
  {path:'cart',canActivate:[authGuard] ,loadComponent:()=>import('./componants/cart/cart.component').then(c=>c.CartComponent)},
  {path:'checkOut',canActivate:[authGuard] ,loadComponent:()=>import('./componants/check-out/check-out.component').then(c=>c.CheckOutComponent)},
  {path:'wishList',canActivate:[authGuard] ,loadComponent:()=>import('./componants/wish-list/wish-list.component').then(c=>c.WishListComponent)},
  {path:'**',component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
