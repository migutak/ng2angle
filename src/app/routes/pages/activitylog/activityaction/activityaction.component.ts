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
//import { NgxSmartModalService } from 'ngx-smart-modal';
import { v4 as uuidv4 } from 'uuid';
//const URL = environment.valor;

@Component({
  selector: 'app-sendletter',
  templateUrl: './activityaction.component.html',
  styleUrls: ['./activityaction.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class ActivityActionComponent implements OnInit {

  bsValue = new Date();
  public minDate: NgbDateStruct;
  minxDate: Date;
  year = parseInt(moment().format('YYYY'));
  month = parseInt(moment().format('MM'));
  day = parseInt(moment().format('DD'));

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
  party: any = [{ "partyid": 1, "party": "Account Holder", "active": "true" }, { "partyid": 2, "party": "No Answer", "active": "true" }, { "partyid": 3, "party": "Number not in service", "active": "true" }, { "partyid": 4, "party": "Secondary accountHolder", "active": "true" }, { "partyid": 5, "party": "Third Party", "active": "true" }, { "partyid": 6, "party": "Disconnected", "active": "true" }, { "partyid": 7, "party": "Not applicable", "active": "true" }];
  cure: any = [];
  excuse: any = [];
  excusedetails: any = [];
  capture: boolean = true;
  ptpcaptured: boolean = true;
  ptps: any = [];
  static: any = [];
  ptp_m: any = {};

  ptpmultiple: any = {};
  en_ptp: any = {};
  edit = false;
  isptptosave = false;
  p = 1;
  autodial_telnumber: string;
  emailaddress: string;
  ptpid: any = 0;
  repo: boolean = false;
  ipf: boolean = false;
  woff: boolean = false;
  relg: boolean = false;
  debtcollect: boolean = false;
  investigate: boolean = false;
  ipfstatus: string;

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
    { collectoractionid: 'NFA', collectoraction: 'NEW FILE ALLOCATION' },
    { collectoractionid: 'REPO', collectoraction: 'REQUEST FOR REPOSSESSION' },
    { collectoractionid: 'IPF', collectoraction: 'CANCELLED IPF' },
    { collectoractionid: 'WOFF', collectoraction: 'REQUEST FOR WRITEOFF' },
    { collectoractionid: 'RELG', collectoraction: 'RELEGATE ACCOUNT' },
    { collectoractionid: 'INVESTIGATE', collectoraction: 'SEND FOR INVESTIGATION' }
  ];

  remedialproducts: any = [
    { name: 'None' },
    { name: 'Restructure' },
    { name: 'Top up' },
    { name: 'Interest Concession' },
    { name: 'Debt discount (Full & final Settlement)' },
    { name: 'Rescheduling' },
    { name: 'Insurance claim' },
    { name: 'Out of court settlement' },
    { name: 'Foreclosure' },
    { name: 'Take over' },
    { name: 'Write off' },
    { name: 'Interest Concession' },
    { name: 'Consolidation' },
    { name: 'Private treaty sale' },
    { name: 'Auction' },
  ]

  message: string;
  ptpamount: number = 0;
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
  };

  reason = [];

  constructor(
    public settings: SettingsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ecolService: EcolService,
    private dataService: DataService,
    private spinner: NgxSpinnerService
  ) {
    this.minDate = { year: this.year, month: this.month, day: this.day };
    this.minxDate = new Date();
    this.minxDate.setDate(this.minxDate.getDate());
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

    this.ptpid = this.route.snapshot.queryParamMap.get('ptpid');
    this.ipfstatus = this.route.snapshot.queryParamMap.get('ipfstatus');
    // build form
    this.buildForm();

    //
    this.getcmdstatus();
    //this.getreviewers();
    //this.getparty();
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
      this.autodial_telnumber = this.account.cellnumber || this.account.mobile || this.account.phonenumber || this.account.telnumber || this.account.celnumber;
      this.model.emailaddress = data[0].emailaddress;
      this.emailaddress = data[0].emailaddress;
      this.getstatic(this.accnumber);
    });
  }

  getstatic(accnumber) {
    this.ecolService.getStaticLoans(accnumber).subscribe(data => {

      if (data && data.length > 0) {
        this.account.reviewdate = data[0].reviewdate;
        this.account.excuse = data[0].excuse;
        this.account.cmdstatus = data[0].cmdstatus;
        this.account.routetostate = data[0].routetostate;
        this.account.excuse_other = data[0].excuse_other;
        this.account.restructure = data[0].restructure;
        this.account.restructureamount = data[0].restructureamount;
        this.account.abilitytopay = data[0].abilitytopay;
      }
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
          this.account.cmdstatus = data.watch.cmdstatus || '',
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
    this.ecolService.excuse().subscribe(reasons => {
      this.excuse = reasons;
    }, error => {
      console.log(error)
    });

    /*this.ecolService.getexcuse().subscribe(reasons => {
      this.reason = reasons;
      for(let i=0; i<reasons.length; i++) {
        if (this.reason[i].disabled === "false") {
          this.reason[i].disabled = false;
        } else {
          this.reason[i].disabled = true;
        }
      }
    });*/
  }

  getcure() {
    this.ecolService.getcure().subscribe(cure => {
      this.cure = cure;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.actionForm.controls; }

  buildForm() {
    this.actionForm = this.formBuilder.group({
      collectoraction: ['', Validators.required],
      party: ['', Validators.required],
      ptpamount: [{ value: 0, disabled: true }],
      toemail: [{ value: '', disabled: false }],
      toemailaddress: [{ value: this.emailaddress, disabled: false }],
      ptpsms: [{ value: '', disabled: false }],
      ptpsmsnumber: [{ value: this.autodial_telnumber, disabled: true }],
      ptp: [{ value: 'No', disabled: false }],
      ptptype: [{ value: '', disabled: true }],
      ptpdate: [{ value: this.currentDate, disabled: true }],
      collectornote: ['', [Validators.required, Validators.minLength(5)]],
      reviewdate: [this.account.reviewdate],
      //reason: [this.account.excuse, Validators.required],
      reason: [''],
      excusedetails: [''],
      cmdstatus: [this.account.cmdstatus],
      flag: [false],
      route: [this.account.routetostate],
      paymode: [''],
      callbacktime: [''],
      rfdother: [{ value: this.account.excuse_other, disabled: true }],
      checkremedialproduct: [false],
      //restructure: [this.account.restructure],
      //restructureamount: [{value: this.account.restructureamount, disabled: true}],
      //restructuredate: [{value: this.account.restructuredate, disabled: true}],
      abilitytopay: [this.account.abilitytopay],
      remedialproduct: [{ value: this.account.remedialproduct, disabled: true }],
      productclosuredate: [{ value: this.account.productclosuredate, disabled: true }]
    });
  }

  onactivitySubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.actionForm.invalid) {
      //alert('Please fill all required fields');
      return;
    }

    if (this.f.ptp.value == 'Yes' && this.ptps.length == 0) {
      swal('Alert', 'Please Capture Promises ', 'warning');
      return;
    }

    if (this.f.toemail.value && this.f.toemailaddress.value == '') {
      swal('Alert', 'Please fill Customer email', 'warning');
      return;
    }

    if (this.f.ptpsms.value && this.f.ptpsmsnumber.value == '') {
      swal('Alert', 'Please provide PTP SMS reminder Mobile number', 'warning');
      return;
    }

    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.username = currentUser.USERNAME;

    // post data
    this.ecolService.loader();
    this.savebody = {
      action: this.f.collectoraction.value,
      party: this.f.party.value,
      promiseamount: this.ptpamount,
      ptp: this.f.ptp.value,
      notemade: this.f.collectornote.value,
      reviewdate: moment(this.f.reviewdate.value).format('DD-MMM-YYYY'),
      reason: this.f.reason.value,
      reasondetails: this.f.excusedetails.value,
      cmdstatus: this.f.cmdstatus.value || "  ",
      route: this.f.route.value || 'ACTIVE COLLECTION',
      paymode: this.f.paymode.value,
      accountnumber: this.accnumber,
      custnumber: this.custnumber,
      arramount: this.account.totalarrears || 0,
      oustamount: this.account.oustbalance || 0,
      notesrc: 'made a note',
      noteimp: 'N',
      rfdother: this.f.rfdother.value || '0',
      owner: this.username,
      product: this.account.section || '0',
      //restructure: String(this.f.restructure.value) || 'false',
      //restructureamount: this.f.restructureamount.value  || 0,
      //restructuredate: this.f.restructuredate.value || " ",
      remedialproduct: this.f.remedialproduct.value || 'None',
      productclosuredate: this.f.productclosuredate.value || " ",
      abilitytopay: this.f.abilitytopay.value || 'Unknown',
      promisedate: moment(this.f.ptpdate.value).format('YYYY-MMM-DD'),
      toemailaddress: this.f.toemailaddress.value || '0',
      toemail: this.f.toemail.value || '0',
      ptpsms: this.f.ptpsms.value || '0',
      ptpsmsnumber: this.f.ptpsmsnumber.value || '0',
      ptpemailaddress: this.f.toemailaddress.value || '0'
    };
    if (this.f.flag.value) {
      this.savebody.noteimp = 'Y';
    }

    if (this.f.toemail.value) {
      // send ptp reminder email
      const ptpemailbody = {
        toemail: this.f.toemailaddress.value,
        ccemail: this.username + '@co-opbank.co.ke',
        ptpamount: this.ptps
      }

    }


    // add action
    this.ecolService.postactivitylogs(this.savebody).subscribe(data => {
      this.sendNotesData(this.custnumber);

      // save ptps
      if (this.f.ptp.value == 'Yes') {
        // add ptpsmsnumber and ptpemailadress to ptps[]
        for (let x = 0; x < this.ptps.length; x++) {
          this.ptps[x].ptpsms = this.savebody.ptpsms;
          this.ptps[x].ptpemail = this.savebody.toemail;
          this.ptps[x].ptpsmsnumber = this.savebody.ptpsmsnumber;
          this.ptps[x].ptpemailaddress = this.savebody.ptpemailaddress;
        }
        this.saveallptps();
        this.sendPtpsData(this.accnumber);
      }

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
        }, error => { console.log(error); });
      }

      if (this.sys === 'ptp') {
        const ptpbody = {
          id: this.ptpid,
          comment: this.f.collectornote.value,
          reviewdate: moment().format('DD-MMM-YYYY'),
          owner: this.username
        };

        this.ecolService.reviewptp(ptpbody).subscribe(resp => {
        }, error => { console.log(error); });
      }

      if (this.savebody.collectoraction === 'RELG') {
        const relegateBody = {
          casenumber: uuidv4(),
          accnumber: this.accnumber,
          custnumber: this.custnumber,
          custname: this.account.client_name,
          oustbalance: this.account.oustbalance,
          section: this.account.section,
          daysinarr: this.account.daysinarr,
          totalarrears: this.account.totalarrears,
          bucket: this.account.bucket,
          productcode: this.account.productcode,
          arocode: this.account.arocode,
          rrocode: this.account.rrocode,
          branchcode: this.account.branchcode,
          branchname: this.account.branchname,
          applink: environment.applink + '/activitylog?accnumber=' + this.accnumber + '&custnumber=' + this.custnumber + '&username=' + this.username + '&sys=relegation&nationid=' + this.account.nationid + '&relg=' + this.username,
          requestby: this.username,
          status: 'pending',
          approved: '0',
          requestdate: new Date()
        };

        // set applink with casenumber
        relegateBody.applink = environment.applink + '/activitylog?accnumber=' + this.accnumber + '&custnumber=' + this.custnumber + '&username=' + this.username + '&sys=relegation&nationid=' + this.account.nationid + '&relg=' + relegateBody.casenumber,
          this.ecolService.relegation(relegateBody).subscribe(resp => {
            console.log(resp)
          }, error => {
            console.log(error);
          });
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
      swal('Error!', 'activitylog service is currently not available', 'error');
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
    this.ptps = [];
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
    /*if (value === 'OC' || value === 'IC' || value === 'MET') {
      this.actionForm.controls.party.enable();
      this.actionForm.controls.party.setValue('No Answer');
    } else {
      this.actionForm.controls.party.disable();
      this.actionForm.controls.party.setValue(null);
    }*/

    if (value === 'REPO') {
      this.repo = true;
      this.ipf = false;
      this.woff = false;
      this.relg = false;
      this.debtcollect = false;
      this.investigate = false;
    } else if (value === 'IPF') {
      this.repo = false
      this.ipf = true
      this.woff = false;
      this.relg = false;
      this.debtcollect = false;
      this.investigate = false;
    } else if (value === 'WOFF') {
      this.woff = true;
      this.repo = false;
      this.ipf = false;
      this.relg = false;
      this.debtcollect = false;
      this.investigate = false;
    } else if (value === 'RELG') {
      this.woff = false;
      this.repo = false;
      this.ipf = false;
      this.relg = true; // form for relegation added
      this.debtcollect = false;
      this.investigate = false;
    } else if (value === 'INVESTIGATE') {
      this.woff = false;
      this.repo = false;
      this.ipf = false;
      this.investigate = true;
      this.relg = false;
      this.debtcollect = false;
    } else if (value === 'DEBTCOLLECT') {
      this.woff = false;
      this.repo = false;
      this.ipf = false;
      this.relg = false;
      this.debtcollect = true;
      this.investigate = false;
    }
    else {
      this.repo = false;
      this.woff = false;
      this.ipf = false;
      this.relg = false;
      this.debtcollect = false;
      this.investigate = false;
    }
  }

  changeParty(form) {
    if (form.party === "1" || form.party === "4" || form.party === "5") {
      //this.actionForm.controls.ptp.enable();
      this.actionForm.controls["reason"].setValidators(Validators.required);
      this.actionForm.controls["reason"].updateValueAndValidity();
      this.actionForm.controls["excusedetails"].setValidators(Validators.required);
      this.actionForm.controls["excusedetails"].updateValueAndValidity();
    } else {
      //this.actionForm.controls.ptp.disable();
      //this.actionForm.controls.ptp.setValue('No');
      this.actionForm.controls["reason"].setValidators([]);
      this.actionForm.controls["reason"].updateValueAndValidity();
      this.actionForm.controls["excusedetails"].setValidators([]);
      this.actionForm.controls["excusedetails"].updateValueAndValidity();
    }
  }

  checkremedialproductfnc(value) {
    if (value) {
      this.actionForm.controls.remedialproduct.enable();
      this.actionForm.controls.productclosuredate.enable();
      this.actionForm.controls["remedialproduct"].setValidators(Validators.required);
      this.actionForm.controls["productclosuredate"].setValidators(Validators.required);
      this.actionForm.controls["productclosuredate"].updateValueAndValidity();
    } else {
      this.actionForm.controls.remedialproduct.disable();
      this.actionForm.controls.productclosuredate.disable();
      this.actionForm.controls.remedialproduct.setValue('');
      this.actionForm.controls.productclosuredate.setValue('');
    }
  }

  restructure(value) {
    if (value) {
      this.actionForm.controls.restructureamount.enable();
      this.actionForm.controls.restructuredate.enable();
      this.actionForm.controls["restructureamount"].setValidators(Validators.required);
      this.actionForm.controls["restructuredate"].setValidators(Validators.required);
      this.actionForm.controls["restructuredate"].updateValueAndValidity();
      this.actionForm.controls["restructureamount"].updateValueAndValidity();
    } else {
      this.actionForm.controls.restructureamount.disable();
      this.actionForm.controls.restructuredate.disable();
      this.actionForm.controls.restructureamount.setValue('');
      this.actionForm.controls.restructuredate.setValue('');
    }
  }

  changeReason(in_excuse) {
    if (in_excuse) {
      this.ecolService.getexcusedetails(in_excuse).subscribe(excuses => {
        if (excuses.length > 0) {
          this.excusedetails = excuses;
        } else {
          this.excusedetails = [];
        }

      }, error => {
        console.log(error);
        alert('error retrieving reason for default')
      })
    }

    /// find in excuses array
    // this.excusedetails = this.excuse.filter(x => x.excuse === in_excuse);
    // console.log(this.excusedetails);
  }

  changePtp(value) {
    if (value === 'Yes') {
      // check if ptp exists
      this.ecolService.activeptps(this.accnumber).subscribe(activedata => {
        if (activedata && activedata.data.length > 0) {
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'This a/c already has a running promise to pay. Check under Promises to pay'
          }).then((result) => {
            this.actionForm.controls.ptp.setValue('No');
          });
        }
      });

      //this.actionForm.controls.ptptype.enable();
      this.actionForm.controls.ptpsmsnumber.enable();
      this.actionForm.controls.ptpsms.setValue(false);
      this.actionForm.controls.toemail.setValue(false);
      this.capture = false;
    } else {
      this.actionForm.controls.ptpsms.setValue(false);
      this.actionForm.controls.toemail.setValue(false);
      this.capture = true;
      this.ptpcaptured = true;
      this.ptps = [];
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

  showptpcaptured() {
    if (this.ptps.length > 0) {
      this.ptpcaptured = false;
    } else {
      this.ptpcaptured = true;
    }
  }

  deleteptp(form) {
    const index: number = this.ptps.indexOf(form);
    if (index !== -1) {
      this.ptps.splice(index, 1);
      this.ptpamount = this.ptpamount - parseInt(form.ptpamount);
      if (this.ptps.length === 0) {
        this.isptptosave = false;
      }
    }

    this.showptpcaptured();
  }

  ptpfunc(form) {
    const ptpamount = form.value.ptpamount;
    const ptpdate = (moment(form.value.ptpdate).format('DD-MMM-YYYY')).toUpperCase();
    const promisedate = (moment(form.value.ptpdate).add(1, 'd').format('DD-MMM-YYYY')).toUpperCase();
    const owner = this.username;
    const accnumber = this.accnumber;
    const paymode = form.value.paymode;

    this.ptps.push({ promisedate: promisedate, ptpdate: ptpdate, ptpamount: ptpamount, owner: owner, accnumber: accnumber, paymode: paymode, arramount: this.account.totalarrears });
    this.isptptosave = true;
    this.ptpamount = this.ptpamount + parseInt(ptpamount);

    this.showptpcaptured();

  }

  saveallptps() {
    this.ecolService.postptps(this.ptps).subscribe(resp => {

    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during processing - ptps!', 'error');
    });
  }

  repossess() {
    // place temp data in bpms
    var body = {
      accnumber: this.accnumber,
      custnumber: this.custnumber,
      process: 'assetfinance',
      username: 'admin'
    }
    this.ecolService.relegate(body).subscribe(dataresp => {
      //
      window.open(environment.repossessLink);
    }, error => {
      alert('error !!!')
    }
    );
  }

  funcinvestigate() {
    // place temp data in bpms
    var body = {
      accnumber: this.accnumber,
      custnumber: this.custnumber,
      process: 'investigate',
      username: 'admin'
    }
    this.ecolService.relegate(body).subscribe(dataresp => {
      //
      window.open(environment.investigateLink);
    }, error => {
      alert('error !!!')
    }
    );
  }

  funcdebtcollectors() {
    // place temp data in bpms
    var body = {
      accnumber: this.accnumber,
      custnumber: this.custnumber,
      process: 'debtcollector',
      username: 'admin'
    }
    this.ecolService.relegate(body).subscribe(dataresp => {
      //
      window.open(environment.debtcollectorLink);
    }, error => {
      console.log(error)
      alert('error !!!')
    }
    );
  }

  funcwoff() {
    // place temp data in bpms
    var body = {
      accnumber: this.accnumber,
      custnumber: this.custnumber,
      process: 'woff',
      username: 'admin'
    }
    this.ecolService.relegate(body).subscribe(dataresp => {
      //
      window.open(environment.woffLink);
    }, error => {
      alert('error !!!')
    }
    );
  }

  cancelipf() {
    // check if ipf
    this.ecolService.checkipfcancellation(this.accnumber).subscribe(data => {
      if(data && data.length) {
      this.ipfstatus = data[0].status
      }
      //console.log((this.accnumber).substring(2, 5), this.ipfstatus)

      if ((this.accnumber).substring(2, 5) === '6D0' && !this.ipfstatus) {
        window.open(environment.applink + '/cancelipf?accnumber=' + this.accnumber + '&custnumber=' + this.custnumber + '&username=' + this.username + '&sys=collections&nationid=', '_blank');
      } else {
        alert('Product not IPF or IPF Cancellation already in progress')
      }
    }, error => {
      console.log(error)
      alert('error !!!')
    });   
  }

  cancelipfold() {
    // place temp data in bpms
    var body = {
      accnumber: this.accnumber,
      custnumber: this.custnumber,
      process: 'ipf',
      username: 'admin'
    }
    this.ecolService.relegate(body).subscribe(dataresp => {
      //
      window.open(environment.calcelipfLink);
    }, error => {
      alert('error !!!')
    });
  }

  funcrelg() {
    // place tem data in bpms
    var body = {
      accnumber: this.accnumber,
      custnumber: this.custnumber,
      process: 'relegation',
      username: 'admin'
    };
    this.ecolService.relegate(body).subscribe(dataresp => {
      //console.log(dataresp)
      window.open(environment.relegationLink);
    }, error => {
      console.log(error)
      alert('error !!!')
    }
    );
  }
}
