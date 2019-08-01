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

  getallactions() {
    this.ecolService.s_actions().subscribe(response => {
     this.actions = response;
    }, error => {
      console.log(error);
    });
  }

  onSubmit(form) {
    // Loading indictor
    this.spinner.show();
    //
   const body = {
    letterid: this.model.letterid,
    smstemplate: this.model.smstemplate,
    suspendletter: this.model.suspendletter,
    templatepath: this.model.templatepath || '0',
    autodelivered: this.model.autodelivered,
    suspendautodelivery: this.model.suspendautodelivery,
    suspendsms: this.model.suspendsms,
    datelastupdated: new Date(),
    updatedby: this.username,
    byemail: this.model.byemail,
    bysms: this.model.bysms,
    byphysical: this.model.byphysical
    };

    // check letter duplicate
    swal({
      title: 'Are you sure?',
      text: 'You want to update!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update!'
    }).then((result) => {
      if (result.value) {
        this.ecolService.loader();
        this.ecolService.putLetter(body).subscribe(Response => {
          swal('Successful!', 'letter updated!', 'success');
          this.spinner.hide();
        }, error => {
          console.log(error);
          this.spinner.hide();
          swal('Error!', 'Error updating letter!', 'error');
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
