import { Injectable } from '@angular/core';

import { Events } from '@ionic/angular';

@Injectable()
export class ScheduleData {

  scheduleList: any;

  constructor(
    public events: Events
  ) {}

  setList(scheduleList: any): void {
    this.scheduleList = scheduleList;
  }
}