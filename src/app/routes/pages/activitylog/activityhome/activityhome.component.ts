import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import { environment } from '../../../../../environments/environment';
import swal from 'sweetalert2';

const URL = environment.valor;


@Component({
  selector: 'app-activityhome',
  templateUrl: './activityhome.component.html',
  styleUrls: ['./activityhome.component.scss']
})
export class ActivityHomeComponent implements OnInit {

  accnumber: string;
  custnumber: string;
  nationid: any;
  username: string;
  model: any = {};
  date = new Date();
  account: any;
  sys: string;
  loader = true;
  cards: any = [];
  ptps: any = [];
  otheraccs: any = [];
  collaterals: any = [];
  directors: any = [];
  accwithid: any = [];
  withotheraccs: boolean = true;
  withcreditcards: boolean = true;
  withdirectors: boolean = true;
  withcollateral: boolean = true;
  withsameid: boolean = true;

  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService) {
  }

  ngOnInit() {
    // check if logged!
    this.ecolService.ifLogged();
    this.ecolService.ifclosed();

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

    this.nationid = this.route.snapshot.queryParamMap.get('nationid');
    this.route.queryParamMap.subscribe(queryParams => {
      this.nationid = queryParams.get('nationid');
    });

    this.sys = this.route.snapshot.queryParamMap.get('sys');
    this.route.queryParamMap.subscribe(queryParams => {
      this.sys = queryParams.get('sys');
    });


    // get account details
    if (this.sys === 'cc') {
      this.getcard(this.accnumber);
    } else if (this.sys === 'watchcc') {
      this.getwatchcard(this.accnumber);
    } else if (this.sys === 'watch') {
      this.getwatch(this.accnumber);
    } else if (this.sys === 'mcoopcash') {
      this.getmcoop(this.accnumber);
    } else {
      this.getaccount(this.accnumber);
    }

  }

  getaccount(accnumber) {
    this.ecolService.getAccount(accnumber).subscribe(data => {
      this.account = data[0];
      this.loader = false;
    });
  }

  getwatch(accnumber) {
    this.ecolService.getwatch(accnumber).subscribe(data => {
      this.account = data;
      this.loader = false;
    });
  }

  getcard(cardacct) {
    this.ecolService.getcardAccount(cardacct).subscribe(data => {
      this.account = data[0];
      this.loader = false;
    });
  }

  getwatchcard(cardacct) {
    this.ecolService.getWatchcardAccount(cardacct).subscribe(data => {
      this.account = data[0];
      this.loader = false;
    });
  }

  getmcoop(loanaccnumber) {
    this.ecolService.getmcoopcashAccount(loanaccnumber).subscribe(data => {
      this.account = data[0];
      this.loader = false;
    });
  }

  beforeChange(active) {
    console.log(active.nextId);
    const tab: string = active.nextId;
    switch (tab) {
      case 'ngb-tab-0': {
        // console.log("accountinfo");
        break;
      }
      case 'ngb-tab-1': {
        // data loaded already on this.account
        break;
      }
      case 'ngb-tab-2': {
        this.loadother(this.custnumber);
        break;
      }
      case 'ngb-tab-3': {
        this.loadcollateral(this.accnumber);
        break;
      }
      case 'ngb-tab-4': {
        this.loaddirectors(this.accnumber);
        break;
      }
      case 'ngb-tab-5': {
        this.loadcards(this.nationid);
        break;
      }
      case 'ngb-tab-6': {
        this.loadaccwithid(this.nationid);
        break;
      }
      default: {
        console.log('Invalid choice');
        break;
      }
    }
  }

  loadother(custnumber) {
    this.loader = true;
    this.ecolService.otheraccs(custnumber).subscribe(data => {
      if(data && data.data.length>0){
        this.withotheraccs = false;
      };
      this.otheraccs = data.data;
      this.loader = false;
    }, error => {
      console.log('loadother error ==>', error);
      swal('Error','Unable to retrieve otheraccs','error');
      this.loader = false;
    });
  }

  loadcollateral(accnumber) {
    this.loader = true;
    this.ecolService.collaterals(accnumber).subscribe(data => {
      if(data && data.length){
        this.withcollateral = false;
      }
      this.collaterals = data.data;
      this.loader = false;
    }, error => {
      console.log('collaterals error ==>', error);
      swal('Error','Unable to retrieve collaterals','error');
      this.loader = false;
    });
  }

  loaddirectors(accnumber) {
    this.loader = true;
    this.ecolService.directors(accnumber).subscribe(data => {
      if(data && data.length){
        this.withdirectors = false;
      }
      this.directors = data;
      this.loader = false;
    }, error => {
      console.log('directors error ==>', error);
      swal('Error','Unable to retrieve directors','error');
      this.loader = false;
    });
  }

  loadaccwithid(nationid) {
    this.loader = true;
    this.ecolService.accwithid(nationid).subscribe(data => {
      if(data && data.length){
        this.withsameid = false;
      }
      this.accwithid = data;
      this.loader = false;
    }, error => {
      console.log('loadaccwithid error ==>', error);
      swal('Error','Unable to retrieve accwithid','error');
      this.loader = false;
    });
  }

  loadptps(accnumber) {
    this.loader = true;
    this.ecolService.ptps(accnumber).subscribe(data => {
      this.ptps = data;
      this.loader = false;
    }, error => {
      console.log('loadptps error ==>', error);
      swal('Error','Unable to retrieve ptps','error');
      this.loader = false;
    });
  }

  loadcards(nationid) {
    this.loader = true;
    this.ecolService.getcardwithid(nationid).subscribe(data => {
      if(data && data.length){
        this.withcreditcards = false;
      }
      this.cards = data;
      this.loader = false;
    }, error => {
      console.log('loadcards error ==>', error);
      alert('unable to retrieve cards');
      this.loader = false;
    });
  }
}
