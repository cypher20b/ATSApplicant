import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobsOnMapComponent } from './jobs-on-map/jobs-on-map.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'/jobs-on-map', component:JobsOnMapComponent}
];
