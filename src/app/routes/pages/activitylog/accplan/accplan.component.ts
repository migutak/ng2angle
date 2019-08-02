import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-accplan',
  templateUrl: './accplan.component.html',
  styleUrls: ['./accplan.component.scss']
})
export class AccPlanComponent implements OnInit {

  custnumber;
  accnumber;
  username;
  currentplan: any = [];
  allplans: any = [];
  model: any = {};
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

    this.getallplans();
  }

  openaccplan() {
    // tslint:disable-next-line:max-line-length
    window.open(environment.accplanlink + '/?accnumber=' + this.accnumber + '&custnumber=' + this.custnumber + '&username=' + this.username + '&nationid=00', '_blank');
  }

  getallplans() {
    this.ecolService.tbl_s_plans().subscribe(data => {
      this.allplans = data;
    });
  }

  changeAction(planid) {
    // build planactions

    if (planid.value) {
      this.currentplan = [];
      // retrieve plan actions
      this.ecolService.s_plan_actions(planid.value).subscribe(resp => {
        console.log(resp);
        for (let i = 0; i < resp.length; i++) {
          const body = {
            actiontitle: resp[i].actiontitle,
            completed: true,
            owner: this.username
          };
          this.currentplan.push(body);
        }
        console.log(this.currentplan);
      }, error => {
        console.log(error);
      });
    } else {
      this.currentplan = [];
    }
  }

}
