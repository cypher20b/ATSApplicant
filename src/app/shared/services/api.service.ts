import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResCountryResponse } from '../interfaces/res-country-response';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { JobApplicaionData } from '../interfaces/job-applicaion-data';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getAllCountryCodes() {
    return this.http.get<ResCountryResponse[]>(`${environment.areaCodeApi}/all?fields=name,idd,flags`);
  }

  applyToJob(data:JobApplicaionData): Observable<ResCountryResponse>{
    return this.http.post<ResCountryResponse>(`${environment.baseUrl1}/apply`, data)
  }
}
