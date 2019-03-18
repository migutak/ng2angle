import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import { environment } from '../../../../../environments/environment';

const URL = environment.valor;

@Component({
  selector: 'app-activityhome',
  templateUrl: './activityhome.component.html',
  styleUrls: ['./activityhome.component.scss']
})
export class ActivityHomeComponent implements OnInit {

  accnumber: string;
  custnumber: string;
  accountdetails: any;
  username: string;
  model: any = {};
  date = new Date ();
  account: any;
  step1 = true;
    step2 = false;
    step3 = false;
    step4 = false;
    step5 = false;
    step6 = false;

  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService) {
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

    // get account details
    this.getaccount(this.accnumber);

  }

  getaccount(accnumber) {
    this.ecolService.getAccount(accnumber).subscribe(data => {
      this.account = data[0];
    });
  }

  fetchPtps(active) {
    console.log('clicked==>', active)
  }

  
}
