import { Injectable } from '@angular/core';

import { Events } from '@ionic/angular';

@Injectable()
export class UserData {

  user: any;
  profile: any;

  constructor(
    public events: Events
  ) {}

  setProfile(profile: object): void {
    this.profile = profile;
  }

  login(user: object): void {
    this.user = user;
    this.events.publish('user:login');
  };

  logout(): void {
    this.user = null;
    this.events.publish('user:logout');
  };
}