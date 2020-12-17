import { Component } from '@angular/core';
import * as moment from 'moment';

import { ConferenceData } from 'src/providers/conference-data';
import { WebApiProvider } from 'src/providers/web-api';
import { UserData } from 'src/providers/user-data';
import { AttendanceData } from 'src/providers/attendance-data';
import { ScheduleData } from 'src/providers/schedule-data';
import { DeviceHelpers } from 'src/providers/device-helpers';
import { ActivityData } from 'src/providers/activity-data';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { AddCommentModal } from 'src/app/modals/add-comment/add-comment.page';

interface ActivityType {
  id: string,
  name: string,
  status: boolean,
  comment: string,
  date: Date
};

interface ObservationType {
  id: string,
  name: string,
  status: boolean,
  comment: string,
  date: Date
};

@Component({
  selector: 'app-nurse-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class NurseHomePage {
  currentDateTime: string = moment().format("MM/DD/YYYY HH:mm:ss");
  durationYear: string;
  
  scheduleList: any = [];
  selectedScheduleId: string;
  schedule: any;
  patient: any;
  attendance: any;
  activityList: ActivityType[];
  observationList: ObservationType[];

  constructor(
    public conferenceData: ConferenceData, 
    public api: WebApiProvider,
    public userData: UserData,
    public attendanceData: AttendanceData,
    public scheduleData: ScheduleData,
    public deviceHelpers: DeviceHelpers,
    public activityData: ActivityData,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController
  ) {
    conferenceData.getTimer().subscribe(val => {
      this.currentDateTime = moment().format("MM/DD/YYYY HH:mm:ss");
    });
    const currentYear = moment().format("YYYY");
    this.durationYear = currentYear === "2019" ? "2019" : "2019~" + currentYear;
  }

  ionViewDidEnter() {
    this.getTodayList();
  }

  /*============================================================
  // api calls 
  =============================================================*/
  async getTodayList() {
    const data = {
      user_id: this.userData.user.id
    };
    let res = await this.api.httpPost('app-nurse/getListHomepage', data, true);

    if (res['success'] == true) {
      this.scheduleList = res['scheduleList'];
      this.attendance = res['attendance'];
      
      if (this.attendance) {
        this.selectedScheduleId = this.attendance.schedule_id;
      } else {
        await this.determineDefaultSchedule();
      }
    }
  }

  async getAttendanceByScheduleId(schedule_id) {
    const data = {
      schedule_id: schedule_id
    };
    let res = await this.api.httpPost('app-nurse/getAttendanceByScheduleId', data, true);

    if (res['success'] == true) {
      this.attendance = res['attendance'];
      if (this.attendance) {
        this.activityList = this.attendance.activityList ? this.attendance.activityList : {};
        this.observationList = this.attendance.observationList ? this.attendance.observationList : {};
      }
    }
  }

  async setClockIn() {
    if (this.attendance) {
      this.api.showAlert('You cannot clockin again');
      return;
    }
    const location = await this.deviceHelpers.getLocation();
    const deviceId = await this.deviceHelpers.getDeviceId();
    const distance = this.deviceHelpers.distance(location['lat'], location['long'], this.patient.latitude, this.patient.longitude, 'K')
    const data = {
      user_id: this.userData.user.id,
      patient_id: this.patient._id,
      schedule_id: this.selectedScheduleId,
      clockin_lat: location['lat'],
      clockin_long: location['long'],
      clockin_device_id: deviceId,
      clockin_distance_from_address: distance
    };

    let res = await this.api.httpPost('app-nurse/clockIn', data, true);

    if (res['success'] == true) {
      this.attendance = res['attendance'];
      this.activityList = this.attendance.activityList ? this.attendance.activityList : {};
      this.observationList = this.attendance.observationList ? this.attendance.observationList : {};
    }
  }

  async setClockOut() {
    if (!this.attendance) {
      this.api.showAlert('You need to clockin first');
      return;
    }
    const location = await this.deviceHelpers.getLocation();
    const deviceId = await this.deviceHelpers.getDeviceId();
    const distance = this.deviceHelpers.distance(location['lat'], location['long'], this.patient.latitude, this.patient.longitude, 'K')
    const data = {
      id: this.attendance._id,
      additionalComment: this.attendance.additionalComment,
      clockout_lat: location['lat'],
      clockout_long: location['long'],
      clockout_device_id: deviceId,
      clockout_distance_from_address: distance,
      activityList: this.activityList,
      observationList: this.observationList
    };

    let res = await this.api.httpPost('app-nurse/clockOut', data, true);

    if (res['success'] == true) {
      this.attendance = res['attendance'];
      this.activityList = this.attendance.activityList ? this.attendance.activityList : {};
      this.observationList = this.attendance.observationList ? this.attendance.observationList : {};
    }
  }

  async cancelClockIn() {
    if (!this.attendance) {
      this.api.showAlert('You need to clockin first');
      return;
    }
    const data = {
      id: this.attendance._id,
    };

    let res = await this.api.httpPost('app-nurse/cancelClockIn', data, true);
    
    if (res['success'] == true) {
      this.attendance = null;
    }
  }

  // async cancelClockOut() {
  //   if (!this.attendance) {
  //     this.api.showAlert('You need to clockin first');
  //     return;
  //   }
  //   const data = {
  //     id: this.attendance._id,
  //   };

  //   let res = await this.api.httpPost('app-nurse/cancelClockOut', data, true);
    
  //   if (res['success'] == true) {
  //     this.attendance = res['attendance'];
  //   }
  // }
  
  /*============================================================
  // actions
  =============================================================*/
  async onChangePatient() {
    if (this.selectedScheduleId) {
      this.schedule = this.getScheduleById(this.selectedScheduleId);
      this.patient = this.schedule.patient_id;
      this.getAttendanceByScheduleId(this.selectedScheduleId);
    }
  }

  async onClockIn() {
    var ret = await this.api.showConfirm("Do you really want to clock-in?");
    if (ret) {
      await this.setClockIn();
    }
  }

  async onClockOut() {
    var ret = await this.api.showConfirm("Do you really want to clock-out?");
    if (ret) {
      this.setClockOut();
    }
  }

  async onCancelClockIn() {
    var ret = await this.api.showConfirm("Are you sure you want to cancel clock-in time?");
    if (ret) {
      this.cancelClockIn();
    }
  }

  // async onCancelClockOut() {
  //   this.api.showConfirm("Are you sure you want to cancel clock-out time?", () => {
  //     this.cancelClockOut();
  //   });
  // }

  async onActivityToggled(event, item) {
    if (event.detail.checked) {
      // const text = await this.api.presentAlertPrompt("Activity result", null, "Please input activity comment", null);
      // if (text != null) {
        // this.activityList[id] = text;
        const modal = await this.modalController.create({
          component: AddCommentModal,
          componentProps: { message: item.comment },
          cssClass: 'add-comment-modal'
        });
  
        modal.onDidDismiss()
          .then( async (data) => {
            // const { data } = await modal.onDidDismiss();
            console.log(data);
            if (data.role == 'ok') {
              const req = {
                id: item._id,
                user_id: this.userData.user.id,
                patient_id: this.patient._id,
                schedule_id: this.selectedScheduleId,
                name: item.name,
                comment: data.data,
                status: true
              };
          
              let res = await this.api.httpPost('app-nurse/set-activity', req, true);
      
              if (res['success'] == true) {
                var index = this.activityList.indexOf(item);
                this.activityList[index] = res['activity'];
              }
            } else {
              var index = this.activityList.indexOf(item);
              this.activityList[index].status = false;
            }
          })
          .catch( (err) => console.log(err.message));
  
        return await modal.present();
        
      // }
    } else {
      const data = {
        id: item._id,
        user_id: this.userData.user.id,
        patient_id: this.patient._id,
        schedule_id: this.selectedScheduleId,
        name: item.name,
        comment: item.comment,
        status: false
      };
  
      let res = await this.api.httpPost('app-nurse/set-activity', data, true);

      if (res['success'] == true) {
        var index = this.activityList.indexOf(item);
        this.activityList[index] = res['activity'];
      }
    }
    // delete this.activityList[id];
  }

  async onAdditionalComment() {
    const modal = await this.modalController.create({
      component: AddCommentModal,
      componentProps: { message: '' },
      cssClass: 'add-comment-modal'
    });

    modal.onDidDismiss()
      .then( async (data) => {
        // const { data } = await modal.onDidDismiss();
        console.log(data);
        if (data.role == 'ok') {
          const req = {
            user_id: this.userData.user.id,
            patient_id: this.patient._id,
            schedule_id: this.selectedScheduleId,
            comment: data.data
          };
    
          let res = await this.api.httpPost('app-nurse/set-additonal-comment', req, true);
    
          if (res['success'] == true) {
            this.attendance.additionalComment.push(res['additional_comment']);
          }
        }
      })
      .catch( (err) => console.log(err.message));

    return await modal.present();
    // const text = await this.api.presentAlertPrompt("Additional comment", null, "Please input additional comment", '');
    
  }

  async onObservationToggled(event, item) {
    if (event.detail.checked) {
      // const text = await this.api.presentAlertPrompt("Observation result", item.comment, "Please input observation comment", null);
      const modal = await this.modalController.create({
        component: AddCommentModal,
        componentProps: { message: item.comment },
        cssClass: 'add-comment-modal'
      });

      modal.onDidDismiss()
        .then( async (data) => {
          // const { data } = await modal.onDidDismiss();
          console.log(data);
          if (data.role == 'ok') {
            const req = {
              id: item._id,
              user_id: this.userData.user.id,
              patient_id: this.patient._id,
              schedule_id: this.selectedScheduleId,
              name: item.name,
              comment: data.data,
              status: true
            };
        
            let res = await this.api.httpPost('app-nurse/set-observation', req, true);
    
            if (res['success'] == true) {
              var index = this.observationList.indexOf(item);
              this.observationList[index] = res['observation'];
            }
          } else {
            var index = this.observationList.indexOf(item);
            this.observationList[index].status = false;
          }
        })
        .catch( (err) => console.log(err.message));

      return await modal.present();
      
      // return await modal.present();
    } else {
      const data = {
        id: item._id,
        user_id: this.userData.user.id,
        patient_id: this.patient._id,
        schedule_id: this.selectedScheduleId,
        name: item.name,
        comment: item.comment,
        status: false
      };
  
      let res = await this.api.httpPost('app-nurse/set-observation', data, true);

      if (res['success'] == true) {
        var index = this.observationList.indexOf(item);
        this.observationList[index] = res['observation'];
      }
    }
  }

  /*============================================================
  // methods
  =============================================================*/
  async determineDefaultSchedule() {
    const location = await this.deviceHelpers.getLocation();
    const filterByDistance = s => {
      const patient = s.patient_id;
      const distance = this.deviceHelpers.distance(location['lat'], location['long'], patient.latitude, patient.longitude, 'K');
      return distance <= 0.5;
    };
    const sortByDistance = (s1, s2) => {
      const patient1 = s1.patient_id;
      const distance1 = this.deviceHelpers.distance(location['lat'], location['long'], patient1.latitude, patient1.longitude, 'K');
      const patient2 = s2.patient_id;
      const distance2 = this.deviceHelpers.distance(location['lat'], location['long'], patient2.latitude, patient2.longitude, 'K');
      return distance1 < distance2;
    };

    if (this.scheduleList ? !this.scheduleList.length : true) {
      return; 
    } else if (this.scheduleList.length === 1) {
      this.selectedScheduleId = this.scheduleList[0]._id;
      return;
    }

    const availableScheduleList = this.scheduleList.filter(filterByDistance);
    if (availableScheduleList ? !availableScheduleList.length : true) {
      // this.api.showAlert('Select Patient');
      return;
    } else if (availableScheduleList.length == 1) {
      this.selectedScheduleId = availableScheduleList[0]._id;
      return;
    }

    const sortedScheduleList = availableScheduleList.sort(sortByDistance);
    this.selectedScheduleId = sortedScheduleList[0]._id;
  }

  getScheduleById(schedule_id) {
    let schedule = null;
    this.scheduleList.forEach(s => {
      if (s._id === schedule_id) {
        schedule = s;
      }
    });
    return schedule;
  }

  getScheduleByPatientId(patient_id) {
    let schedule = null;
    this.scheduleList.forEach(s => {
      if (s.patient_id._id === patient_id) {
        schedule = s;
      }
    });
    return schedule;
  }

  convertDate(date) {
    return moment(date).format("MM/DD/YYYY");
  }
  
  convertDateTime(datetime) {
    return datetime ? moment(datetime).format("MM/DD/YYYY LT") : "";
  }

  async openShowComment(message) {
    const text = await this.api.showComment(message);
  }

  async presentActionSheet(ev, item) {
    const type = await this.api.showAdditionalCommentActionSheet();
    console.log(item);
   
    switch(type) {
      case 0:
        break;
      case 1:
        const modal = await this.modalController.create({
          component: AddCommentModal,
          componentProps: { message: item.comment },
          cssClass: 'add-comment-modal'
        });
    
        modal.onDidDismiss()
          .then( async (data) => {
            // const { data } = await modal.onDidDismiss();
            console.log(data);
            if (data.role == 'ok') {
              const req1 = {
                id: item._id,
                user_id: item.user_id,
                patient_id: item.patient_id,
                schedule_id: item.schedule_id,
                comment: data.data
              };
      
              let res1 = await this.api.httpPost('app-nurse/edit-additional-comment', req1, true);
          
              if (res1['success'] == true) {
                var index = this.attendance.additionalComment.indexOf(item);
                this.attendance.additionalComment[index] = res1['additional_comment'];
              }
            }
          })
          .catch( (err) => console.log(err.message));
    
        return await modal.present();
      case 2:
        const confirm = await this.api.showConfirm("Are you sure?");

        if(confirm) {
          const req2 = {
            id: item._id,
            user_id: item.user_id,
            patient_id: item.patient_id,
            schedule_id: item.schedule_id,
            comment: item.comment
          };
  
          let res2 = await this.api.httpPost('app-nurse/delete-additional-comment', req2, true);
      
          if (res2['success'] == true) {
            var index = this.attendance.additionalComment.indexOf(item);
            this.attendance.additionalComment.splice(index, 1);
          }
        }
        
        break;
      default:
        break;
    }
  }
}
