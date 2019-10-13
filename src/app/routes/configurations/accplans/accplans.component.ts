import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgOption } from '@ng-select/ng-select';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-accplans',
  templateUrl: './accplans.component.html',
  styleUrls: ['./accplans.component.scss']
})
export class AccplansComponent implements OnInit {

  model: any = {};
  planactions: any = [];
  actions: any = [];
  selectedLink: string;
  username: string;
  selected_plan: any;
  edit = false;

  public items: Array<string> = [];

  constructor(
    private ecolService: EcolService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
    this.getallplans();
    this.getallactions();
  }

  setradio(e): void {
    this.spinner.show();
    this.selected_plan = e.plantitle;
    this.getplanactions(e.planid);
    this.model.plan = e.planid;
  }

  getplanactions(planid) {
    this.ecolService.getplanactions(planid).subscribe(resp => {
      this.planactions = resp;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      alert('error!');
      console.log(error);
    });
  }

  getallplans() {
    this.ecolService.all_s_plans().subscribe(response => {
      this.items = response;
    }, error => {
      console.log(error);
    });
  }

  getid() {
    const possible = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lengthOfCode = 7;
    this.model.planid = this.makeRandom(lengthOfCode, possible);
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  getallactions() {
    this.ecolService.s_actions().subscribe(response => {
      this.actions = response;
    }, error => {
      console.log(error);
    });
  }

  newplan(form) {
    // Loading indictor
    this.spinner.show();
    this.getid();
    //
    const body = {
      planid: this.model.planid,
      plantitle: form.plantitle,
      owner: this.username
    };

    // check letter duplicate
    swal({
      title: 'Are you sure?',
      text: 'You want to add!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add!'
    }).then((result) => {
      if (result.value) {
        this.ecolService.loader();
        this.ecolService.post_s_plan(body).subscribe(Response => {
          swal('Successful!', 'plan added!', 'success');
          this.getallplans();
          this.spinner.hide();
        }, error => {
          console.log(error);
          this.spinner.hide();
          swal('Error!', 'Error adding plan!', 'error');
        });
      }
    });
  }

  addactionSubmit(form) {
    swal({
      title: 'Are you sure?',
      text: 'You want to add!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add!'
    }).then((result) => {
      if (result.value) {
        // get action
        this.ecolService.getanaction(form.planaction).subscribe(data => {
          // console.log(data);
          const body = {
            actionid: form.planaction,
            planid: form.plan,
            updateby: this.username,
            actiontitle: data.actiontitle
          };

          // post to tbl_s_plan_actions
          this.ecolService.post_s_plan_actions(body).subscribe(resp => {
            // console.log(resp);
            // refresh plan action lists
            this.getplanactions(body.planid);
            swal(
              'Good!',
              'Plan action added!',
              'success'
            );
          }, error => {
            alert('');
            swal(
              'Ooops!',
              ':1 error saving plan action',
              'error'
            );
          });

        }, error => {
          console.log(error);
          alert('error saving plan action');
        });
      }
    });

  }

  deleteaction(form) {
    swal({
      title: 'Are you sure?',
      text: 'You want to DELETE!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.value) {
        // check if logged in
        // console.log(form);
        this.ecolService.ifLogged();
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        // save to db
        this.ecolService.delete_s_plan_actions(form.id).subscribe(response => {
          // console.log(response); {count: 1}
          swal(
            'Good!',
            'Plan action deleted!',
            'success'
          );
          this.getplanactions(form.plan);
        }, error => {
          console.log(error);
          swal(
            'Ooops!',
            'Plan action Not deleted!',
            'error'
          );
        });
      }
    });
  }

  editaction(form) {
    // check if logged in
    // console.log(form);
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.model.plan = form.planid;
    this.model.actionid = form.actionid;
    this.model.planaction = form.actiontitle;
    this.model.id = form.id;
    //
    this.edit = true;
  }

  cancel() {
    this.edit = false;
    // this.model = {};
    // this.getid();
  }
}
