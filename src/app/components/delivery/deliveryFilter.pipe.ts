import { Delivery } from '../../structures/delivery'
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deliveryFilter'
})
export class DeliverynSearchPipe implements PipeTransform {
  transform(deliveries: Delivery[], nameFilter: string, addressFilter: string){
      if (deliveries && deliveries.length){
          return deliveries.filter(item =>{
              if (nameFilter && item.name.toLowerCase().indexOf(nameFilter.toLowerCase()) === -1){
                  return false;
              }
              if (addressFilter && item.address.toLowerCase().indexOf(addressFilter.toLowerCase()) === -1){
                  return false;
              }
              return true;
         })
      }
      else{
          return deliveries;
      }
  }
}