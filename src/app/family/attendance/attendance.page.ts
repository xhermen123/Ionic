import { Component } from '@angular/core';
import { ConferenceData } from 'src/providers/conference-data';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

import { AttendanceDetailPage } from 'src/app/modals/attendance-detail/attendance-detail.page';
import { WebApiProvider } from 'src/providers/web-api';
import { UserData } from 'src/providers/user-data';

@Component({
  selector: 'app-family-attendance',
  templateUrl: 'attendance.page.html',
  styleUrls: ['attendance.page.scss'],
})
export class FamilyAttendancePage {
  currentDateTime: string = moment().format("MM/DD/YYYY HH:mm:ss");
  durationYear: string;
  attendanceList: any = [];
  startDate: string = moment().startOf('month').format();
  endDate: string = moment().format();
  nurseList: any = [{_id: "all"}];
  selectedNurse: string = "all";

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
      patient_id: this.userData.user.patient_id,
      startDate: this.startDate,
      endDate: this.endDate
    };
    let res = await this.api.httpPost('app-family/getAttendanceListByDateRange', data, true);

    if (res['success'] == true) {
      this.attendanceList = res['attendanceList'];
      // nurse list
      this.nurseList = [{_id: "all"}];
      this.attendanceList.forEach(attendance => {
        if (!this.nurseList.find(nurse => nurse._id === attendance.user_id._id)) {
          this.nurseList = [...this.nurseList, attendance.user_id];
        }
      });
      if (!this.nurseList.find(nurse => nurse._id === this.selectedNurse)) {
        this.selectedNurse = "all";
      }
    }
  }

  // actions  
  async onStartDate() {
    this.getAttendanceListByDateRange();
  }
  
  async onEndDate() {
    this.getAttendanceListByDateRange();
  }

  async goToAttendanceDetail(attendance) {
    const modal = await this.modalController.create({
      component: AttendanceDetailPage,
      componentProps: { attendance: attendance }
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    if (data !== "") {
      this.getAttendanceListByDateRange();
    }
  }
  
  // methods
  convertDateTime(datetime) {
    return datetime ? moment(datetime).format("MM/DD/YYYY LT") : "";
  }

  calcAttendanceDurationHours(datetime1, datetime2) {
    return moment(datetime2).diff(moment(datetime1), 'hours');
  }

  filteredAttendanceList() {
    if (this.selectedNurse === "all") {
      return this.attendanceList;
    } else {
      const filterBySelectedNurse = attendance => {
        return attendance.user_id._id === this.selectedNurse;
      };
      return this.attendanceList.filter(filterBySelectedNurse);
    }
  }

  calcSumHours() {
    let sum = 0;
    this.filteredAttendanceList().forEach(attendance => {
      if (attendance.status === "Pending" || attendance.status === "Approved") {
        sum += this.calcAttendanceDurationHours(attendance.clockin_time, attendance.clockout_time);
      }
    });
    return sum;
  }
}
