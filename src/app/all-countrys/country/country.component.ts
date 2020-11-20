import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { CovidService } from 'src/app/core/services/covid.service';
import { ActivatedRoute } from '@angular/router';
import { CurrentCountry } from 'src/app/core/models/current-country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})

export class CountryComponent implements OnInit {

  private chart: am4charts.XYChart | undefined;
  public country: CurrentCountry | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone,
    private _covidService: CovidService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._covidService.getOneCountry(this.router.snapshot.params.id)
      .subscribe((res) => {
        this.country = res;
        this.browserOnly(() => {
          am4core.useTheme(am4themes_animated);
          let chart = am4core.create('chartdiv', am4charts.PieChart);
          if (this.country) {
            chart.data = [
              {
                type: 'Recovered',
                litres: this.country.recovered,
              },
              {
                type: 'Deaths',
                litres: this.country.deaths,
              },
              {
                type: 'Critical',
                litres: this.country.critical,
              },
            ];
          }
          // Create series
          let series = chart.series.push(new am4charts.PieSeries());
          series.dataFields.value = 'litres';
          series.dataFields.category = 'type';
        });
      });
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
