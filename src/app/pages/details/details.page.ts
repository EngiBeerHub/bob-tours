import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetController, AlertController, AnimationController, ModalController,} from '@ionic/angular';
import * as _ from 'lodash';
import {BobToursService} from 'src/app/services/bob-tours.service';
import {FavoritesService} from 'src/app/services/favorites.service';
import {RequestPage} from '../request/request.page';
import {MapPage} from '../map/map.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  tour: any;
  isFavorite: boolean = false;
  region: string = '';
  tourtype: string = '';
  fadeOutOptionButton = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    public btService: BobToursService,
    public favService: FavoritesService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController
  ) {
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tour = _.find(this.btService.tours, ['ID', parseInt(id!)]);
    this.isFavorite = this.favService.favIDs.indexOf(parseInt(id!)) != -1;
    this.region = _.find(this.btService.regions, {ID: this.tour.Region}).Name;
    this.tourtype = _.find(this.btService.tourtypes, {
      ID: this.tour.Tourtype,
    }).Name;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Tour',
      buttons: [
        {
          text: 'Request',
          handler: () => {
            this.presentModal();
            // window.location.href = '/request';
          },
        },
        {
          text: 'Map/Route',
          handler: () => {
            this.presentMap();
          },
        },
        {
          text: this.isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
          role: this.isFavorite ? 'destructive' : '',
          handler: () => {
            if (this.isFavorite) {
              this.presentAlert();
              // this.favService.remove(this.tour.ID);
              // this.isFavorite = false;
            } else {
              this.favService.add(this.tour.ID);
              this.isFavorite = true;
            }
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Remove Favorite?',
      message: 'Do you really want to remove this Favorite?',
      buttons: [
        {text: 'No'},
        {
          text: 'Yes',
          handler: () => {
            this.favService.remove(this.tour.ID);
            this.isFavorite = false;
          },
        },
      ],
    });
    await alert.present();
  }

  openSocial(app: string) {
    console.log('User wants to share this tour via ' + app + '!');
  }

  async presentModal() {
    const modal = this.modalCtrl.create({
      component: RequestPage,
      componentProps: this.tour,
    });
    (await modal).present();
  }

  async presentMap() {
    const modal = await this.modalCtrl.create({
      component: MapPage,
      componentProps: this.tour,
    });
    modal.present();
  }

// user clicked share button
  animateOptionButton() {
    const OptionButton = document.getElementById('OptionButton');
    if (OptionButton !== null) {
      const fadeOut = this.animationCtrl.create()
        .addElement(OptionButton)
        .duration(1000)
        .fromTo('opacity', 1, 0);
      const fadeIn = this.animationCtrl.create()
        .addElement(OptionButton)
        .duration(1000)
        .fromTo('opacity', 0, 1);
      if (this.fadeOutOptionButton) {
        fadeOut.play();
      } else {
        fadeIn.play();

      }
      this.fadeOutOptionButton = !this.fadeOutOptionButton;
    }
  }
}
