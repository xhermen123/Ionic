import { Component, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import * as moment from 'moment';

import { ConferenceData } from 'src/providers/conference-data';
import { WebApiProvider } from 'src/providers/web-api';
import { UserData } from 'src/providers/user-data';
import { ActivityData } from 'src/providers/activity-data';
import { SignaturePage } from 'src/app/modals/signature/signature.page';



@Component({
  selector: 'app-nurse-activity',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss'],
})
export class NurseActivityPage {
  @ViewChild('slides') slides: IonSlides;
  currentDateTime: string = moment().format("MM/DD/YYYY HH:mm:ss");
  durationYear: string;
  patientList: any;
  selectedPatientId: any;
  date: string = moment().format();
  week: string = "";
  sunday: any;
  monday: any;
  slideOpts: any;

  currentActivity: any;
  activityListForWeek: any = [];
  observationList: any = [];
  additionalCommentList: any = [];
  signatureImage : any;
  signStatus: any = {};

  dayList = [
    'Monday',
    'Tuesday',
    'Wendsday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  constructor(
    public conferenceData: ConferenceData, 
    public modalController: ModalController,
    public api: WebApiProvider,
    public userData: UserData,
    public activityData: ActivityData
  ) {
    conferenceData.getTimer().subscribe(val => {
      this.currentDateTime = moment().format("MM/DD/YYYY HH:mm:ss");
    });
    const currentYear = moment().format("YYYY");
    this.durationYear = currentYear === "2019" ? "2019" : "2019~" + currentYear;

    var currentSlide = moment().day() - 1;

    if(currentSlide < 0) currentSlide = 6;

    this.slideOpts = {
      initialSlide: currentSlide
    };
  }

  ionViewDidEnter() {
    this.setWeekString();
    this.getPatientList();
  }

  // call api
  async getPatientList() {
    let data = {
      user_id: this.userData.user.id
    };
    let res = await this.api.httpPost('app-nurse/getPatientList', data, true);

    if (res['success'] == true) {
      this.patientList = res['patientList'];
      if (this.patientList.length === 1) {
        this.selectedPatientId = this.patientList[0]._id;
      }
    }
  }

  async getActivityListForWeek() {
    let data = {
      user_id: this.userData.user.id,
      patient_id: this.selectedPatientId,
      end_date: this.sunday,
      start_date: this.monday
    }
    let res = await this.api.httpPost('app-nurse/getActivityForWeek', data, true);

    if (res['success'] == true) {
      const attendanceList = res['attendanceList'];
      
      this.currentActivity = attendanceList;
      if(attendanceList) {
        this.activityListForWeek = attendanceList.activity;
        this.observationList = attendanceList.observation;
        this.additionalCommentList = attendanceList.additionalComment;
        this.signStatus = attendanceList.sign_status;
      }
      
    }
  }
  
  // actions
  async onChangeDate() {
    const week = this.week;
    this.setWeekString();
    if (week !== this.week) {
      this.getActivityListForWeek();
    }
  }

  async onChangePatient() {
    if (this.selectedPatientId) {
      await this.getActivityListForWeek();
    }
  }

  async onActivitySlideChange() {
    var index = await this.slides.getActiveIndex();
    if(moment(this.date).day() == 0) {
      this.date = moment(this.date).day(index + 1 - 7).format();
    } else {
      this.date = moment(this.date).day(index + 1).format();
    }
  }

  async openSignatureModel() {
    const modal = await this.modalController.create({
      component: SignaturePage,
      componentProps: { signatureImage: this.signatureImage }
    });
    await modal.present();
    
    const {data} = await modal.onDidDismiss();
    if (data !== "") {
      this.signatureImage = data.signatureImage;
    }
  }
  
  // method
  calcDurationHours(time1, time2) {
    const datetime1 = moment(moment().format("MM/DD/YYYY") + " " + time1);
    const datetime2 = moment(moment().format("MM/DD/YYYY") + " " + time2);
    return datetime2.diff(datetime1, 'hours');
  }

  setWeekString() {
    var day = moment(this.date).day();
    if(day != 0) {
      this.monday = moment(this.date).day(1);
      this.sunday = moment(this.date).day(7);
    } else {
      this.monday = moment(this.date).day(-6);
      this.sunday = moment(this.date).day(0);
    }
    
    this.week = this.monday.format("MM/DD/YYYY") + "~" + this.sunday.format("MM/DD/YYYY");
    this.monday = this.monday.format('YYYY-MM-DD');
    this.sunday = this.sunday.format('YYYY-MM-DD');
  }

  async next() {

    this.slides.slideNext();
    var index = await this.slides.getActiveIndex();
    if(moment(this.date).day() == 0) {
      this.date = moment(this.date).day(index + 1 - 7).format();
    } else {
      this.date = moment(this.date).day(index + 1).format();
    }
    console.log(this.date);
  }

  async prev() {
    this.slides.slidePrev();
    var index = await this.slides.getActiveIndex();
    if(moment(this.date).day() == 0) {
      this.date = moment(this.date).day(index + 1 - 7).format();
    } else {
      this.date = moment(this.date).day(index + 1).format();
    }
    console.log(this.date);
  }
  
  async openShowComment(message) {
    const text = await this.api.showComment(message);
  }
}
