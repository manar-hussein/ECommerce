import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Brand } from 'src/app/shared/interfaces/brand';
import { Product } from 'src/app/shared/interfaces/product';
import { GetProductService } from 'src/app/shared/services/get-product.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit{
  allProducts:Product[]=[];
  allBrands:Brand[]=[];
  allBrandsNames:string[]=[];
  allBrandsNamesRepeated:string[]=[];
  allBrandsNamesRepeatedSet:Set<string>=new Set;
  productOfSpecificBrand:Product[]=[];
  isLoading:boolean=false;
  responsiveOptions: any[] | undefined;
  costomProsuct:Product[]=[];

  index=0;
  constructor(private _productserv:GetProductService){this.isLoading=true}
  ngOnInit(): void {


    this._productserv.Product().subscribe({
      next:(res)=>{this.allProducts=res.data;
        for (const iterator of this.allProducts) {
          this.allBrandsNamesRepeated.push(iterator.brand.name);
        };
        this.allBrandsNamesRepeatedSet=new Set(this.allBrandsNamesRepeated)
        this.allBrandsNames=[...this.allBrandsNamesRepeatedSet]

      }
    });
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];

   
  }

  // customOptions: OwlOptions = {
  //   loop: false,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: ['', ''],
  //   // responsive: {
  //   //   0: {
  //   //     items: 1
  //   //   },
  //   //   400: {
  //   //     items: 2
  //   //   },
  //   //   740: {
  //   //     items: 2
  //   //   },
  //   //   940: {
  //   //     items: 4
  //   //   }
  //   // },
  //   nav: true
  // }

  serch(brandName:string)
{
  let test =this.allProducts.filter(function(product){return product.brand.name == brandName})
  this.costomProsuct=test.splice(0,5)
  return this.costomProsuct
}



}
