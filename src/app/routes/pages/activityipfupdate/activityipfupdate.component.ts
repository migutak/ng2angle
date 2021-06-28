import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import swal from 'sweetalert2';
import { EcolService } from '../../../services/ecol.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-activityipfupdate',
  templateUrl: './activityipfupdate.component.html',
  styleUrls: ['./activityipfupdate.component.scss']
})
export class ActivityIpfUpdateComponent implements OnInit {

  model: any = {};
  username: string;
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

    this.ecolService.previewipfreinstatement(previewrequest).subscribe(resp => {
      this.model.cancellationletter = resp.message;
      window.open(environment.uploadurl + '/download/bpms?filename=' + resp.message);
    }, error => {
      console.log(error);
      swal('Error!', 'Service currently not available', 'error');
    });
  }

  cancelupdateipf(form) {
    console.log(form)
    this.ecolService.loader();
    const submitdata = {
      id: this.model.id,
      paymentamount: this.model.paymentamount,
      paymentdate: this.model.paymentdate,
      status: this.model.status,
      reinstatementletter: this.model.reinstatementletter,
      reinstatementdate: this.model.reinstatementdate,
      writeoffamount: this.model.writeoffamount
    };

    this.ecolService.cancelipfupdate(submitdata).subscribe(resp => {
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
      collectornote: "Status: " + this.model.status,
      accountnumber: this.model.accnumber,
      custnumber: this.model.custnumber,
      notesrc: "IPF Cancellation update",
      noteimp: "N",
      owner: this.model.issuedby,
      product: "IPF"
    };

    this.ecolService.postactivitylogs(activitydata).subscribe(resp => {
      swal({
        title: 'IPF Cancellation update successfully',
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
      console.log(resp)
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
