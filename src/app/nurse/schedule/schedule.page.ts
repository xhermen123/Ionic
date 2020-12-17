import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

import { ConferenceData } from 'src/providers/conference-data';
import { ScheduleDetailPage } from 'src/app/modals/schedule-detail/schedule-detail.page';
import { WebApiProvider } from 'src/providers/web-api';
import { UserData } from 'src/providers/user-data';

@Component({
  selector: 'app-nurse-schedule',
  templateUrl: 'schedule.page.html',
  styleUrls: ['schedule.page.scss'],
})
export class NurseSchedulePage {
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

  // call api
  async getScheduleList() {
    let data = {
      user_id: this.userData.user.id
    };
    let res = await this.api.httpPost('app-nurse/getScheduleListForMonth', data, true);

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
  
  // actions
  async goToScheduleDetail(schedule) {
    const modal = await this.modalController.create({
      component: ScheduleDetailPage,
      componentProps: { schedule: schedule }
    });
    return await modal.present();
  }
  
  // method
  convertDate(date) {
    return moment(date).format("MM/DD/YYYY");
  }

  calcDurationHours(time1, time2) {
    const datetime1 = moment(moment().format("MM/DD/YYYY") + " " + time1);
    const datetime2 = moment(moment().format("MM/DD/YYYY") + " " + time2);
    return datetime2.diff(datetime1, 'hours');
  }
}
