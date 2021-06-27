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
  buttonCalculate() {

    var now = moment(new Date()); //todays date
    var end = moment(this.model.lsd); // another date "2015-12-1"
    var duration = moment.duration(now.diff(end));
    var daysin = duration.asDays();
    console.log(daysin)
    const days = Math.round(daysin / 1000 / 60 / 60 / 24);

    var Refundamount = (this.model.policyamount + this.model.arrearsamount) / 365 * (365 - days)

    this.model.refundamount = (Refundamount);
    this.model.daysUtilized = (days);
    this.model.daysUnutilized = (365 - days);
  }

  //generate letter button
  previewbtn() {
    this.ecolService.loader();
    //console.log(this.model)
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

  cancelipf(form) {
    console.log(form)
    const submitdata = {
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
      insuranceemail: this.model.insuranceemail,
      policynumber: this.model.policynumber,
      broker: this.model.broker,
      custname: this.model.custname,
      insurancecompany: this.model.insuranceco,
      username: this.model.issuedby,
      emailaddress: this.model.emailaddress,
      postcode: this.model.postcode
    };

    this.ecolService.submitcancelipf(submitdata).subscribe(resp => {
      console.log(resp);
      this.addactivity()
    }, error => {
      console.log(error);
      swal('Error!', 'Service currently not available', 'error');
    });

  }

  // add activity
  addactivity() {
    const activitydata = {
      collectoraction: "IPF",
      party: null,
      collectornote: "Cancelled IPF with comment: " + this.model.cancellationcomm,
      reason: "Hardship",
      cmdstatus: "Hardcore",
      route: "ACTIVE COLLECTION",
      paymode: "",
      accountnumber:this.model.accnumber,
      custnumber: this.model.custnumber,
      notesrc: "cancel IPF",
      noteimp: "N",
      owner: this.model.issuedby,
      product: "IPF"
    };

    this.ecolService.postactivitylogs(activitydata).subscribe(resp => {
      swal('All Good!', 'IPF Cancellation successfully issued', 'success');
    }, error => {
      console.log(error);
      swal('Error!', 'Service currently not available', 'error');
    });

  }

  ipfdetails(accnumber) {
    this.ecolService.ipfdetails(accnumber).subscribe(resp => {
      console.log(resp)
      if(resp && resp.length>0) {
        this.model = resp[0]
      } else {
        swal('Warning','IPF Details are not available', 'warning')
      }
    }, error => {
      console.log(error);
      swal('Error!', 'Service currently not available', 'error');
    });
  }

}
