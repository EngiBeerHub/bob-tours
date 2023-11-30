import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  tour: any = {};
  request: any = {};
  day_after_tomorrow: string = '';
  one_year_later: string = '';

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {
    this.tour = navParams.data;
  }

  ngOnInit() {
    let today = new Date();
    let day_after_tomorrow = new Date(
      today.getTime() + 1000 * 60 * 60 * 24 * 2
    );
    this.day_after_tomorrow =
      day_after_tomorrow.toISOString().slice(0, 10) + 'T09:00';

    this.request.DesiredDateTime = this.day_after_tomorrow;

    let one_year_later = new Date(
      day_after_tomorrow.getTime() + 1000 * 60 * 60 * 24 * 365
    );
    this.one_year_later = one_year_later.toISOString().slice(0, 10) + 'T17:00';
  }

  send() {
    console.log('Requested tour for', this.request.DesiredDateTime);

    console.log(
      'by',
      this.request.FirstName,
      this.request.LastName,
      this.request.Email
    );
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
