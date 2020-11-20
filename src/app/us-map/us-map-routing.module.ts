import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CovidResolver } from '../core/services/covid.service';
import { USMapComponent } from './us-map/us-map.component';

const routes: Routes = [
  {
    path: '',
    component: USMapComponent,
    resolve: {
      covidData: CovidResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class USMapRoutingModule {}
