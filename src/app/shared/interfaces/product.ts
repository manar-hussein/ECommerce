import { Brand } from './brand';
import { Category } from "./category";

export interface Product {
    id:string,
    name:string,
    category:Category,
    description:string,
    quantity:number,
    price:number,
    imageCover:string,
    images:string[],
    ratingsAverage:number,
    brand:Brand,
    title:string,
    favoutite?:boolean
}


