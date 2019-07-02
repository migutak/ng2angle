import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-ptps',
  templateUrl: './ptps.component.html',
  styleUrls: ['./ptps.component.scss']
})
export class PtpsComponent implements OnInit {

  accnumber: string;
  custnumber: string;
  accountdetails: any;
  smsMessage: [];
  model: any = {};
  username: string;
  sys: string;
  ptps: any = [];
  account: any = [];
  charactersRemaining = 0;
  iscard: Boolean =  false;

  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService) {
    //
  }

  ngOnInit() {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;


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

    this.getptps();
    if (this.sys === 'cc') {
      this.getcard(this.accnumber);
      this.iscard = true;
    } else if (this.sys === 'watchcc') {
      this.getwatchcard(this.accnumber);
      this.iscard = true;
    } else if (this.sys === 'watch') {
      this.getwatch(this.accnumber);
    } else if (this.sys === 'mcoopcash') {
      this.getmcoopcashaccount(this.accnumber);
    } else {
      this.getaccount(this.accnumber);
    }

  }


  getptps() {
    this.ecolService. getptps(this.custnumber).subscribe(data => {
      this.ptps = data;
    }, error => {
      console.log(error);
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
      this.account = data;
    });
  }


}
