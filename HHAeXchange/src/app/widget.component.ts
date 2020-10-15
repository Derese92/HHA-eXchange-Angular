import { Component, OnInit } from '@angular/core';
import { HhaService } from './hha.service';
import { PublicHealthMeasures } from './_models/datas';

@Component({
  selector: 'app-widget',
  template: `
    <div>
      <h3 >{{stateMeasureData?.region}} Statistics</h3>
      <mat-list>
        <mat-list-item>
          At least One Measure
          {{ stateMeasureData?.atleast_one_measure }}</mat-list-item
        >
        <mat-list-item>
          Immunization measure {{ stateMeasureData?.immunization_measure }}
        </mat-list-item>
        <mat-list-item>
          Reportable Results
          {{ stateMeasureData?.reportable_lab_results_measure }}
        </mat-list-item>
        <mat-list-item>
          Syndromic Measure
          {{ stateMeasureData?.syndromic_surveillance_measure }}
        </mat-list-item>
        <mat-list-item>
          Registry Measure
          {{ stateMeasureData?.registry_measure }}</mat-list-item
        >
      </mat-list>
    </div>
  `,
  styles: ['h3 {font-weight: bold}','mat-list-item {font-weight: bold}'],
})
export class WidgetComponent implements OnInit {
  public stateMeasureData: PublicHealthMeasures = null;
  constructor(private myservice: HhaService) {}

  ngOnInit(): void {
    this.myservice.measureFilteredByState.subscribe((data) => {
      this.stateMeasureData = data;
      console.log(data);
    });
  }
  ngOnChanges(): void {}
}
