import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_usaLow from '@amcharts/amcharts4-geodata/usaLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ActivatedRoute } from '@angular/router';
import { State } from 'src/app/core/models/state.model';

@Component({
  selector: 'app-us-map',
  templateUrl: './us-map.component.html',
  styleUrls: ['./us-map.component.scss'],
})
export class USMapComponent implements OnInit {
  private chart: am4maps.MapChart | undefined;
  private backgroundColor = am4core.color('#1e2128');
  private confirmedColor = am4core.color('#d21a1a');
  public usaCovidData: Array<State> = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone,
    private routerSnapshot: ActivatedRoute
  ) {
    this.usaCovidData = this.routerSnapshot.snapshot.data.covidData;
  }

  ngOnInit(): void {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create('chartdiv', am4maps.MapChart);
      // Set map definition
      chart.geodata = am4geodata_usaLow;

      // Set projection
      chart.projection = new am4maps.projections.AlbersUsa();

      // Create map polygon series
      let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

      //Set min/max fill color for each area
      polygonSeries.heatRules.push({
        property: 'fill',
        target: polygonSeries.mapPolygons.template,
        min: am4core.color(this.backgroundColor),
        max: am4core.color(this.confirmedColor),
        logarithmic: true,
      });

      // Make map load polygon data (state shapes and names) from GeoJSON
      polygonSeries.useGeodata = true;

      // Set heatmap values for each state

      polygonSeries.data = this.usaCovidData;

      // Set up heat legend
      let heatLegend = chart.createChild(am4maps.HeatLegend);
      heatLegend.series = polygonSeries;
      heatLegend.align = 'right';
      heatLegend.valign = 'bottom';
      heatLegend.height = am4core.percent(80);
      heatLegend.orientation = 'vertical';
      heatLegend.valign = 'middle';
      heatLegend.marginRight = am4core.percent(4);
      heatLegend.valueAxis.renderer.opposite = true;
      heatLegend.valueAxis.renderer.dx = -25;
      heatLegend.valueAxis.strictMinMax = false;
      heatLegend.valueAxis.fontSize = 9;
      heatLegend.valueAxis.logarithmic = true;

      // Configure series tooltip
      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = `[bold]State {name}[/]
        ----
        Confirmed: {value}
        Active: {active}
        Deaths: {deaths}
        Recovered: {recovered}`;
      polygonTemplate.nonScalingStroke = true;
      polygonTemplate.strokeWidth = 0.5;

      // Create hover state and set alternative fill color
      let hs = polygonTemplate.states.create('hover');
      hs.properties.fill = am4core.color('#3c5bdc');

      // heat legend behavior
      polygonSeries.mapPolygons.template.events.on('over', function (event) {
        handleHover(event.target);
      });

      polygonSeries.mapPolygons.template.events.on('hit', function (event) {
        handleHover(event.target);
      });

      function handleHover(column: any) {
        if (!isNaN(column.dataItem.value)) {
          heatLegend.valueAxis.showTooltipAt(column.dataItem.value);
        } else {
          heatLegend.valueAxis.hideTooltip();
        }
      }

      polygonSeries.mapPolygons.template.events.on('out', function (event) {
        heatLegend.valueAxis.hideTooltip();
      });
    });
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
