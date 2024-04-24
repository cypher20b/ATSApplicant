import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResCountryResponse } from '../interfaces/res-country-response';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getAllCountryCodes() {
    return this.http.get<ResCountryResponse[]>('https://restcountries.com/v3.1/all?fields=name,idd,flags');
  }
}
