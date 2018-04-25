import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter'
})
export class CustomSearchPipe implements PipeTransform {
  transform(data: any[], filters: string[], fields: string[]){
      if (data && data.length){
          return data.filter(item =>{
              for(let filter of filters){
                  if(filter && item){
                    return data;
                  }
              }
              /*
              if (nameFilter && item.name.toLowerCase().indexOf(nameFilter.toLowerCase()) === -1){
                  return false;
              }
              if (addressFilter && item.address.toLowerCase().indexOf(addressFilter.toLowerCase()) === -1){
                  return false;
              }
              return true;
              */
         })
      }
      else{
          return data;
      }
  }
}