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
      'role_id': [null],
      'user_mgmt': [null],
      'act_viewer': [null],
      'col_activity': [null],
      'letter_configs': [null],
      'external_agents': [null],
      'sms_configs': [null],
      'send_sms': [false],
      'send_letter': [null],
      'creditcards': [null],
      'cmd': [null],
    });
  }

  ngOnInit() {
    this.permission('1', 'admin');
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    // tslint:disable-next-line:forin
    for (const c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      // console.log('Valid!');
      // console.log(value);
      // prepare permission data
        this.ecolService.loader();
        const body0 = {
          attr: value.user_mgmt,
          role_id: value.role_id,
          perm_id: 'user_mgmt'
        };

        const body1 = {
          attr: value.act_viewer,
          role_id: value.role_id,
          perm_id: 'act_viewer'
        };

        const body2 = {
          attr: value.cmd,
          role_id: value.role_id,
          perm_id: 'cmd'
        };

        const body3 = {
          attr: value.external_agents,
          role_id: value.role_id,
          perm_id: 'external_agents'
        };

        const body4 = {
          attr: value.letter_configs,
          role_id: value.role_id,
          perm_id: 'letter_configs'
        };

        const body5 = {
          attr: value.send_letter,
          role_id: value.role_id,
          perm_id: 'send_letter'
        };

        const body6 = {
          attr: value.send_sms,
          role_id: value.role_id,
          perm_id: 'send_sms'
        };

        const body7 = {
          attr: value.act_viewer,
          role_id: value.role_id,
          perm_id: 'act_viewer'
        };

        const body8 = {
          attr: value.sms_configs,
          role_id: value.role_id,
          perm_id: 'sms_configs'
        };

        const body9 = {
          attr: value.creditcards,
          role_id: value.role_id,
          perm_id: 'creditcards'
        };

        const body10 = {
          attr: value.col_activity,
          role_id: value.role_id,
          perm_id: 'col_activity'
        };

        this.ecolService.setpermissions(body1).subscribe(data => { });
        this.ecolService.setpermissions(body2).subscribe(data => { });
        this.ecolService.setpermissions(body3).subscribe(data => { });
        this.ecolService.setpermissions(body4).subscribe(data => { });
        this.ecolService.setpermissions(body5).subscribe(data => { });
        this.ecolService.setpermissions(body6).subscribe(data => { });
        this.ecolService.setpermissions(body7).subscribe(data => { });
        this.ecolService.setpermissions(body8).subscribe(data => { });
        this.ecolService.setpermissions(body9).subscribe(data => { });

      this.ecolService.setpermissions(body10).subscribe(data => { });
      this.ecolService.setpermissions(body0).subscribe(data => {
        swal('Successful!', 'Permissions set!', 'success');
      }, error => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  permission(perm, rights) {
    this.ecolService.loader();
    this.ecolService.getperm(rights).subscribe(data => {
      console.log(data);
      this.valForm.patchValue({
        role_id: data[0].role_id,
        user_mgmt: this.truefalse(data[0].attr),
        act_viewer: this.truefalse(data[2].attr),
        col_activity: this.truefalse(data[1].attr),
        letter_configs: this.truefalse(data[3].attr),
        external_agents: this.truefalse(data[9].attr),
        sms_configs: this.truefalse(data[4].attr),
        send_sms: this.truefalse(data[5].attr),
        send_letter: this.truefalse(data[6].attr),
        creditcards: this.truefalse(data[7].attr),
        cmd: this.truefalse(data[8].attr)
      });
      swal('Successful!', 'Permissions retrieved!', 'success');
    }, error => {
      console.log(error);
      swal('Error!', 'exception occured!', 'error');
    });
  }

  truefalse(value) {
    if (value === 'true') {
      return true;
    } else {
      return false;
    }
  }

  /*this.myFormGroup.setValue({
    formControlName1: myValue1,
    formControlName2: myValue2
  });

  this.myFormGroup.patchValue({
    formControlName1: myValue1,
    // formControlName2: myValue2 (can be omitted)
  });*/

}
