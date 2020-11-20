import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CovidAllResolver } from '../core/services/covid.service';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryComponent } from './country/country.component';

const routes: Routes = [
  {
    path:"",
    component:CountryListComponent,
    resolve: {
      covidData: CovidAllResolver
    }
  },
  {
    path:":id",
    component:CountryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllCountrysRoutingModule { }
