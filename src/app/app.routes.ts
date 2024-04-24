import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobsOnMapComponent } from './jobs-on-map/jobs-on-map.component';
import { ApplicationPageComponent } from './components/application-page/application-page.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'apply', component:ApplicationPageComponent},
    // {path:'/jobs-on-map', component:JobsOnMapComponent}
];
