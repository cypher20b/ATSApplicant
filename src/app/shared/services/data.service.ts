import { Injectable } from '@angular/core';
import { JobDetailsData } from '../interfaces/JobData';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedJob!:JobDetailsData
  constructor() { }
}
