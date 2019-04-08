import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    model: any = {};
    test: any = {};
    global: any = {};
    valueCategory;
    valueTag;
    valueReview;
    contents: string;
    letter: {};
    demandSettings: any;
    disable = true;
    selectedLink: string;
    username: string;

  constructor(
    private ecolService: EcolService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit() {
    this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });

    this.getblobal();
  }

  setradio(e: string): void   
  {  
        this.spinner.show();
        this.getLetter(e.toLowerCase());
        this.model.letterid = e.toLowerCase();
          
  }  

  getLetter(letter) {
    this.ecolService.getLetter(letter).subscribe(letter => {
      this.model = letter;
      this.spinner.hide();
    }, error => {
      console.log(error);
    });
  }

  globalSubmit(form) {
    this.ecolService.loader();
    this.ecolService.global(this.global).subscribe(response => {
      swal('Success!', 'Settngs saved!', 'success');
    }, error => {
      console.log(error);
      swal('Error!', 'Error occured!', 'error');
    });
  }

  getblobal() {
    this.ecolService.getglobal().subscribe(response => {
      this.global = response[0];
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
    suspendsms: this.model.suspendsms || 'N',
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
