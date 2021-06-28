import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { EcolService } from '../../../services/ecol.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-activityipf',
  templateUrl: './activityipf.component.html',
  styleUrls: ['./activityipf.component.scss']
})
export class ActivityIpfComponent implements OnInit {

  model: any = {};
  username: string;
  diff: any;
  accnumber: string;
  custnumber: string;
  sys: string;

  constructor(
    public settings: SettingsService,
    private ecolService: EcolService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.ecolService.ifLogged();
    this.ecolService.ifclosed();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.spinner.show();
    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.accnumber = queryParams.get('accnumber');
    });

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.custnumber = queryParams.get('custnumber');
    });

    this.sys = this.route.snapshot.queryParamMap.get('sys');
    this.route.queryParamMap.subscribe(queryParams => {
      this.sys = queryParams.get('sys');
    });
    this.ipfdetails(this.accnumber)
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
      this.model.cancellationletter = resp.message;
      window.open(environment.uploadurl + '/download/bpms?filename=' + resp.message);
    }, error => {
      console.log(error);
      swal('Error!', 'Service currently not available', 'error');
    });
  }

  cancelipf(form) {
    console.log(form)
    if(!this.model.cancellationletter) {
      alert('Please preview cancellation letter before you continue')
    }
    this.ecolService.loader();
    const submitdata = {
      accnumber: this.model.ACCNUMBER,
      custnumber: this.model.CUSTNUMBER,
      custname: this.model.CLIENTNAME,
      origdate: this.model.LOANSTARTDATE,
      policyamount: this.model.POLICYAMOUNT,
      oustbalance: this.model.POLICYAMOUNT,
      refundamount: this.model.refundamount,
      daysutilized: this.model.daysutilized,
      daysunutilized: this.model.daysunutilized,
      branchname: this.model.BRANCHNAME,
      insuranceaddress: this.model.INSURANCEADDRESS,
      insuranceemail: this.model.INSURANCEEMAIL,
      policynumber: this.model.POLICYNUMBER,
      broker: this.model.BROKER,
      insuranceco: this.model.INSURANCECO,
      issuedby: this.model.issuedby,
      emailaddress: this.model.EMAILADDRESS,
      postcode: this.model.postcode,
      celnumber: this.model.CELNUMBER,
      telnumber: this.model.TELNUMBER,
      arrearsamout: this.model.TOTALARREARS,
      daysinarr: this.model.DAYSINARR,
      withassetfinance: this.model.waf,
      cancelipf: this.model.cancelipf,
      loanstartdate: this.model.LOANSTARTDATE,
      policystartdate: this.model.POLICYSTARTDATE,
      policyenddate: this.model.POLICYENDDATE,
      status: 'Cancelled',
      cancellationletter: this.model.cancellationletter,
      cancellationcomment: this.model.cancellationcomment,
      cancellationdate: this.model.cancellationdate
    };

    this.ecolService.submitcancelipf(submitdata).subscribe(resp => {
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
      collectornote: "Cancelled IPF with comment: " + this.model.cancellationcomm,
      
      accountnumber: this.model.accnumber,
      custnumber: this.model.custnumber,
      notesrc: "IPF Cancellation",
      noteimp: "N",
      owner: this.model.issuedby,
      product: "IPF"
    };

    this.ecolService.postactivitylogs(activitydata).subscribe(resp => {
      swal({
        title: 'IPF Cancellation successfully issued',
        imageUrl: 'assets/img/user/coop.jpg',
        text: 'Close activity windows?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Close!'
      }).then((result) => {
        if (result.value) {
          // close tab
          window.close();
        } else {
          window.close();
        }
      });
    }, error => {
      console.log(error);
      swal('Error!', 'Service currently not available', 'error');
    });

  }

  ipfdetails(accnumber) {
    this.ecolService.ipfdetails(accnumber).subscribe(resp => {
      if (resp && resp.length > 0) {
        this.model = resp[0]
      } else {
        swal('Warning', 'IPF Details are not available', 'warning')
      }
    }, error => {
      console.log(error);
      swal('Error!', 'Service currently not available', 'error');
    });
  }

}
