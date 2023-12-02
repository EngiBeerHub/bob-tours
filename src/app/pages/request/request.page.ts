import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  tour: any = {};
  request: any = { Language: 'english' };
  isBusTrip = false;
  isSent = false;

  day_after_tomorrow: string = '';
  one_year_later: string = '';

  validationForm: FormGroup;
  validationMessages: any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    public formBuilder: FormBuilder
  ) {
    this.tour = navParams.data;

    this.calcDates();

    // prepare form validation
    this.validationForm = formBuilder.group({
      DesiredDateTime: new FormControl(this.day_after_tomorrow),
      Language: new FormControl('english'),
      NeedBus: new FormControl(false),
      FirstName: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern('[a-zA-z]*'),
          Validators.required,
        ])
      ),
      LastName: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern('[a-zA-z]*'),
          Validators.required,
        ])
      ),
      Email: new FormControl(
        '',
        Validators.compose([Validators.email, Validators.required])
      ),
    });

    // prepare validation messages
    this.validationMessages = {
      FirstName: [
        { type: 'required', message: 'First name is required.' },
        {
          type: 'minlength',
          message: 'First name must be at least 2 chars long.',
        },
        {
          type: 'maxlength',
          message: 'First name cannot be more than 30 chars long.',
        },
      ],
      LastName: [
        { type: 'required', message: 'Last name is required.' },
        {
          type: 'minlength',
          message: 'Last name must be at least 2 chars long.',
        },
        {
          type: 'maxlength',
          message: 'Last name cannot be more than 30 chars long.',
        },
      ],
      Email: [
        { type: 'required', message: 'Email is required.' },
        {
          type: 'email',
          message: 'Must be a valid email address.',
        },
      ],
    };
  }

  ngOnInit() {
    this.isSent = false;

    this.isBusTrip = this.tour.Tourtype == 'BU';
  }

  calcDates() {
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

  send(request: any) {
    this.request = request;
    console.log('Requested tour for', this.request.DesiredDateTime);

    console.log(
      'by',
      this.request.FirstName,
      this.request.LastName,
      this.request.Email
    );

    this.isSent = true;
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
