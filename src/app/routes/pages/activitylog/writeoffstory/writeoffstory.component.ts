import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import { DataService } from '../../../../services/data.service';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-writeoffstory',
  templateUrl: './writeoffstory.component.html',
  styleUrls: ['./writeoffstory.component.scss']
})
export class WriteoffstoryComponent implements OnInit {

  accnumber: string;
  custnumber: string;
  accountdetails: any;
  smsMessage: [];
  model: any = {};
  username: string;
  sys: string;
  sms: any = [];
  teles: any = [];
  dataSms: any = {};
  account: any = [];
  charactersRemaining = 0;
  iscard: Boolean = false;
  p = 1;

  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService,
    private dataService: DataService) {
    //
  }

  currentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return day + '-' + month + '-' + year;
  }

  ngOnInit() {
    // check if logged!
    this.ecolService.ifLogged();
    this.ecolService.ifclosed();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;


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

    

  }



  
  getaccount(account) {
    this.ecolService.getaccount(account).subscribe(data => {
      this.account = data;
    });
  }

  getmcoopcashaccount(loanaccaccount) {
    this.ecolService.getmcoopcashAccount(loanaccaccount).subscribe(data => {
      this.account = data;
    });
  }

  getcard(cardacct) {
    this.ecolService.getcardAccount(cardacct).subscribe(data => {
      this.account = data[0];
    });
  }

  getwatchcard(cardacct) {
    this.ecolService.getWatchcardAccount(cardacct).subscribe(data => {
      this.account = data[0];
    });
  }

  getwatch(accnumber) {
    this.ecolService.getwatch(accnumber).subscribe(data => {
      console.log(data);
      this.account = data;
    });
  }

  sendsmsfunc(form) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    this.ecolService.loader();
    const body = {
      custnumber: this.custnumber,
      accnumber: this.accnumber,
      owner: this.username,
      message: form.value.smsMessage + form.value.smsCallback,
      arrears: this.account.totalarrears,
      datesent: new Date(),
      telnumber: form.value.smsNumber
    };
    this.ecolService.postsms(body).subscribe(data => {
      swal('Success!', 'sms sent', 'success');
      form.value.message = '';
      this.addActivity(body.message);
    }, error => {
      console.log(error);
      swal('Error!', 'sms service currently not available', 'error');
    });
  }

  addActivity(sms) {
    const body = {
      collectoraction: 'SMS',
      party: '',
      ptpamount: '',
      ptp: '',
      ptpdate: this.currentDate,
      collectornote: sms,
      reviewdate: moment(this.account.reviewdate).format('DD-MMM-YYYY'),
      reason: this.account.excuse,
      cmdstatus: this.account.cmdstatus,
      route: this.account.routetostate,
      paymode: '',
      accountnumber: this.accnumber,
      custnumber: this.custnumber,
      arramount: this.account.totalarrears || 0,
      oustamount: this.account.oustbalance || 0,
      notesrc: 'sent sms',
      noteimp: 'N',
      rfdother: '',
      owner: this.username,
      product: this.account.section
    };
    // add action
    this.ecolService.postactivitylogs(body).subscribe(data => {
      this.sendNotesData(this.custnumber);
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

}
