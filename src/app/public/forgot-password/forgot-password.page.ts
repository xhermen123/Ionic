import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: 'forgot-password.page.html',
  styleUrls: ['forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  durationYear: string;

  constructor() {
    const currentYear = moment().format("YYYY");
    this.durationYear = currentYear === "2019" ? "2019" : "2019~" + currentYear;
  }
}
