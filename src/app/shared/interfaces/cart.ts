import { CartProducts } from "./cart-products";
import { Product } from "./product";

export interface Cart {
    _id:string,
    cartOwner:string,
    products:CartProducts[],
    numOfCartItems:number,
    totalCartPrice:number

}
