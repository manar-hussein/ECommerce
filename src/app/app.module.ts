import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './componants/sign-up/sign-up.component';
import { LogInComponent } from './componants/log-in/log-in.component';
import { HomeComponent } from './componants/home/home.component';
import { NavBarComponent } from './componants/nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductItemComponent } from './componants/product-item/product-item.component';
import { DescriptionSummryPipe } from './shared/pipes/description-summry.pipe';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProdutMainSlideComponent } from './componants/produt-main-slide/produt-main-slide.component';
import { CategoryComponent } from './componants/category/category.component';
import { BrandComponent } from './componants/brand/brand.component';
import { OtherComponent } from './componants/other/other.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import { CarouselModule } from 'primeng/carousel';
import { GetIndexPipe } from './shared/pipes/get-index.pipe';
import { SpecificProductsComponent } from './componants/specific-products/specific-products.component';
import { AllBrandsComponent } from './componants/all-brands/all-brands.component';
import { ForgertPasswordComponent } from './componants/forgert-password/forgert-password.component';
import { RestPasswordComponent } from './componants/rest-password/rest-password.component';
import { AddProductComponent } from './componants/add-product/add-product.component';
import { NewPasswordComponent } from './componants/new-password/new-password.component';
import { SpinnerComponent } from './componants/spinner/spinner.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { AllordersComponent } from './componants/allorders/allorders.component';
import { NotFoundComponent } from './componants/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    HomeComponent,
    NavBarComponent,
    ProductItemComponent,
    DescriptionSummryPipe,
    ProdutMainSlideComponent,
    CategoryComponent,
    BrandComponent,
    OtherComponent,
    GetIndexPipe,
    SpecificProductsComponent,
    AllBrandsComponent,
    ForgertPasswordComponent,
    RestPasswordComponent,
    AddProductComponent,
    NewPasswordComponent,
    SpinnerComponent,
    AllordersComponent,
    NotFoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatMenuModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
   },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
