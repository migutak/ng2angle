import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../../environments/environment';

const URL = environment.valor;

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {

  accnumber: string;
  custnumber: string;
  accountdetails: any;
  smsMessage: [];
  model: any = {};
  username: string;

  sms: any = [];
  dataSms: any = {};
  account: any = [];

  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
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

    this.getsms();
    this.getaccount(this.accnumber);
  }

  getsms() {
    this.ecolService.getsms(this.custnumber).subscribe(data => {
      this.sms = data;
    }, error => {
      console.log(error);
    });
  }

  gettemplate(template) {
    if (template === 'LOAN') {
      // tslint:disable-next-line:max-line-length
      this.dataSms.smsMessage = 'Dear Customer, Your loan payment is late by ' + this.account.daysinarr + ' days. Amount in arrears is Kes. '
        + this.account.totalarrears + '. Please pay within seven days. ';
      this.dataSms.smsCallback = ' Enquire details on 0711049000/020-3276000.';
    } else if (template === 'LOANOD') {
      this.dataSms.smsMessage = 'Dear Customer, Your account is overdawn by  Kes. '
          + this.account.totalarrears + '. Please regularize within seven days.';
      this.dataSms.smsCallback = ' Enquire details on 0711049000/020-3276000.';
    } else if (template === 'CC') {
      this.dataSms.smsMessage = 'Dear Customer, Your loan payment is late by ' + this.account.daysinarr +
       ' days. Amount in arrears is Kes. ' + this.account.totalarrears + '. Please pay within seven days. ';
      this.dataSms.smsCallback = ' Enquire details on 0711049000/020-3276000.';
    }
}

changetemplate($event) {
// console.log('this is  the event ==>', $event.target.value);
this.gettemplate($event.target.value);
}

getaccount(account) {
this.ecolService.getaccount(account).subscribe(data => {
  // console.log('getaccount==>', data);
  this.account = data;
  this.dataSms.smsNumber = data.celnumber;
  // this.spinner.hide();
});
}

sendsmsfunc (form) {
  this.ecolService.loader();
  const body = {
    custnumber: this.custnumber,
    owner: this.username,
    message: form.value.smsMessage + form.value.smsCallback,
    arrears: this.account.totalarrears,
    datesent: new Date(),
    telnumber: form.value.smsNumber
  };
  this.ecolService.postsms(body).subscribe(data => {
    // console.log(data);
    swal('Success!', 'sms sent', 'success');
    this.dataSms = {};
    this.getsms();
  }, error => {
    console.log(error);
    swal('Error!', 'sms service currently not available', 'error');
  });
}

}