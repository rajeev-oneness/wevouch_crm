import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticket'
})
export class TicketPipe implements PipeTransform {

  transform(value: any[], inputVal: any, inputDate: any, inputMonth: any): unknown {
    console.log({inputVal, inputDate, inputMonth, value});
    
    const dataArr: any[] = [];
    value.map( (e: any) => e.newCreatedAt = e.createdAt.split("T")[0] )

    if (inputVal === undefined && inputDate === undefined && inputMonth === undefined) {
      return value;
    } 
    
    if(inputVal !== undefined) {
      console.log(inputVal, value);
      value.forEach(element => {
        console.log(element, "elementelement");
        
        inputVal = inputVal.toLowerCase();
        if (element?.ticket?.uniqueId.toLowerCase().search(inputVal) != -1 || element?.ticket?.users?.name.toLowerCase().search(inputVal) != -1 || element?.ticket?.products?.name.toLowerCase().search(inputVal) != -1 || element?.ticket?.brand.toLowerCase().search(inputVal) != -1 || element?.ticket?.category.toLowerCase().search(inputVal) != -1 || element?.ticket?.status.toLowerCase().search(inputVal) != -1) {
          dataArr.push(element);
          console.log(element, inputVal);
        }
      });
      return dataArr;
    }

    if(inputDate !== undefined) {
      value.forEach(element => {
        if (element?.createdAt.search(inputDate) != -1) {
          dataArr.push(element);
          console.log(element, inputDate);
        }
      });
      return dataArr;
    }

    if(inputMonth !== undefined) {
      value.forEach(element => {
        if (element?.createdAt.search(inputMonth) != -1) {
          dataArr.push(element);
          console.log(element, inputMonth);
        }
      });
      return dataArr;
    }
    
  }

}
