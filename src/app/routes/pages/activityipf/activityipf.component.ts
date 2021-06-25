import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { EcolService } from '../../../services/ecol.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-activityipf',
  templateUrl: './activityipf.component.html',
  styleUrls: ['./activityipf.component.scss']
})
export class ActivityIpfComponent implements OnInit {

  model: any = {};
  username: string;
  diff: any;

  constructor(
    public settings: SettingsService,
    private ecolService: EcolService,
    ) { }

  ngOnInit() {
  }

  //Calculate refund amount
  buttonCalculate(loanStartDate, policyAmount, arrearsAmount) {
    const start = new Date(loanStartDate)
    const end = new Date()
    this.diff = 0
    const days = Math.round(this.diff / 1000 / 60 / 60 / 24);

    var Refundamount = (policyAmount + arrearsAmount) / 365 * (365 - days)

    this.model.refundamount = (Refundamount);
    this.model.daysUtilized = (days);
    this.model.daysUnutilized = (365 - days);
  }

  //generate letter button
  previewbtn() {
    this.ecolService.loader();
    console.log(this.model)
    const previewrequest = {
      accnumber: this.model.accnumber,
      custnumber: this.model.custnumber,
      origdate: this.model.lsd,
      origbalance: this.model.policyamount,
      oustbalance: this.model.policyamount,
      refundamount: this.model.refundamount,
      daysutilized: this.model.daysutilized,
      daysunutilized: this.model.daysunutilized,
      branchname: this.model.branchname,
      insuranceaddress: this.model.isuranceaadress,
      policynumber: this.model.policynumber,
      broker: this.model.broker,
      custname: this.model.custname,
      insurancecompany: this.model.insuranceco,
      postcode: this.model.postcode
    }

    this.ecolService.previewipf(previewrequest).subscribe(resp => {
      // download
      window.open(environment.uploadurl + '/download/bpms?filename=' + resp.message);
    }, error => {
      console.log(error);
      swal('Error!', 'Service currently not available', 'error');
    });
  }
}
