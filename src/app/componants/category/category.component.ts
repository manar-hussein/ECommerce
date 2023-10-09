import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/category';
import { Product } from 'src/app/shared/interfaces/product';
import { GetProductService } from 'src/app/shared/services/get-product.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  allProducts:Product[]=[];
  allCategories:Category[]=[];
  allCategoriesNames:string[]=[];
  allCategoriesNamesRepeated:string[]=[];
  allCategoriesNamesRepeatedSet:Set<string>=new Set;
  productOfSpecificCategory:Product[]=[];
  isLoading:boolean=false;
  costomProsuct:Product[]=[];

responsiveOptions: any[] | undefined;

  index=0;
  constructor(private _productserv:GetProductService){this.isLoading=true}
  ngOnInit(): void {


    this._productserv.Product().subscribe({
      next:(res)=>{this.allProducts=res.data;
        for (const iterator of this.allProducts) {
          this.allCategoriesNamesRepeated.push(iterator.category.name);
        };
        this.allCategoriesNamesRepeatedSet=new Set(this.allCategoriesNamesRepeated)
        this.allCategoriesNames=[...this.allCategoriesNamesRepeatedSet];
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
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 1
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 3
  //     }
  //   },
  //   nav: true
  // }
serch(categoryName:string)
{
  let test =this.allProducts.filter(function(product){return product.category.name == categoryName})
  this.costomProsuct=test.splice(0,5)
  return this.costomProsuct
}


}


