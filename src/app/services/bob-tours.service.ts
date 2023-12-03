import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as _ from 'lodash';

interface Category {
  ID: number;
  Name: string;
  Count: number;
}

@Injectable({
  providedIn: 'root',
})
export class BobToursService {
  public regions: any;
  public tourtypes: any;
  public tours: any;
  public all_tours: any;
  public hits: number = 24;
  public price: any = {lower: 80, upper: 400};

  public gotAllTours: boolean = false;

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
      this.all_tours = _.sortBy(data, 'Title');
      this.gotAllTours = true;
    });
  }

  filterToursByPrice() {
    // tours
    this.tours = _.filter(this.all_tours, (tour) => {
      return tour.PriceG >= this.price.lower && tour.PriceG <= this.price.upper;
    });
    // regions
    this.regions.forEach((region: Category) => {
      const tours = _.filter(this.tours, ['Region', region.ID]);
      region.Count = tours.length;
    });
    // tourtypes
    this.tourtypes.forEach((tourtype: Category) => {
      const tours = _.filter(this.tours, ['Tourtype', tourtype.ID]);
      tourtype.Count = tours.length;
    });
    this.hits = this.tours.length;
  }
}
