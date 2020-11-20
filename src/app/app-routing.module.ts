import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'US-covid-map',
  },
  {
    path: 'US-covid-map',
    loadChildren: () =>
      import('../app/us-map/us-map.module').then((m) => m.USMapModule),
  },
  {
    path: 'all-coutry-covid-map',
    loadChildren: () =>
      import('../app/all-countrys/all-countrys-routing.module').then((m) => m.AllCountrysRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
