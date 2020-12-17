import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import * as moment from 'moment';

import { ConferenceData } from 'src/providers/conference-data';
import { WebApiProvider } from 'src/providers/web-api';
import { UserData } from 'src/providers/user-data';

@Component({
  selector: 'app-add-comment',
  templateUrl: 'add-comment.page.html',
  styleUrls: ['add-comment.page.scss'],
})
export class AddCommentModal {
  comment = '';

  constructor(
    public modalCtrl: ModalController,
    navParams: NavParams,
  ) {
    this.comment = navParams.data.message;
  }

  ionViewDidEnter() {
  }

  // actions
  cancel() {
    this.modalCtrl.dismiss('', 'cancel');
  }

  ok() {
    this.modalCtrl.dismiss(this.comment, 'ok');
  }

}
