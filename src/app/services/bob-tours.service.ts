import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class BobToursService {
  public regions: any;
  public tourtypes: any;
  public tours: any;

  baseUrl = 'https://bob-tours-app.firebaseio.com/';

  constructor(private http: HttpClient) {
    this.getRegions();
    this.getTourtypes();
    this.getTours();
  }

  getRegions() {
    let requestUrl = `${this.baseUrl}/Regions.json`;
    this.http.get(requestUrl).subscribe((data) => {
      this.regions = data;
    });
  }

  getTourtypes() {
    let requestUrl = `${this.baseUrl}/Tourtypes.json`;
    this.http.get(requestUrl).subscribe((data) => {
      this.tourtypes = _.sortBy(data, 'Name');
    });
  }

  getTours() {
    let requestUrl = `${this.baseUrl}/Tours.json`;
    this.http.get(requestUrl).subscribe((data) => {
      this.tours = _.sortBy(data, 'Title');
    });
  }
}
