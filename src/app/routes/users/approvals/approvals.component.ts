import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { constants } from 'http2';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit {

  valForm: FormGroup;
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
