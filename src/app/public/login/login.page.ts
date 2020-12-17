import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { UserOptions } from 'src/interfaces/user-options';
import { UserData } from 'src/providers/user-data';
import { WebApiProvider } from 'src/providers/web-api';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  durationYear: string;
  loading: any;
  loginHttp: any;
  loginData: UserOptions = { username: '', password: ''};
  submitted = false;

  constructor(
    public router: Router, 
    public userData: UserData, 
    public api: WebApiProvider
  ) {
    const currentYear = moment().format("YYYY");
    this.durationYear = currentYear === "2019" ? "2019" : "2019~" + currentYear;
  }

  ionViewDidEnter() {
    this.autoLogin();
  }

  async autoLogin() {
    const user = await this.api.checkToken();
    if (user) {
      this.userData.login(user);
      this.router.navigateByUrl('/' + user['role'] + '/home');
    }
  }

  async login(loginData) {
    const data = {
      username: loginData.username,
      password: loginData.password
    };
    let res = await this.api.httpPost("auth/login", data, false);

    if (res['success'] == true) {
      const user = await this.api.setToken(res['token']);
      this.userData.login(user);
      this.router.navigateByUrl('/' + user['role'] + '/home');
    }
  }

  async onSignIn(form: NgForm) {
    this.submitted = true;
    await this.login(form.value);
    this.submitted = false;
  }
}
