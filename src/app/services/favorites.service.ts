import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private _storage: Storage | null = null;
  public favIDs: Array<number> = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    let storedIDs = await this.storage.get('FavoritesIDs');
    this.favIDs = JSON.parse(storedIDs) ?? [];
  }

  add(tourID: number) {
    this.favIDs.push(tourID);
    this._storage?.set('FavoritesIDs', JSON.stringify(this.favIDs));
  }

  remove(tourID: number) {
    let removeIndex: number = this.favIDs.indexOf(tourID);
    if (removeIndex != -1) {
      this.favIDs.splice(removeIndex, 1);
      this._storage?.set('FavoritesIDs', JSON.stringify(this.favIDs));
    }
  }
}
