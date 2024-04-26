import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { JobDetailsData } from '../../../shared/interfaces/JobData';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent {
 constructor(@Inject(MAT_DIALOG_DATA) public data: JobDetailsData){}
}
