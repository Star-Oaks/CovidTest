import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesToView } from 'src/app/core/models/country-to-view.model';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})

export class CountryListComponent implements OnInit {
  public term: string = '';
  public countrys: Array<CountriesToView>;
 
  constructor(private routerSnapshot: ActivatedRoute) {
    this.countrys = this.routerSnapshot.snapshot.data.covidData;
  }
  
  ngOnInit(): void {}
}
