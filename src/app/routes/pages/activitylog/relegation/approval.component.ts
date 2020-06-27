import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class RelegationapprovalComponent implements OnInit {

  custnumber: string;
  accnumber: string;
  username: string;
  model: any = {};
  relegation: any = {};
  casenumber: string;
  minxDate: Date;
  approvalForm: FormGroup;
  approvalrights: boolean = false;

  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService,
    private formBuilder: FormBuilder) {
    //
  }

  ngOnInit() {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser)
    this.username = currentUser.USERNAME;

    if(currentUser.ROLE == 'teamleader') {
      this.approvalrights = true;
    }

    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.accnumber = queryParams.get('accnumber');
      this.model.accnumber = queryParams.get('accnumber');
    });

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.custnumber = queryParams.get('custnumber');
      this.model.custnumber = queryParams.get('custnumber');
    });

    this.casenumber = this.route.snapshot.queryParamMap.get('relg');
    this.getAccountDetails(this.casenumber);

    this.buildForm();

  }

  onSubmit() {
    // check if logged in
    this.ecolService.ifLogged();

    // Loading
    this.ecolService.loader();
    //
    const body = {
      casenumber: this.relegation.casenumber,
      approved: this.f.approval.value,
      newrrocode: this.f.newrrocode.value,
      approvalnote: this.f.approvalnote.value,
      approvedby: this.username,
      approvaldate: moment().format('DD-MMM-YYYY'), //.add(1, 'days')
      status: 'approved awaiting change of rrocode'
    };

    console.log(body);

    this.ecolService.approverelegate(body).subscribe(data => {
      swal('Successful!', 'Case updated!', 'success').then(function() {
        this.buildForm();
      });
      //
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during processing!', 'error');
    });
  }

  getAccountDetails(casenumber) {
    this.ecolService.relegationbyid(casenumber).subscribe(data => {
      this.relegation = data;
      this.buildForm();
    }, error => {
      console.log(error);
    });
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.approvalForm.controls; 
  }

  buildForm() {
    // get static data
    
    this.approvalForm = this.formBuilder.group({
      custname: [{ value: this.relegation.custname, disabled: true }],
      accnumber: [{ value: this.relegation.accnumber, disabled: true }],
      custnumber: [{ value: this.relegation.custnumber, disabled: true }],
      amountdisbursed: [{ value: this.relegation.amountdisbursed, disabled: false }],
      requestby: [{ value: this.relegation.requestby, disabled: true }],
      arocode: [{ value: this.relegation.arocode, disabled: true }],
      rrocode: [{ value: this.relegation.rrocode, disabled: true }],
      aroname: [{ value: this.relegation.aroname, disabled: false }],
      aroemail: [{ value: this.relegation.aroemail, disabled: false }],
      branchcode: [{ value: this.relegation.branchcode, disabled: true }],
      branchname: [{ value: this.relegation.branchname, disabled: false }],
      bucket: [{ value: this.relegation.bucket, disabled: true }],
      daysinarr: [{ value: this.relegation.daysinarr, disabled: true }],
      productcode: [{ value: this.relegation.productcode, disabled: true }],
      oustbalance: [{ value: this.relegation.oustbalance, disabled: true }],
      employer: [{ value: this.relegation.employer, disabled: false }],
      totalarrears: [{ value: this.relegation.totalarrears, disabled: true }],
      newrrocode: [this.relegation.newrrocode, [Validators.required, Validators.maxLength(6)]],
      approval: [{ value: this.relegation.approved, disabled: false }],
      approvalnote: ['', [Validators.required, Validators.minLength(5)]],
      approvedby: [{ value: this.relegation.approvedby, disabled: true }],
      approvaldate: [{ value: moment(this.relegation.approvaldate).format('DD-MMM-YYYY'), disabled: true }]
    });
  }

  changeAction(approval) {
    //
  }
}
