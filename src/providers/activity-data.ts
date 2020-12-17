import { Injectable } from '@angular/core';

@Injectable()
export class ActivityData {

  public activityHeaders: any = [{
        id: 1,
        value: 'Complete /Partial Bath'
    }, {
        id: 2,
        value: 'Dress /Undress'
    }, {
        id: 3,
        value: 'Assist with Toileting'
    }, {
        id: 4,
        value: 'Transferring'
    }, {
        id: 5,
        value: 'Personal Grooming'
    }, {
        id: 6,
        value: 'Assist with Eating /Feeding'
    }, {
        id: 7,
        value: 'Ambulation'
    }, {
        id: 8,
        value: 'Turn /Change Position'
    }, {
        id: 9,
        value: 'Vital Signs'
    }, {
        id: 10,
        value: 'Assist with Self-Admin Medication'
    }, {
        id: 11,
        value: 'Bowel /Bladder'
    }, {
        id: 12,
        value: 'Wound Care'
    }, {
        id: 13,
        value: 'ROM'
    }, {
        id: 14,
        value: 'Supervision'
    }, {
        id: 15,
        value: 'Prepare Breakfast'
    }, {
        id: 16,
        value: 'Prepare Lunch'
    }, {
        id: 17,
        value: 'Prepare Dinner'
    }, {
        id: 18,
        value: 'Clean Kitchen /Wash Dishes'
    }, {
        id: 19,
        value: 'Make /Change Bed Linen'
    }, {
        id: 20,
        value: 'Clean Areas Used by Individual'
    }, {
        id: 21,
        value: 'Listing Supplies /Shopping'
    }, {
        id: 22,
        value: 'Individual’s Laundry'
    }, {
        id: 23,
        value: 'Medical Appointments'
    }, {
        id: 24,
        value: 'Work /School /Social'
    }, {
        id: 25,
        value: 'Other'
    }
  ];
  public observationHeaders: any = [{
        id: 1, 
        value: '1. Did you observe any change in the individual’s physical condition?'
    }, {
        id: 2,
        value: '2. Did you observe any change in the individual’s emotional condition?'
    }, {
        id: 3,
        value: '3. Was there any change in the individual’s regular daily activities?'
    }, {
        id: 4,
        value: '4. Do you have an observation about the individual’s response to services rendered?'
    }
  ];

  constructor(
  ) {}
}