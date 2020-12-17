
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

import { ChangePasswordProvider } from 'src/providers/change-password-validation';
import { WebApiProvider } from 'src/providers/web-api';
import { UserData } from 'src/providers/user-data';

@Component({
  selector: 'change-password',
  templateUrl: 'change-password.page.html',
  styleUrls: ['change-password.page.scss'],
})
export class ChangePasswordPage {
  durationYear: string;
  changePasswordForm;

  constructor(
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public api: WebApiProvider,
    public userData: UserData
  ) {
    const currentYear = moment().format("YYYY");
    this.durationYear = currentYear === "2019" ? "2019" : "2019~" + currentYear;

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.required
      ])),
      newPassword: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.required
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.required
      ])),
    }, {
      validator: ChangePasswordProvider.MatchPassword // Inject the provider method
    });
  }

  ionViewDidEnter() {
  }
  
  async updatePassword(data) {
    let res = await this.api.httpPost('user/updatePassword', {...data, id: this.userData.user.id}, true);

    if (res['success'] == true) {
      this.api.showAlert('Success');
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async save(form: NgForm) {
    if (form.valid) {
      this.updatePassword(form.value);
    }
  }
}
