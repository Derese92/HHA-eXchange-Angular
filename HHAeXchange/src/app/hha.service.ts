import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { PublicHealthMeasures } from './_models/datas';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class HhaService {
  private filteredHealthMeasure = [];
  public measureFilteredByState: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.measureFilteredByState = new BehaviorSubject<any>(null);
  }

  getData() {
    return this.http
      .get(
        'https://dashboard.healthit.gov/api/open-api.php?source=hospital-mu-public-health-measures.csv'
      )
      .pipe(
        map((results: any) => {
          const filteredMeasures = results.filter(
            (item: PublicHealthMeasures) => item.period == '2015'
          );
          this.filteredHealthMeasure = filteredMeasures;
          return filteredMeasures;
        })
      );
  }

  filterDataByState(state: string) {
    this.filteredHealthMeasure.filter((list: PublicHealthMeasures) => {
      if (list.region == state) {
        this.measureFilteredByState.next({ ...list });
      }
    });
  }

  // getStateData() {
  //   return this.measureFilteredByState;
  // }
}
