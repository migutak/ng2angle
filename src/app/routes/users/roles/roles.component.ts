import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  valForm: FormGroup;
  settingActive = 1;
  constructor(fb: FormBuilder, private ecolService: EcolService) {
    // Model Driven validation
    this.valForm = fb.group({
      'user_mgmt': [null, Validators.required],
      'act_viewer': [null],
      'col_activity': [''],
      'letter_configs': [null],
      'external_agents': [''],
      'sms_configs': [null],
      'send_sms': [''],
      'send_letter': [''],
      'creditcards': [''],
      'cmd': [''],
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

permission(perm, rights) {
  this.ecolService.loader();
  this.ecolService.getperm(rights).subscribe(data => {
    console.log(data);
    swal('Successful!', 'Permissions retrieved!', 'success');
  }, error => {
    console.log(error);
    swal('Error!', 'exception occured!', 'error');
  });
}

}
