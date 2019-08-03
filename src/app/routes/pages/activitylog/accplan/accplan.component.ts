import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-accplan',
  templateUrl: './accplan.component.html',
  styleUrls: ['./accplan.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class AccPlanComponent implements OnInit {

  custnumber;
  accnumber;
  username;
  currentplan: any = [];
  allplans: any = [];
  model: any = {};
  update = false;

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
        // console.log(resp);
        // tbl_s_account_plans
        this.ecolService.s_account_plans(this.accnumber, planid.value).subscribe(data => {
          console.log('tbl_s_account_plans', data);
          if (data && data.length > 0) {
            this.update = true;
            for (let i = 0; i < data.length; i++) {
              const body = {
                id: resp[i].id,
                accnumber: this.accnumber,
                planid: planid.value,
                actionid: data[i].actionid,
                actiontitle: data[i].actiontitle,
                completed: data[i].completed,
                updateby: data[i].updateby,
                datecompleted: new Date(data[i].datecompleted)
              };
              this.currentplan.push(body);
            }
          } else {
            for (let i = 0; i < resp.length; i++) {
              const body = {
                accnumber: this.accnumber,
                planid: planid.value,
                actionid: resp[i].actionid,
                actiontitle: resp[i].actiontitle,
                completed: false,
                updateby: '',
                datecompleted: ''
              };
              this.currentplan.push(body);
            }
          }
        }, error => {
          console.log(error);
        });

        // console.log(this.currentplan);
      }, error => {
        console.log(error);
      });
    } else {
      this.currentplan = [];
    }
  }

  saveplan() {
    swal({
      title: 'Are you sure?',
      text: 'You want to save plan!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save!'
    }).then((result) => {
      if (result.value) {
        for (let i = 0; i < this.currentplan.length; i++) {
          this.currentplan[i].datecompleted = moment(this.currentplan[i].datecompleted).format('YYYY-MM-DD');
          this.currentplan[i].updateby = this.username;
        }
        if (!this.update) {
          this.ecolService.saveaccountplan(this.currentplan).subscribe(data => {
            console.log(data);
            alert('plan saved');
          }, error => {
            console.log(error);
          });
        } else {
          console.log(this.currentplan);
          this.ecolService.putaccountplan(this.currentplan).subscribe(data => {
            console.log(data);
            alert('plan saved');
          }, error => {
            console.log(error);
          });
        }
      }
    });

  }

}
