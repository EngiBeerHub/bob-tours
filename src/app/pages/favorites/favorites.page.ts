import { Component, OnInit } from '@angular/core';
import { BobToursService } from 'src/app/services/bob-tours.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  // tours = [
  //   { ID: 1, Title: 'City walk' },
  //   { ID: 2, Title: 'On the trails of Beethoven' },
  //   { ID: 1, Title: 'City walk' },
  // ];

  constructor(
    public btService: BobToursService,
    public favService: FavoritesService
  ) {}

  ngOnInit() {}
}
