import { Component } from '@angular/core';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';

import { ConferenceData } from 'src/providers/conference-data';
import { AttendanceDetailPage } from 'src/app/modals/attendance-detail/attendance-detail.page';
import { WebApiProvider } from 'src/providers/web-api';
import { UserData } from 'src/providers/user-data';

@Component({
  selector: 'app-nurse-attendance',
  templateUrl: 'attendance.page.html',
  styleUrls: ['attendance.page.scss'],
})
export class NurseAttendancePage {
  currentDateTime: string = moment().format("MM/DD/YYYY HH:mm:ss");
  durationYear: string;
  attendanceList: any = [];
  startDate: string = moment().startOf('month').format();
  endDate: string = moment().format();

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
    this.getAttendanceListByDateRange();
  }

  // call api
  async getAttendanceListByDateRange() {
    let data = {
      user_id: this.userData.user.id,
      startDate: this.startDate,
      endDate: this.endDate
    };
    let res = await this.api.httpPost('app-nurse/getAttendanceListByDateRange', data, true);

    if (res['success'] == true) {
      this.attendanceList = res['attendanceList'];
    }
  }

  // actions  
  async onStartDate() {
    // let startDate = moment(this.startDate);
    // let endDate = moment(this.endDate);
    // if (endDate.diff(startDate, 'days') >= 0) {
    //   this.getAttendanceListByDateRange();
    // } else {
    //   this.startDate = this.endDate;
    // }
    this.getAttendanceListByDateRange();
  }
  
  async onEndDate() {
    // let startDate = moment(this.startDate);
    // let endDate = moment(this.endDate);
    // let today = moment().startOf('day');
    // if (today.diff(endDate, 'days') < 0) {
    //   this.endDate = today.format();
    // } else if (endDate.diff(startDate, 'days') >= 0) {
    //   this.getAttendanceListByDateRange();
    // } else {
    //   this.endDate = this.startDate;
    // }
    this.getAttendanceListByDateRange();
  }

  async goToAttendanceDetail(attendance) {
    const modal = await this.modalController.create({
      component: AttendanceDetailPage,
      componentProps: { attendance: attendance },
      cssClass: 'attendance-detail'
    });
    return await modal.present();
  }

  // methods
  convertDateTime(datetime) {
    return datetime ? moment(datetime).format("MM/DD/YYYY LT") : "";
  }

  calcAttendanceDurationHours(datetime1, datetime2) {
    return moment(datetime2).diff(moment(datetime1), 'hours');
  }

  calcSumHours() {
    let sum = 0;
    this.attendanceList.forEach(attendance => {
      if (attendance.status === "Pending" || attendance.status === "Approved") {
        sum += this.calcAttendanceDurationHours(attendance.clockin_time, attendance.clockout_time);
      }
    });
    return sum;
  }
}
