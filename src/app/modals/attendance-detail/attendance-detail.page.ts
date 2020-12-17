import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import * as moment from 'moment';

import { ConferenceData } from 'src/providers/conference-data';
import { WebApiProvider } from 'src/providers/web-api';
import { UserData } from 'src/providers/user-data';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: 'attendance-detail.page.html',
  styleUrls: ['attendance-detail.page.scss'],
})
export class AttendanceDetailPage {
  durationYear: string;
  attendance: any;
  showApprove: boolean;
  note: string = "";
  noteRequired: boolean = false;

  constructor(
    public conferenceData: ConferenceData, 
    public modalCtrl: ModalController,
    navParams: NavParams,
    public api: WebApiProvider, 
    public userData: UserData
  ) {
    const currentYear = moment().format("YYYY");
    this.durationYear = currentYear === "2019" ? "2019" : "2019~" + currentYear;

    this.attendance = navParams.data.attendance;
    this.showApprove = this.userData.user.role === 'family' && this.attendance.status === 'Pending';
  }

  ionViewDidEnter() {
  }

  // call api
  async approve() {
    const data = {
      id: this.attendance._id,
      note: this.note
    }
    let res = await this.api.httpPost('app-family/approve', data, true);

    if (res['success'] == true) {
      // this.api.showAlert('Success');
      this.attendance.status = 'Approved';
      this.showApprove = false;
      this.modalCtrl.dismiss('Approved');
    }
  }

  async disapprove() {
    const data = {
      id: this.attendance._id,
      note: this.note
    }
    let res = await this.api.httpPost('app-family/disapprove', data, true);

    if (res['success'] == true) {
      // this.api.showAlert('Success');
      this.attendance.status = 'Disapproved';
      this.showApprove = false;
      this.modalCtrl.dismiss('Disapproved');
    }
  }

  // actions
  closeModal() {
    this.modalCtrl.dismiss('');
  }

  onApprove() {
    this.approve();
  }

  async onDisapprove() {
    if (this.note === "") {
      this.noteRequired = true;
      return;
    }
    var ret = await this.api.showConfirm("Are you sure you want to disapprove?");
    if (ret) {
      this.disapprove();
    }
  }
  
  onChangeComment() {
    this.noteRequired = false;
  }

  // method
  convertDateTime(datetime) {
    return datetime ? moment(datetime).format("MM/DD/YYYY LT") : "";
  }

  calcAttendanceDurationHours(datetime1, datetime2) {
    return moment(datetime2).diff(moment(datetime1), 'hours');
  }
}
