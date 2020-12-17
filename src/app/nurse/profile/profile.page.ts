import { Component } from '@angular/core';
import * as moment from 'moment';
import { NgForm, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController  } from '@ionic/angular';

import { ConferenceData } from 'src/providers/conference-data';
import { NurseProfileOptions } from 'src/interfaces/nurse-profile-options';
import { ChangePasswordPage } from 'src/app/modals/change-password/change-password.page';
import { WebApiProvider } from 'src/providers/web-api';
import { UserData } from 'src/providers/user-data';

@Component({
  selector: 'app-nurse-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class NurseProfilePage {

  profile: NurseProfileOptions = { first_name: '', last_name: '', email1: '', email2: '', phone1: '', phone2: '' };
  currentDateTime: string = moment().format("MM/DD/YYYY HH:mm:ss");
  durationYear: string;
  profileForm;
  user: any;

  constructor(
    public conferenceData: ConferenceData, 
    public modalController: ModalController, 
    public formBuilder: FormBuilder,
    public api: WebApiProvider,
    public userData: UserData
  ) {
    conferenceData.getTimer().subscribe(val => {
      this.currentDateTime = moment().format("MM/DD/YYYY HH:mm:ss");
    });
    const currentYear = moment().format("YYYY");
    this.durationYear = currentYear === "2019" ? "2019" : "2019~" + currentYear;
    
    this.profileForm = this.formBuilder.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email1: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      email2: new FormControl('', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')),
      phone1: Validators.required,
      phone2: ''
    });
  }

  ionViewDidEnter() {
    this.getUserById();
  }
  
  async getUserById() {
    const data = {
      id: this.userData.user.id
    };
    let res = await this.api.httpPost('user/getUserById', data, true);

    if (res['success'] == true) {
      this.user = res['user'];
      console.log(this.user)
      this.profile = <NurseProfileOptions> {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email1: this.user.email1, 
        email2: this.user.email2, 
        phone1: this.user.phone1, 
        phone2: this.user.phone2
      };
    }
  }

  async updateUser(data) {
    let res = await this.api.httpPost('user/updateUser', {...data, id: this.userData.user.id}, true);

    if (res['success'] == true) {
      this.api.showAlert('Success');
    }
  }

  async save(form: NgForm) {
    if (form.valid) {
      this.updateUser(form.value);
    }
  }

  async changePasswordPop(ev: any) {
    const modal = await this.modalController.create({
      component: ChangePasswordPage
    });
    return await modal.present();
  }
}
