import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  valForm: FormGroup;
  settingActive = 1;
  constructor(fb: FormBuilder) {
    // Model Driven validation
    this.valForm = fb.group({
      'sometext': [null, Validators.required],
      'checkbox': [null, Validators.required],
      'radio': ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    // tslint:disable-next-line:forin
    for (const c in this.valForm.controls) {
        this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
        console.log('Valid!');
    }
    console.log(value);
}

}
