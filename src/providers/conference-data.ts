import { Injectable } from '@angular/core';
import { interval  } from 'rxjs';


@Injectable()
export class ConferenceData {

  constructor() { }

  getTimer() {
    return interval(1000);
  }
}
