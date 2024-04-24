import { Component } from '@angular/core';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatSliderModule} from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { JobDetailsComponent } from '../components/shared/job-details/job-details.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRippleModule} from '@angular/material/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule, MatDatepickerModule, FormsModule, MatRippleModule,
    ReactiveFormsModule, JsonPipe, MatButtonModule,MatSidenavModule,MatToolbarModule,
    MatListModule,MatIconModule,HttpClientModule, MatSliderModule, FormsModule, CommonModule,MatCheckboxModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  jobRoles =["Frontend", "Backend", "Full-stack"]
  jobTypes =["Full-Time", "Part-Time", "Contract"]
  jobLocation =["Remote", "Office", "Hybrid"]
  experienceLevels =["Entry-level", "Middle-level", "Senior-level","Managerial-level"]
  requiredJobSkills = ["Angular", "Html5", "CSS", "SaSS"]
  jobs = [
    {favorite:false}
  ]
  maxSalary = 300;
  minSalary = 40;
  searchString = '';
  gridView =true;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  showMobileFilterContainer = false;
  showDesktopFilterContainer = false;
 constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, http: HttpClient, public dialog: MatDialog){
  // iconRegistry.addSvgIcon('bookmark', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/bookmark_ico.svg'))
 }
 
 toggleFilterContainer(){
  this.showMobileFilterContainer = !this.showMobileFilterContainer
  console.log(this.showMobileFilterContainer)
 }
 
 saveToFavorite(index:number){}

 openJobDetails() {
  const dialogRef = this.dialog.open(JobDetailsComponent);
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
}
