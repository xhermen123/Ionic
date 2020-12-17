import { Component } from '@angular/core';
import * as moment from 'moment';
import { ModalController, NavParams } from '@ionic/angular';

import { ConferenceData } from 'src/providers/conference-data';
import { UserData } from 'src/providers/user-data';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: 'schedule-detail.page.html',
  styleUrls: ['schedule-detail.page.scss'],
})
export class ScheduleDetailPage {
  durationYear: string;
  schedule: any;

  constructor(
    public conferenceData: ConferenceData, 
    public modalCtrl: ModalController,
    navParams: NavParams, 
    public userData: UserData
  ) {
    const currentYear = moment().format("YYYY");
    this.durationYear = currentYear === "2019" ? "2019" : "2019~" + currentYear;

    this.schedule = navParams.data.schedule;
  }

  ionViewDidEnter() {
  }
  
  closeModal() {
    this.modalCtrl.dismiss();
  }
  
  convertDate(date) {
    return moment(date).format("MM/DD/YYYY");
  }

  calcDurationHours(time1, time2) {
    const datetime1 = moment(moment().format("MM/DD/YYYY") + " " + time1);
    const datetime2 = moment(moment().format("MM/DD/YYYY") + " " + time2);
    return datetime2.diff(datetime1, 'hours');
  }
}
