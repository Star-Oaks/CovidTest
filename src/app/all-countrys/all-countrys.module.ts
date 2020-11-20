import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCountrysRoutingModule } from './all-countrys-routing.module';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryComponent } from './country/country.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CountryListComponent, CountryComponent],
  imports: [
    CommonModule, 
    AllCountrysRoutingModule,
    Ng2SearchPipeModule,
    FormsModule

  ],
})
export class AllCountrysModule {}
