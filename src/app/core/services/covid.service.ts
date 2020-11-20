import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { USAStates } from '../consts/state';
import { CountriesToView } from '../models/country-to-view.model';
import { Coutnry } from '../models/coutry.model';
import { CurrentCountry } from '../models/current-country.model';
import { State } from '../models/state.model';

@Injectable({
  providedIn: 'root',
})
export class CovidService {
  constructor(private http: HttpClient) {}
  public getUSACovid(): Observable<Array<State>> {
    return this.http
      .get<Array<Coutnry>>('report/country/name', {
        // API broken, only works until 2020-06-01
        // So I pasted this hard code
        // The rest of the API is either paid or not very limited
        params: { date: '2020-06-01', name: 'USA', format: 'json' },
      })
      .pipe(
        map((res) => {
          let states: Array<State> = [];
          res[0].provinces.forEach((element: any) => {
            let item = USAStates.find(
              (a2) => element.province === a2.name
            ) as State;
            if (item) {
              item.value = element.confirmed;
              item.active = element.active;
              item.deaths = element.deaths;
              item.recovered = element.recovered;
              states.push(item);
            }
          });
          return states;
        })
      );
  }

  public getAllCountrys(): Observable<Array<CountriesToView>> {
    return this.http.get<Array<CountriesToView>>('help/countries');
  }
  public getOneCountry(code: string): Observable<CurrentCountry> {
    return this.http
      .get<Array<CurrentCountry>>('country/code', { params: { code: code } })
      .pipe(
        map((res) => {
          return res[0];
        })
      );
  }
}
@Injectable({
  providedIn: 'root',
})
export class CovidResolver implements Resolve<Array<State>> {
  constructor(private service: CovidService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Array<State>> {
    return this.service.getUSACovid();
  }
}
@Injectable({
  providedIn: 'root',
})
export class CovidAllResolver implements Resolve<Array<CountriesToView>> {
  constructor(private service: CovidService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Array<CountriesToView>> {
    return this.service.getAllCountrys();
  }
}
