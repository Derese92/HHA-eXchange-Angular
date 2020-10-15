import { Component, OnInit } from '@angular/core';
import { HhaService } from './hha.service';
import { PublicHealthMeasures } from './_models/datas';

@Component({
  selector: 'app-chart',
  template: `
    <plotly-plot
      [data]="chartData.data"
      [layout]="chartData.layout"
    ></plotly-plot>
  `,
  styles: [],
})
export class ChartComponent implements OnInit {
  public chartData;
  constructor(private myservice: HhaService) {}
  ngOnInit(): void {
    this.myservice.measureFilteredByState.subscribe(
      (measureData: PublicHealthMeasures) => {
        this.chartData = {
          data: [
            {
              x: [
                'At least One Measure',
                'Immunization measure',
                'Reportable Results',
                'Syndromic Measure',
                'Registry Measure',
              ],
              y: [
                measureData?.atleast_one_measure,
                measureData?.immunization_measure,
                measureData?.reportable_lab_results_measure,
                measureData?.syndromic_surveillance_measure,
                measureData?.registry_measure,
              ],
              type: 'bar',
            },
          ],
          layout: { width: 500, height: 400, title: 'Statistics' },
        };
      }
    );
  }
}
