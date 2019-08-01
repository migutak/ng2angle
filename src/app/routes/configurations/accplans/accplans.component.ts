import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgOption } from '@ng-select/ng-select';

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

  public items: Array<string> = [];

  constructor(
    private ecolService: EcolService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;
    this.getallplans();
    this.getallactions();
  }

  setradio(e): void {
    this.spinner.show();
    this.selected_plan = e.plantitle;
    this.getplanactions(e.planid);
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
    console.log(body);

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

  delete() {
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
        //
      }
    });
  }
}
