import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BobToursService } from 'src/app/services/bob-tours.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  tours: any;
  selection: any;

  constructor(
    public btService: BobToursService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.selection = this.activatedRoute.snapshot.params;
    let category = this.selection.Category;
    let criteria = this.selection.Criteria;
    this.tours = _.filter(this.btService.tours, [category, criteria]);
  }

  search(event: any) {
    let searchText = event.detail.value;
    this.tours = _.filter(this.btService.tours, [
      this.selection.Category,
      this.selection.Criteria,
    ]);

    if (searchText != '') {
      this.tours = this.tours.filter((tour: any) => {
        return tour.Title.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      });
    }
  }
}
