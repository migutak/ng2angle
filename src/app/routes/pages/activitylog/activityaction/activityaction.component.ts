import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const URL = environment.valor;

@Component({
  selector: 'app-sendletter',
  templateUrl: './activityaction.component.html',
  styleUrls: ['./activityaction.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class ActivityActionComponent implements OnInit {

  accnumber: string;
  custnumber: string;
  accountdetails: any;
  guarantors: [];
  model: any = {};
  bodyletter: any = {};
  filepath: string;
  demands: any;
  file: string;
  smsMessage: string;
  username: string;

  actionForm: FormGroup;
  submitted = false;
  cmdstatus: any = [];

  actions = [
    { code: 'OC', name: 'OUTGOING CALL' },
    { code: 'IC', name: 'INCOMING CALL' },
    { code: 'MET', name: 'DEBTOR VISITED' },
    { code: 'REVW', name: 'ACCOUNT REVIEW' },
    { code: 'SC', name: 'SENT CORRESPONDENCE' },
    { code: 'FT', name: 'FUNDS TRANSFER' },
  ];

  party = [
    { code: '1', name: 'Account Holder' },
    { code: '2', name: 'No Answer' },
    { code: '3', name: 'Number not in service' },
    { code: '4', name: 'Secondary accountHolder' },
    { code: '5', name: 'Third Party' },
    { code: '6', name: 'Disconnected' },
    { code: '7', name: 'Not applicable' }
  ];

  cure = [
    { code: 'REST', name: 'Restructure' },
    { code: 'MERG', name: 'Loan Merging' },
    { code: 'DCNH', name: 'Pay Date Change' },
    { code: 'MORAT', name: 'Moratorium' },
    { code: 'TAKEOVER', name: 'Take Over' },
    { code: 'TOPUP', name: 'Top Ups' }
  ];

  reasons = [
    { code: 'Hardship', name: 'Hardship' },
    { code: 'Bankruptcy', name: 'Bankruptcy' },
    { code: 'Death in Family', name: 'Death in Family' },
    { code: 'Deceased', name: 'Deceased' },
    { code: 'Dispute', name: 'Dispute' },
    { code: 'Divorce', name: 'Divorce' },
    { code: 'Delay in proceeds', name: 'Delay in proceeds' },
    { code: 'Diversion of proceeds', name: 'Diversion of proceeds' },
    { code: 'Death in Family', name: 'Death in Family' },
    { code: 'Crop failure', name: 'Crop failure' },
    { code: 'AWOL/Left employment', name: 'AWOL/Left employment' },
    { code: 'Discharged', name: 'Discharged' },
    { code: 'Dismissed', name: 'Dismissed' },
    { code: 'Interdicted', name: 'Interdicted' },
    { code: 'Left Employment', name: 'Left Employment' },
    { code: 'Resigned', name: 'Resigned' },
    { code: 'Retired', name: 'Retired' },
    { code: 'Retrenched', name: 'Retrenched' },
    { code: 'Sacked', name: 'Sacked' },
    { code: 'Self Employed', name: 'Self Employed' },
    { code: 'Summary Dismissal', name: 'Summary Dismissal' },
    { code: 'Suspended', name: 'Suspended' },
    { code: 'Terminated', name: 'Terminated' },
    { code: 'Business Failure', name: 'Business Failure' },
    { code: 'Business Loss', name: 'Business Loss' }
  ];

  branchstatus: any = [];
  account: any = [];

  currentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return year + '-' + month + '-' + day;
  }

  constructor(
    public settings: SettingsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ecolService: EcolService) {
    //
  }

  ngOnInit() {
    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.accnumber = queryParams.get('accnumber');
    });

    this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.custnumber = queryParams.get('custnumber');
    });

    // build form
    this.buildForm();

    // get cmd status
    this.getcmdstatus();
    this.getbranchstatus();
    // get account details
    this.getaccount(this.accnumber);
  }

  getaccount(accnumber) {
    this.ecolService.getAccount(accnumber).subscribe(data => {
      this.account = data[0];
    });
  }

  getcmdstatus() {
    this.ecolService.getcmdstatus().subscribe(cmdstatus => {
      this.cmdstatus = cmdstatus;
    });
  }

  getbranchstatus() {
    this.ecolService.getcmdstatus().subscribe(branchstatus => {
      this.branchstatus = branchstatus;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.actionForm.controls; }

  buildForm() {
    // get static data
    this.actionForm = this.formBuilder.group({
      collectoraction: ['', Validators.required],
      party: ['', Validators.required],
      ptpamount: [''],
      ptp: ['', [Validators.required]],
      ptpdate: [Date],
      collectornote: ['', [Validators.required, Validators.minLength(5)]],
      reviewdate: [Date, Validators.required],
      reason: ['', Validators.required],
      cmdstatus: [''],
      branchstatus: [''],
      route: [''],
      paymode: [''],
      cure: [''],
      rfdother: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.actionForm.invalid) {
      return;
    }

    // post data
    this.ecolService.loader();
    // post body
    const body = {
      collectoraction: this.f.collectoraction.value,
      party: this.f.party.value,
      ptpamount: this.f.ptpamount.value,
      ptp: this.f.ptp.value,
      ptpdate: this.f.ptpdate.value,
      collectornote: this.f.collectornote.value,
      reviewdate: this.f.reviewdate.value + 1,
      reason: this.f.reason.value,
      cmdstatus: this.f.cmdstatus.value,
      branchstatus: this.f.branchstatus.value,
      route: this.f.route.value,
      paymode: this.f.paymode.value,
      cure: this.f.cure.value,
      accnumber: this.accnumber,
      custnumber: this.custnumber,
      arramount: this.account.totalarrears || 0,
      oustamount: this.account.oustbalance || 0,
      notesrc: 'made a note',
      noteimp: 'N',
      rfdother: this.f.rfdother.value,
      owner: this.username
    };
    //add action
    this.ecolService.postactivitylogs(body).subscribe(data => {
      swal('Success!', 'activity saved', 'success');
    }, error => {
      console.log(error);
      // fire error service
      swal('Error!', 'postactivitylogs - service is currently not available', 'error');
    });
    //update portfolio add notes and ptp
    this.ecolService.recordupdate(body).subscribe(data => {
      swal('Success!', 'Records updated', 'success');
    }, error => {
      console.log(error);
      // fire error service
      swal('Error!', 'recordupdate - service is currently not available', 'error');
    });
  }
}
