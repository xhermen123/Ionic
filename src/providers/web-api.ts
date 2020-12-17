import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as jwt_decode from 'jwt-decode';
import { DeviceHelpers } from 'src/providers/device-helpers';
import { UserData } from 'src/providers/user-data';

/*
  Generated class for the WebApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebApiProvider {

  // host: string = "http://localhost:8765/api/";
  // host: string = "http://app.vahomehealth.us:8765/api/";
  host: string = "https://i.carewell.us:443/api/";
  // host: string = "http://mv.accureanalytics.com:8765/api/";
  // host: string = "http://sistemasamedida.eawebagency.com/app/NewServer/public/api/";
  url: string;
  loading: any;
  token: string;

  constructor(
    public http: HttpClient, 
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController,
    public actionSheetController: ActionSheetController,
    public storage: Storage,
    private deviceHelpers: DeviceHelpers,
    public userData: UserData
  ) {
    console.log('Hello WebApiProvider Provider');
  }

  async makeLoading(text) {
    let loading = await this.loadingCtrl.create({
      spinner: 'circles',
      message: text + ' ...'
    });

    return loading;
  }

  async showNetworkErrorAlert() {
    let modal = await this.alertCtrl.create({
      header: 'Alert',
      message: 'Network Connection Error',
      buttons: ['OK']
    });
    await modal.present();
  }

  async showErrorAlert(errors) {
    let message = Object.values(errors).join('\n');
    let modal = await this.alertCtrl.create({
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });
    await modal.present();
  }

  async showAlert(message) {
    let modal = await this.alertCtrl.create({
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });
    await modal.present();
  }

  async showConfirm(message) {
    return new Promise (async resolve => {
      let modal = await this.alertCtrl.create({
        header: 'Confirm',
        message: message,
        buttons: [
          {text: 'NO', handler: () => {resolve(false)}},
          {text: 'YES', handler: () => {resolve(true)}}
        ]
      });
      await modal.present();
    })
  }

  async presentAlertPrompt(header, message, placeholder, value) {
    return new Promise (async resolve => {
      const alert = await this.alertCtrl.create({
        header: header,
        message: message,
        inputs: [
          {
            name: 'text',
            type: 'text',
            placeholder: placeholder,
            value: value
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(null);
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              resolve(data.text);
            }
          }
        ]
      });

      await alert.present();
    })
  }

  async setToken(token) {
    return new Promise(resolve => {
      this.storage.set('token', token).then(() => {
        this.token = token;
        const user = jwt_decode(token);
        resolve(user);
      });
    });
  }

  async checkToken() {
    return new Promise(resolve => {
      this.storage.get('token').then((token) => {
        if (token) {
          this.token = token;
          const user = jwt_decode(token);
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }

  async removeToken() {
    return new Promise(resolve => {
      this.storage.remove('token').then(() => {
        resolve(true);
      })
    })
  }

  async httpPost(url, data, hasAuth) {
    // if ()
    // this.applyAcions();
    console.log('Called api: ', url, data);
    this.loading = await this.makeLoading('Please wait');
    this.loading.present();
    const location = await this.deviceHelpers.getLocation();
    const deviceId = await this.deviceHelpers.getDeviceId();
    const logData = {user: this.userData.user, location: location, deviceId: deviceId};
    return new Promise(resolve => {
      (hasAuth ? 
        this.http.post(this.host + url, {fields: data, logData: logData}, {headers: {'token': this.token}}) : 
        this.http.post(this.host + url, {fields: data, logData: logData})
      ).subscribe(res => {
        this.loading.dismiss();
        if (res['success']) {
          console.log('Success:', url, res);
          resolve(res);
        } else {
          this.showErrorAlert(res['errors']);
          console.log('Failed:', url, res);
          resolve(res);
        }
      }, err => {
        this.loading.dismiss();
        this.showNetworkErrorAlert();
        console.log('Network error:', url, err);
        resolve(err);
      });
    })
  }

  async showComment(message) {
    return new Promise (async resolve => {
      let modal = await this.alertCtrl.create({
        header: 'Comment',
        message: message,
        buttons: [
          {text: 'OK', handler: () => {resolve(false)}}
        ]
      });
      await modal.present();
    })
  }

  // async httpGet(url, hasAuth) {
  //   console.log('Called api: ', url);

  //   this.loading = await this.makeLoading('Please wait');
  //   this.loading.present();
  //   return new Promise(resolve => {
  //     (hasAuth ? this.http.get(this.host + url, {headers: {'token': this.token}}) : this.http.get(this.host + url))
  //     .subscribe(res => {
  //       this.loading.dismiss();
  //       if (res['success']) {
  //         resolve(res);
  //       } else {
  //         this.showErrorAlert(res['errors']);
  //         console.log('Failed: ', url, res);
  //         resolve(res);
  //       }
  //     }, err => {
  //       this.loading.dismiss();
  //       this.showNetworkErrorAlert();
  //       console.log('Network error: ', url, err);
  //       resolve(err);
  //     });
  //   })
  // }

  async showAdditionalCommentActionSheet () {
    return new Promise (async resolve => {
      let actionSheet = await this.actionSheetController.create({
        header: 'Additional Comment',
        buttons: [{
          text: 'Edit',
          icon: 'create',
          handler: () => {
            resolve(1);
          }
        }, {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            resolve(2);
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            resolve(0);
          }
        }]
      });
      await actionSheet.present();
    });
  }
}
