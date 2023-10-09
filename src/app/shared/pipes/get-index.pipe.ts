import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getIndex'
})
export class GetIndexPipe implements PipeTransform {

  transform(items:any[] , item:any): any {
    return items.indexOf(item);
  }

}
