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
  savebody: any = {};
  actionForm: FormGroup;
  submitted = false;
  cmdstatus: any = [];
  party: any = [];
  cure: any = [];
  excuse: any = [];
  capture = true;
  collectoraction: any = [
    { collectoractionid: 'OC', collectoraction: 'OUTGOING CALL' },
    { collectoractionid: 'IC', collectoraction: 'INCOMING CALL' },
    { collectoractionid: 'MET', collectoraction: 'DEBTOR VISITED' },
    { collectoractionid: 'REVW', collectoraction: 'ACCOUNT REVIEW' },
    { collectoractionid: 'EMPVISIT', collectoraction: 'EMPLOYER VISIT' },
    { collectoractionid: 'SC', collectoraction: 'SENT CORRESPONDENCE' },
    { collectoractionid: 'RC', collectoraction: 'RECEIVED CORRESPONDENCE' },
    { collectoractionid: 'RR', collectoraction: 'ROUTE FOR REVIEW' },
    { collectoractionid: 'OA', collectoraction: 'ASSIGN OUTSIDE AGENCY' },
    { collectoractionid: 'RF', collectoraction: 'RECEIVED FILE' },
    { collectoractionid: 'FT', collectoraction: 'FUND TRANSFER' },
    { collectoractionid: 'NFA', collectoraction: 'NEW FILE ALLOCATION' }
  ];

  message: string;

  reviewers: any = [];
  account: any = [];
  sys = 'collections';

  ptp: NgOption[] = [
    { id: 'No', name: 'No' },
    { id: 'Yes', name: 'Yes' },
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
    // check if logged!
    this.ecolService.ifLogged();
    this.ecolService.ifclosed();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

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
    } else if (this.sys === 'watchcc') {
      this.getwatchcard(this.accnumber);
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
      this.account = data;
      if (data.watch) {
        this.account.reviewdate = data.watch.reviewdate || '',
          this.account.excuse = data.watch.excuse || '',
          this.account.cmdstatus = data.watch.cmdstatus || 'Hardcore',
          this.account.routetostate = data.watch.routetostate || 'ACTIVE COLLECTIONS',
          this.account.excuse_other = data.watch.rfdother;
      }

      // build form
      this.buildForm();
      if (swal.isVisible) { swal.close(); }
      this.spinner.hide();
    });
  }

  getwatchcard(cardacct) {
    this.ecolService.getWatchcardAccount(cardacct).subscribe(data => {
      this.account = data[0];
      this.getwatchcardstatic(cardacct);
    });
  }

  getwatchcardstatic(cardacct) {
    this.ecolService.getWatchcardStatic(cardacct).subscribe(data => {
      console.log(data);
      if (data && data.length > 0) {
        this.account.reviewdate = data[0].reviewdate;
        this.account.excuse = data[0].excuse;
        this.account.cmdstatus = data[0].cmdstatus;
        this.account.routetostate = data[0].routetostate;
        this.account.excuse_other = data[0].rfdother;
      }

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
      party: [{ value: '', disabled: true }],
      ptpamount: [{ value: 0, disabled: true }],
      ptp: [{ value: 'No', disabled: true }],
      ptptype: [{ value: '', disabled: true }],
      ptpdate: [{ value: this.currentDate, disabled: true }],
      collectornote: ['', [Validators.required, Validators.minLength(5)]],
      reviewdate: [this.account.reviewdate],
      reason: [this.account.excuse, Validators.required],
      cmdstatus: [this.account.cmdstatus],
      flag: [false],
      route: [this.account.routetostate],
      paymode: [''],
      rfdother: [{ value: this.account.excuse_other, disabled: true }]
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
    
    this.username = currentUser.USERNAME;

    // post data
    this.ecolService.loader();
    this.savebody = {
      collectoraction: this.f.collectoraction.value,
      party: this.f.party.value,
      ptpamount: this.f.ptpamount.value,
      ptp: this.f.ptp.value,
      ptpdate: this.f.ptpdate.value,
      // tslint:disable-next-line:max-line-length
      collectornote: this.f.collectornote.value + '   Reason for default: ' + this.f.reason.value + '   Reason details: ' + this.f.rfdother.value,
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
    if (this.f.flag.value) {
      this.savebody.noteimp = 'Y';
    }
    // add action
    // console.log(this.savebody);
    this.ecolService.postactivitylogs(this.savebody).subscribe(data => {
      this.sendNotesData(this.custnumber);
      this.sendPtpsData(this.accnumber);
      // swal('Success!', 'activity saved', 'success');
      // build form
      // this.buildForm();
      // watch stream put watch_static
      if (this.sys === 'watchcc') {
        const watchccbody = {
          rfdother: this.f.rfdother.value,
          cardacct: this.accnumber,
          cmdstatus: this.f.cmdstatus.value,
          excuse: this.f.reason.value,
          lastactiondate: new Date(),
          reviewdate: moment(this.f.reviewdate.value).format('DD-MMM-YYYY'),
          routetostate: this.f.route.value
        };

        this.ecolService.putcardwatch(watchccbody).subscribe(resp => {
          //
        }, error => { console.log(error); });
      }
      //
      if (this.sys === 'watch') {
        const watchbody = {
          rfdother: this.f.rfdother.value,
          accnumber: this.accnumber,
          cmdstatus: this.f.cmdstatus.value,
          excuse: this.f.reason.value,
          lastactiondate: new Date(),
          reviewdate: moment(this.f.reviewdate.value).format('DD-MMM-YYYY'),
          routetostate: this.f.route.value
        };

        this.ecolService.putwatch(watchbody).subscribe(resp => {
          //
        }, error => { console.log(error); });
      }

      // close windows
      swal({
        title: 'Activity successfully saved',
        imageUrl: 'assets/img/user/coop.jpg',
        text: 'Close activity windows?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Close!'
      }).then((result) => {
        if (result.value) {
          // close tab
          window.close();
        } else {
          // reset
          this.reset();
        }
      });
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

  sendPtpsData(accnumber) {
    this.ecolService.getptps(accnumber).subscribe(data => {
      this.dataService.pushPtps(data.length);
    });
  }

  reset() {
    this.spinner.show();
    if (this.sys === 'cc') {
      this.getcard(this.accnumber);
    } else if (this.sys === 'watchcc') {
      this.getwatchcard(this.accnumber);
    } else if (this.sys === 'mcoopcash') {
      this.getmcoop(this.accnumber);
    } else if (this.sys === 'watch') {
      this.getwatch(this.accnumber);
    } else {
      this.getaccount(this.accnumber);
    }
  }

  changeAction(value) {
    if (value === 'OC' || value === 'IC' || value === 'MET') {
      this.actionForm.controls.party.enable();
      this.actionForm.controls.party.setValue('No Answer');
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
      this.actionForm.controls.ptp.setValue('No');
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
    if (value === 'Yes') {
      this.actionForm.controls.ptptype.enable();
    } else {
      this.actionForm.controls.ptpamount.disable();
      this.actionForm.controls.ptpdate.disable();
      this.actionForm.controls.ptptype.disable();
      this.actionForm.controls.ptpamount.setValue(0);
      this.actionForm.controls.ptpdate.setValue(Date());
      this.actionForm.controls.ptptype.setValue('');
    }
  }

  handleChange(ptptype) {
    if (ptptype === 'single') {
      this.capture = true;
      this.actionForm.controls.ptpamount.enable();
      this.actionForm.controls.ptpdate.enable();
    } else {
      this.capture = false;
      this.actionForm.controls.ptpamount.disable();
      this.actionForm.controls.ptpdate.disable();
      this.actionForm.controls.ptpamount.setValue(0);
      this.actionForm.controls.ptpdate.setValue(Date());
    }
  }

  multiplecapturefnc() {
    // tslint:disable-next-line:max-line-length
    window.open(environment.applink + '/multipleptp?accnumber=' + this.accnumber + '&custnumber=' + this.custnumber + '&username=' + this.username + '&sys=collections', '_blank');
  }
}
