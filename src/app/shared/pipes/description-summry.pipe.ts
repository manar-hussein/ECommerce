import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionSummry'
  
})
export class DescriptionSummryPipe implements PipeTransform {

  transform(value: string, numberOfCharcter:number): string {
     if(value.split(" ").length>numberOfCharcter){
       return value.split(" ").splice(0,numberOfCharcter).join(" ")+' ...';
     }else{
       return value.split(" ").splice(0,numberOfCharcter).join(" ");
     }
     
  }

}
