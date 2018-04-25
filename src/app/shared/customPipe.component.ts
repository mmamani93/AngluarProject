import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customFilter'
})
export class CustomSearchPipe implements PipeTransform {
    transform(data: any[], filters: any[]) {
        if (data && data.length) {
            return data.filter(item => {
                for (let filter of filters) {
                    if (filter && item) 
                        if (item[filter.name] && item[filter.name].toLowerCase().indexOf(filter.value.toLowerCase()) == -1)
                            return false;
                    return true;
                }
            })
        }
        else {
            return data;
        }
    }
}