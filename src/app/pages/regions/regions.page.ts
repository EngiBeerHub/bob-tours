import {Component, OnInit} from '@angular/core';
import {BobToursService} from 'src/app/services/bob-tours.service';

// interface Region {
//   ID: number;
//   Name: string;
//   Count: number;
// }

@Component({
  selector: 'app-regions',
  templateUrl: './regions.page.html',
  styleUrls: ['./regions.page.scss'],
})
export class RegionsPage implements OnInit {
  constructor(public btService: BobToursService) {
  }

  ngOnInit() {
    // this.btService.regions.forEach((region: Region) => {
    //   const tours = _.filter(this.btService.tours, ['Region', region.ID]);
    //   region.Count = tours.length;
    // });
  }
}
