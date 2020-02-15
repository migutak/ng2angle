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
  data: any = {};
  account: any = [];
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

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.custnumber = queryParams.get('custnumber');
    });

    this.sys = this.route.snapshot.queryParamMap.get('sys');
    this.route.queryParamMap.subscribe(queryParams => {
      this.sys = queryParams.get('sys');
    }); 
    

    // update writeoffstory
    this.getwriteoffstory(this.accnumber);

  }

  getwriteoffstory(accnumber) {
    this.ecolService.searchwoffstory(accnumber).subscribe(data => {
      if(data && data.length>0){
        data.writeoffstoryMessage = data[0].woffstory;
      }
    });
  }

  updatefunc(form) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    this.ecolService.loader();
    const body = {
      custnumber: this.custnumber,
      accnumber: this.accnumber,
      owner: this.username,
      woffstory: form.value.smsMessage,
      lastupdate: this.currentDate
    };
    this.ecolService.woffstory(body).subscribe(data => {
      swal('Success!', 'Writeoff story updated', 'success');
      this.addActivity(body.woffstory);
    }, error => {
      console.log(error);
      swal('Error!', 'Service currently not available', 'error');
    });
  }

  addActivity(msg) {
    const body = {
      collectoraction: 'REVW',
      party: '',
      ptpamount: '',
      ptp: '',
      ptpdate: this.currentDate,
      collectornote: msg,
      reviewdate: moment(this.account.reviewdate).format('DD-MMM-YYYY'),
      reason: this.account.excuse,
      cmdstatus: this.account.cmdstatus,
      route: this.account.routetostate,
      paymode: '',
      accountnumber: this.accnumber,
      custnumber: this.custnumber,
      arramount: this.account.totalarrears || 0,
      oustamount: this.account.oustbalance || 0,
      notesrc: 'added a writeoff story',
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
      swal('Error!', 'activitylog service is currently not available', 'error');
    });
  }

  sendNotesData(custnumber) {
    this.ecolService.totalnotes(custnumber).subscribe(data => {
      this.dataService.pustNotesData(data[0].TOTAL);
    });
  }

}
