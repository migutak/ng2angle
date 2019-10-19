import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-editptp',
  templateUrl: './editptp.component.html',
  styleUrls: ['./editptp.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EditComponent implements OnInit {

  constructor(
    public settings: SettingsService,
    public toasterService: ToasterService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private ecolService: EcolService) {

  }

  accnumber: string;
  custnumber: string;
  ptpdetails: any;
  ptps: any = [];
  ptp: any = {};
  model: any = {};
  username: string;
  en_ptp: any = {};
  edit = false;
  isptptosave = false;
  id: any;

  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      positionClass: 'toast-top-right',
      animation: 'fade'
    });

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

    this.id = this.route.snapshot.queryParamMap.get('id');
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get('id');
    });
  }

  getthisptp() {
    this.ecolService.getthisptp(this.id).subscribe(data => {
      this.ptpdetails = data[0];
      // hide spinner
      this.spinner.hide();
    });
  }

  ammendfunc(form) {
    console.log(form);
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;


  }

  cancel() {
    // close windows
    swal({
      title: 'Multiple PTP',
      imageUrl: 'assets/img/user/coop.jpg',
      text: 'Sure you want to cancel?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Close!'
    }).then((result) => {
      if (result.value) {
        // close tab
        window.close();
      } else {
        // reset
        return;
      }
    });
  }

}
