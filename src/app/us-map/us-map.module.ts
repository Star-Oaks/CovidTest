import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { USMapRoutingModule } from './us-map-routing.module';
import { USMapComponent } from './us-map/us-map.component';


@NgModule({
  declarations: [USMapComponent],
  imports: [
    CommonModule,
    USMapRoutingModule
  ]
})
export class USMapModule { }
