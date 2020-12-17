import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

import { WebApiProvider } from 'src/providers/web-api';
import { ScheduleDetailPage } from 'src/app/modals/schedule-detail/schedule-detail.page';
import { ConferenceData } from 'src/providers/conference-data';
import { UserData } from 'src/providers/user-data';

@Component({
  selector: 'app-family-schedule',
  templateUrl: 'schedule.page.html',
  styleUrls: ['schedule.page.scss'],
})
export class FamilySchedulePage {
  currentDateTime: string = moment().format("MM/DD/YYYY HH:mm:ss");
  durationYear: string;
  scheduleList: any;

  constructor(
    public conferenceData: ConferenceData, 
    public modalController: ModalController,
    public api: WebApiProvider, 
    public userData: UserData
  ) {
    conferenceData.getTimer().subscribe(val => {
      this.currentDateTime = moment().format("MM/DD/YYYY HH:mm:ss");
    });
    const currentYear = moment().format("YYYY");
    this.durationYear = currentYear === "2019" ? "2019" : "2019~" + currentYear;
  }

  ionViewDidEnter() {
    this.getScheduleList();
  }

  async getScheduleList() {
    let data = {
      patient_id: this.userData.user.patient_id
    };
    let res = await this.api.httpPost('app-family/getScheduleListForMonth', data, true);

    if (res['success'] == true) {
      const scheduleList = res['scheduleList'];
      
      // var today = moment();
      // const filterOneMonth = (schedule) => {
      //   var date = moment(schedule.date);
      //   const duration = date.diff(today, 'days');
      //   return (duration <= 30 && duration >= 0);
      // };

      this.scheduleList = scheduleList;
    }
  }

  async goToScheduleDetail(schedule) {
    const modal = await this.modalController.create({
      component: ScheduleDetailPage,
      componentProps: { schedule: schedule }
    });
    return await modal.present();
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
