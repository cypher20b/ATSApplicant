import { Pipe, PipeTransform } from '@angular/core';
import { CountryCallingCode } from '../interfaces/country-calling-code';

@Pipe({
  name: 'countryCodeFilter',
  standalone: true
})
export class CountryCodeFilterPipe implements PipeTransform {

  transform(value: CountryCallingCode[], searchTerm:string) {
    if(searchTerm.length < 1) return value;
    const returnVal = value.filter(x=>x.countryName.toLowerCase().includes(searchTerm))
    return returnVal;
  }

}
