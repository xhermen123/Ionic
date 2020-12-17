import { Component } from '@angular/core';
import { FamilyProfileOptions } from 'src/interfaces/family-profile-options';
import * as moment from 'moment';
import { ConferenceData } from 'src/providers/conference-data';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';

import { ChangePasswordPage } from 'src/app/modals/change-password/change-password.page';
import { WebApiProvider } from 'src/providers/web-api';
import { UserData } from 'src/providers/user-data';

@Component({
  selector: 'app-family-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class FamilyProfilePage {
  
  profile: FamilyProfileOptions = { 
    relationship_with_patient: '',
    first_name: '', 
    last_name: '', 
    email1: '', 
    email2: '', 
    phone1: '', 
    phone2: '' 
  };
  currentDateTime: string = moment().format("MM/DD/YYYY HH:mm:ss");
  durationYear: string;
  profileForm;
  user: any;
  family: any;

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
      relationship_with_patient: new FormControl('', Validators.required),
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
    this.getFamilyById();
  }
  
  async getFamilyById() {
    let res1 = await this.api.httpPost('user/getUserById', {id: this.userData.user.id}, true);
    let res2 = await this.api.httpPost('family/getFamilyByUserId', {user_id: this.userData.user.id}, true);

    if (res1['success'] == true && res2['success'] == true) {
      this.user = res1['user'];
      this.family = res2['family'];
      this.profile = <FamilyProfileOptions> {
        relationship_with_patient: this.family.relationship_with_patient,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email1: this.user.email1, 
        email2: this.user.email2, 
        phone1: this.user.phone1, 
        phone2: this.user.phone2
      };
    }
  }

  async updateFamily(user, family) {
    let res1 = await this.api.httpPost('user/updateUser', user, true);
    let res2 = await this.api.httpPost('family/updateFamily', family, true);

    if (res1['success'] == true && res2['success'] == true) {
      this.api.showAlert('Success');
    }
  }

  async save(form: NgForm) {
    if (form.valid) {
      let user = {
        id: this.userData.user.id, 
        first_name: form.value.first_name,
        last_name: form.value.last_name,
        email1: form.value.email1, 
        email2: form.value.email2, 
        phone1: form.value.phone1, 
        phone2: form.value.phone2
      };
      let family = {
        id: this.family,
        relationship_with_patient: form.value.relationship_with_patient,
      }
      this.updateFamily(user, family);
    }
  }

  async changePasswordPop(ev: any) {
    const modal = await this.modalController.create({
      component: ChangePasswordPage
    });
    return await modal.present();
  }
}
