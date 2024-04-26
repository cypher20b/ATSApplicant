import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResCountryResponse } from '../../shared/interfaces/res-country-response';
import { ApiService } from '../../shared/services/api.service';
import { CountryCallingCode } from '../../shared/interfaces/country-calling-code';
import { FormsModule } from '@angular/forms';
import { CountryCodeFilterPipe } from '../../shared/pipes/country-code-filter.pipe';
import { JobExperience } from '../../shared/interfaces/job-experience';
import { EducationalBackground } from '../../shared/interfaces/educational-background';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-application-page',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    CountryCodeFilterPipe,
    RouterModule,
    MatProgressBarModule,
    MatToolbarModule
  ],
  templateUrl: './application-page.component.html',
  styleUrl: './application-page.component.scss'
})
export class ApplicationPageComponent implements OnInit {

    @Input('label') label!: string;
    @Input('allowedExtensions') allowedExtensions: string[] = ['.pdf'];
    @Input('allowMultipleFiles') allowMultipleFiles: boolean = false;
    @Output('onFilesDropped') onFilesDropped: EventEmitter<FileList> = new EventEmitter<FileList>();
    experienceList:JobExperience[]=[];
    educationList:EducationalBackground[]=[];
    allowedList!: string;
    incorrectInput: boolean = false;
    errorMessage: string = '';
    files!: File[];
    countriesWithCallingCode:CountryCallingCode[]=[];
    selectedCountry:CountryCallingCode = {areaCode:'+1',countryName:'',flag:''};
    countryCodeSearchString:string ='';
    constructor(private apiService:ApiService, public dataService:DataService) { }
    
    
    ngOnInit() {
        this.allowedList = this.allowedExtensions.length > 0 ?
            this.allowedExtensions.join(', ') : 'any';


        this.apiService.getAllCountryCodes().subscribe((response)=>{
          response.forEach(element => {
            this.countriesWithCallingCode.push({
              flag:element?.flags?.png,
              areaCode:element?.idd?.root + (element?.idd?.suffixes.length > 1 ? "" : element?.idd?.suffixes[0]),
              countryName:element?.name?.common
            })
          });
          this.countriesWithCallingCode=this.countriesWithCallingCode.sort((a:any, b:any) => a.countryName - b.countryName);
        })
    }
    onFiledrop(e: any) {
        e.preventDefault();
        e.stopPropagation();
        this.handleDrop(e.dataTransfer.files);
    }
    onFileSelected(e: any) {
        this.handleDrop(e.target.files);
    }
    handleDrop(files: FileList) {
        this.errorMessage = '';
        this.incorrectInput = false;
        this.files = [];
        this.incorrectInput = !this.allowMultipleFiles && files.length > 1;
        if(this.incorrectInput) {
            this.incorrectInput = true;
            this.errorMessage = 'Only one file can be uploaded';
            return;
        }
        
        this.incorrectInput = !this.validateExtensions(files);
        if(this.incorrectInput) {
            this.errorMessage = 'Incorrect file type. please make sure your file is in .pdf format';
            return;
        }
        
        this.files = Array.from(files);
        this.onFilesDropped.emit(files);
    }
    validateExtensions(files: FileList): boolean {
        if(this.allowedExtensions.length === 0) {
          console.log(this.allowedExtensions)
            return true;
        }
        let extensions: string[] = [];
        const extensionPattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi;
        // const extensionPattern = /.pdf/gmi;
        
        Array.from(files).map((x:any) => 
            x.name.toLowerCase().match(extensionPattern)
                .map((ext:any) => extensions.push(ext)));
            const forbidden = extensions.filter((x) => !this.allowedExtensions.includes(x));
            const valid = forbidden.length === 0;
            console.log(valid, forbidden)
            return valid;
    }
    addExperience(){
      this.experienceList.push({
        jobTitle:'',
        company:'',
        officeLocation:'',
        jobDescription:'',
        from:'',
        to:'',
        currentlyWorksHere:false
      })
    }

    addEducation(){
      this.educationList.push({
        institutionName:'',
        major:'',
        degree:'',
        schoolLocation:'',
        description:'',
        from:'',
        to:'',
        currentlySchoolHere:false
      })
    }

    applyToJob(){
      
    }

}