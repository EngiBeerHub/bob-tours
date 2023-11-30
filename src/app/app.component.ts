import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BobToursService } from './services/bob-tours.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  settings: any = {};
  private _storage: Storage | null = null;

  public appPages = [
    { title: 'Favorites', url: '/favorites', icon: 'star' },
    { title: 'Regions', url: '/regions', icon: 'images' },
    { title: 'Tour-Types', url: '/tour-types', icon: 'bus' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private storage: Storage, public btService: BobToursService) {
    this.loadSettings();
  }

  async loadSettings() {
    this._storage = await this.storage.create();
    this._storage.get('Settings').then((settings) => {
      if (settings == null) {
        this.settings.style = 'summer-style';
      } else {
        this.settings = settings;
      }
    });
  }

  updateSettings() {
    this._storage?.set('settings', this.settings);
    console.log(this.settings.notifications);
  }
}
