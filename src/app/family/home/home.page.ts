import { Component } from '@angular/core';
import { ConferenceData } from 'src/providers/conference-data';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

import { AttendanceDetailPage } from 'src/app/modals/attendance-detail/attendance-detail.page';
import { WebApiProvider } from 'src/providers/web-api';
import { UserData } from 'src/providers/user-data';

@Component({
  selector: 'app-family-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class FamilyHomePage {
  currentDateTime: string = moment().format("MM/DD/YYYY HH:mm:ss");
  durationYear: string;
  attendanceList: any;

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
    this.getAttendanceListForHomepage();
  }

  async getAttendanceListForHomepage() {
    let data = {
      patient_id: this.userData.user.patient_id
    };
    let res = await this.api.httpPost('app-family/getAttendanceListForHomepage', data, true);

    if (res['success'] == true) {
      const attendanceList = res['attendanceList'];

      // var today = moment();
      // const filterAttendance = attendance => {
      //   var date = moment(attendance.date);
      //   const duration = today.diff(date, 'days');
      //   if (attendance.status === "Pending") {
      //     return true;
      //   } else if (attendance.status === "Approved") {
      //     return (duration <= 7 && duration >= 0);
      //   } else if (attendance.status === "Disapproved") {
      //     return (duration <= 7 && duration >= 0);
      //   } else if (attendance.status === "Not completed") {
      //     return true;
      //   }
      // };

      // this.attendanceList = attendanceList.filter(filterAttendance);
      this.attendanceList = attendanceList;
      console.log(this.attendanceList)
    }
  }

  async goToAttendanceDetail(attendance) {
    const modal = await this.modalController.create({
      component: AttendanceDetailPage,
      componentProps: { attendance: attendance }
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    if (data !== "") {
      this.getAttendanceListForHomepage();
    }
  }

  convertDateTime(datetime) {
    return datetime ? moment(datetime).format("MM/DD/YYYY LT") : "";
  }

  calcAttendanceDurationHours(datetime1, datetime2) {
    return moment(datetime2).diff(moment(datetime1), 'hours');
  }
}
