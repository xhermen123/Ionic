import { Injectable } from '@angular/core';

import { Events } from '@ionic/angular';

@Injectable()
export class AttendanceData {

  attendanceList: any;

  constructor(
    public events: Events
  ) {}

  setList(attendanceList: any): void {
    this.attendanceList = attendanceList;
  }
}