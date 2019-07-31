import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-planmemos',
  templateUrl: './planmemos.component.html',
  styleUrls: ['./planmemos.component.scss']
})
export class PlanmemosComponent implements OnInit {

    model: any = {};
    valueCategory;
    valueTag;
    valueReview;
    contents: string;
    letter: {};
    demandSettings: any;
    disable = true;
    selectedLink: string;
    username: string;
    selected_demand: string;

    // tslint:disable-next-line:max-line-length
  public items: Array<string> = ['plan1', 'plan2', 'plan3'];

  constructor(
    private ecolService: EcolService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;
    this.getblobal();
  }

  setradio(e: string): void {
        this.spinner.show();
        this.getLetter(e.toLowerCase());
        this.model.letterid = e.toLowerCase();
        this.selected_demand = e.toUpperCase();
  }

  getLetter(letter) {
    this.ecolService.getLetter(letter).subscribe(dletter => {
      this.model = dletter;
      this.model.bysms = (dletter.bysms).toLowerCase() === 'true' ? true : false;
      this.model.byphysical = (dletter.byphysical).toLowerCase() === 'true' ? true : false;
      this.model.byemail = (dletter.byemail).toLowerCase() === 'true' ? true : false;

      this.model.suspendsms = (dletter.suspendsms).toLowerCase() === 'true' ? true : false;
      this.model.suspendletter = (dletter.suspendletter).toLowerCase() === 'true' ? true : false;
      this.model.suspendautodelivery = (dletter.suspendautodelivery).toLowerCase() === 'true' ? true : false;

      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      alert('error!');
      console.log(error);
    });
  }

  globalSubmit(form) {
    this.ecolService.loader();
    this.ecolService.global(this.model).subscribe(response => {
      swal('Success!', 'Settngs saved!', 'success');
    }, error => {
      console.log(error);
      swal('Error!', 'Error occured!', 'error');
    });
  }

  getblobal() {
    this.ecolService.getglobal().subscribe(response => {
      console.log(response);
     // this.model = response[0];
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
