import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import { DataService } from '../../../../services/data.service';
import swal from 'sweetalert2';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgOption } from '@ng-select/ng-select';
import * as moment from 'moment';

const URL = environment.valor;

@Component({
  selector: 'app-sendletter',
  templateUrl: './activityaction.component.html',
  styleUrls: ['./activityaction.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class ActivityActionComponent implements OnInit {

  bsValue = new Date();
  // bsValue = this.currentDate();
  minDate: Date;

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
  party: any = [];
  cure: any = [];
  excuse: any = [];
  collectoraction: any = [
    {collectoractionid: 'OC', collectoraction: 'OUTGOING CALL'},
    {collectoractionid: 'IC', collectoraction: 'INCOMING CALL'},
    {collectoractionid: 'MET', collectoraction: 'DEBTOR VISITED'},
    {collectoractionid: 'REVW', collectoraction: 'ACCOUNT REVIEW'},
    {collectoractionid: 'SC', collectoraction: 'SENT CORRESPONDENCE'},
    {collectoractionid: 'RC', collectoraction: 'RECEIVED CORRESPONDENCE'},
    {collectoractionid: 'RR', collectoraction: 'ROUTE FOR REVIEW'},
    {collectoractionid: 'OA', collectoraction: 'ASSIGN OUTSIDE AGENCY'},
    {collectoractionid: 'RF', collectoraction: 'RECEIVED FILE'},
    {collectoractionid: 'FT', collectoraction: 'FUND TRANSFER'},
    {collectoractionid: 'NFA', collectoraction: 'NEW FILE ALLOCATION'}
  ];

  message: string;

  reviewers: any = [];
  account: any = [];
  sys = 'collections';

  ptp: NgOption[] = [
    { id: 'No', name: 'NO' },
    { id: 'Yes', name: 'YES' },
  ];

  currentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return day + '-' + month + '-' + year;
  }

  constructor(
    public settings: SettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private ecolService: EcolService,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
  }

  ngOnInit() {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    this.spinner.show();
    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.accnumber = queryParams.get('accnumber');
    });

    /*this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });*/

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.custnumber = queryParams.get('custnumber');
    });

    this.sys = this.route.snapshot.queryParamMap.get('sys');
    this.route.queryParamMap.subscribe(queryParams => {
      this.sys = queryParams.get('sys');
    });

    // build form
    this.buildForm();

    //
    this.getcmdstatus();
    this.getreviewers();
    this.getparty();
    // this.getcollectoraction();
    this.getexcuse();
    //
    if (this.sys === 'cc') {
      this.getcard(this.accnumber);
    } else if (this.sys === 'mcoopcash') {
      this.getmcoop(this.accnumber);
    } else if (this.sys === 'watch') {
      this.getwatch(this.accnumber);
    } else {
      this.getaccount(this.accnumber);
    }

  }

  getaccount(accnumber) {
    this.ecolService.getAccount(accnumber).subscribe(data => {
      this.account = data[0];
      // build form
      this.buildForm();
      if (swal.isVisible) { swal.close(); }
      this.spinner.hide();
    });
  }

  getwatch(accnumber) {
    this.ecolService.getwatch(accnumber).subscribe(data => {
      this.account = data[0];
      // build form
      this.buildForm();
      if (swal.isVisible) { swal.close(); }
      this.spinner.hide();
    });
  }

  getcard(cardacct) {
    this.ecolService.getcardAccount(cardacct).subscribe(data => {
      this.account = data[0];
      // build form
      this.buildForm();
      if (swal.isVisible) { swal.close(); }
      this.spinner.hide();
    });
  }

  getmcoop(loanaccnumber) {
    this.ecolService.getmcoopcashAccount(loanaccnumber).subscribe(data => {
      this.account = data[0];
      this.spinner.hide();
    });
  }

  getcmdstatus() {
    this.ecolService.getcmdstatus().subscribe(cmdstatus => {
      this.cmdstatus = cmdstatus;
    });
  }

  getreviewers() {
    this.ecolService.getreviewers().subscribe(data => {
      this.reviewers = data;
    });
  }

  getparty() {
    this.ecolService.getparty().subscribe(party => {
      this.party = party;
    });
  }

  getcollectoraction() {
    this.ecolService.getcollectoraction().subscribe(collectoraction => {
      this.collectoraction = collectoraction;
    });
  }

  getexcuse() {
    this.ecolService.getexcuse().subscribe(excuse => {
      this.excuse = excuse;
    });
  }

  getcure() {
    this.ecolService.getcure().subscribe(cure => {
      this.cure = cure;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.actionForm.controls; }

  buildForm() {
    // get static data
    this.actionForm = this.formBuilder.group({
      collectoraction: ['', Validators.required],
      party: [{value: '', disabled: true}],
      ptpamount: [{value: 0, disabled: true}],
      ptp: [{value: 'No', disabled: true}],
      ptpdate: [{value: this.currentDate, disabled: true}],
      collectornote: ['', [Validators.required, Validators.minLength(5)]],
      reviewdate: [this.account.reviewdate],
      reason: [this.account.excuse, Validators.required],
      cmdstatus: [this.account.cmdstatus, Validators.required],
      // branchstatus: [this.account.branchstatus],
      route: [this.account.routetostate],
      paymode: [''],
      rfdother: [{value: this.account.excuse_other, disabled: true}]
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.actionForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    // post data
    this.ecolService.loader();
    const body = {
      collectoraction: this.f.collectoraction.value,
      party: this.f.party.value,
      ptpamount: this.f.ptpamount.value,
      ptp: this.f.ptp.value,
      ptpdate: this.f.ptpdate.value,
      collectornote: this.f.collectornote.value,
      reviewdate: moment(this.f.reviewdate.value).format('DD-MMM-YYYY'),
      reason: this.f.reason.value,
      cmdstatus: this.f.cmdstatus.value,
      route: this.f.route.value,
      paymode: this.f.paymode.value,
      accountnumber: this.accnumber,
      custnumber: this.custnumber,
      arramount: this.account.totalarrears || 0,
      oustamount: this.account.oustbalance || 0,
      notesrc: 'made a note',
      noteimp: 'N',
      rfdother: this.f.rfdother.value,
      owner: this.username,
      product: this.account.section
    };
    // add action
    this.ecolService.postactivitylogs(body).subscribe(data => {
      this.sendNotesData(this.custnumber);
      swal('Success!', 'activity saved', 'success');
      // build form
      // this.buildForm();
    }, error => {
      console.log(error);
      swal('Error!', 'activitylog ::: service is currently not available', 'error');
    });
  }

  sendNotesData(custnumber) {
    this.ecolService.totalnotes(custnumber).subscribe(data => {
      this.dataService.pustNotesData(data[0].TOTAL);
    });
  }

  reset() {
    this.spinner.show();
    this.getaccount(this.accnumber);
  }

  changeAction(value) {
    if (value === 'OC' || value === 'IC' || value === 'MET') {
      this.actionForm.controls.party.enable();
    } else {
      this.actionForm.controls.party.disable();
      this.actionForm.controls.party.setValue(null);
    }
  }

  changeParty(form) {
    if (form.party === 1 || form.party === 4 || form.party === 5) {
      this.actionForm.controls.ptp.enable();
    } else {
      this.actionForm.controls.ptp.disable();
      this.actionForm.controls.ptp.setValue('NO');
    }
  }

  changeReason(value) {
    if (value === 'Other') {
      this.actionForm.controls.rfdother.enable();
    } else {
      this.actionForm.controls.rfdother.disable();
    }
  }

  changePtp(value) {
    if (value === 'YES') {
      this.actionForm.controls.ptpamount.enable();
      this.actionForm.controls.ptpdate.enable();
    } else {
      this.actionForm.controls.ptpamount.disable();
      this.actionForm.controls.ptpdate.disable();
      this.actionForm.controls.ptpamount.setValue(0);
      this.actionForm.controls.ptpdate.setValue(Date());
    }
  }
}
