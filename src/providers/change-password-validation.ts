import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ChangePasswordProvider {

    constructor() {
        console.log('Hello ErrorHandlerProvider Provider')
    }

    // Validation for password and confirm password
    static MatchPassword(AC: AbstractControl) {
       const newPassword = AC.get('newPassword').value // to get value in input tag
       const confirmPassword = AC.get('confirmPassword').value // to get value in input tag
        if(newPassword != confirmPassword) {
            console.log('false');
            AC.get('confirmPassword').setErrors( { MatchPassword: true } )
        } else {
            console.log('true')
            AC.get('confirmPassword').setErrors(null);
        }
    }
}