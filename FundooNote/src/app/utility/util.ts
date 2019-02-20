import { FormControl } from '@angular/forms';

export class Util {

    static MatchPassword(formControl: FormControl) {
      return new Promise(resolve => {
        const password = formControl.parent.controls['password'].value; // to get value in input tag
        const confirmpassword = formControl.value; // to get value in input tag
        if (password === confirmpassword) {
          return resolve(null); // All ok, passwords match!!!
        } else {
          return resolve({ 'not_match': true });
        }
      });
    }
}
