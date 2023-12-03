import {Component, OnInit} from '@angular/core';
import {BobToursService} from 'src/app/services/bob-tours.service';

// interface TourType {
//   ID: number;
//   Name: string;
//   Count: number;
// }

@Component({
  selector: 'app-tour-types',
  templateUrl: './tour-types.page.html',
  styleUrls: ['./tour-types.page.scss'],
})
export class TourTypesPage implements OnInit {
  constructor(public btService: BobToursService) {
  }

  ngOnInit() {
    // this.btService.tourtypes.forEach((tourtype: TourType) => {
    //   const tours = _.filter(this.btService.tours, ['Tourtype', tourtype.ID]);
    //   tourtype.Count = tours.length;
    // });
  }
}
