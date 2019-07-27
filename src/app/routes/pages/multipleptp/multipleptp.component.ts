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
  selector: 'app-multipleptp',
  templateUrl: './multipleptp.component.html',
  styleUrls: ['./multipleptp.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class MultipleptpComponent implements OnInit {

  constructor(
    public settings: SettingsService,
    public toasterService: ToasterService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private ecolService: EcolService) {

  }

  accnumber: string;
  custnumber: string;
  accountdetails: any;
  ptps: any = [];
  ptp: any = {};
  model: any = {};
  username: string;
  en_ptp: any = {};
  edit = false;

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
  }

  getaccount(accnumber) {
    this.ecolService.getAccount(accnumber).subscribe(data => {
      this.accountdetails = data[0];
      // hide spinner
      this.spinner.hide();
    });
  }

  ptpfunc(form) {
    const ptpamount = form.value.ptpamount;
    const ptpdate = (moment(form.value.ptpdate).format('DD-MM-YYYY')).toUpperCase();
    const owner = this.username;
    const accnumber = this.accnumber;

    this.ptps.push({ptpdate: ptpdate, ptpamount: ptpamount, owner: owner, accnumber: accnumber});
    this.ptp = {};
  }

  editptp(form) {
    console.log(form);
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    this.ptp.ptpamount = form.ptpamount;
    this.ptp.ptpdate = form.ptpdate;
    //
    this.edit = true;
  }

  cancel() {
    this.edit = false;
    this.ptp = {};
  }

  deleteptp(form) {
    const index: number = this.ptps.indexOf(form);
    if (index !== -1) {
        this.ptps.splice(index, 1);
    }
  }

}
