import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { saveAs} from 'file-saver';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sendletter',
  templateUrl: './sendletter.component.html',
  styleUrls: ['./sendletter.component.scss']
})
export class SendLetterComponent implements OnInit {

  accnumber: string;
  accountdetails: any;
  guarantors: [];
  model: any = {};
  filepath: string;
  demands: any;
  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService) {
    //
  }

  ngOnInit() {
    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.accnumber = queryParams.get('accnumber');
      console.log(this.accnumber);
    });

    // get account details
    this.getaccount(this.accnumber);
    this.getdemandshistory(this.accnumber);
  }

  getaccount(accnumber) {
    this.ecolService.getAccount(accnumber).subscribe(data => {
      this.accountdetails = data[0];
      this.guarantors = data[0].guarantors;
      this.model.accnumber = data[0].accnumber;
      this.model.custnumber = data[0].custnumber;
      this.model.addressline1 = data[0].addressline1;
      this.model.postcode = data[0].postcode;
      this.model.emailaddress = data[0].emailaddress;
      this.model.celnumber = data[0].celnumber;
      // if guarantors are available

    });
  }

  getdemandshistory(accnumber) {
    this.ecolService.getdemandshistory(accnumber).subscribe(data => {
      console.log(data);
      this.demands = data;
    });
  }

  generate() {
    this.ecolService.loader();
    const body = {
      cust: this.accountdetails.custnumber,
      acc: this.accountdetails.accnumber,
      custname: this.accountdetails.client_name,
      address: 'Po Box 100 Nairobi',
      postcode: '00100',
      arocode: 'AGRB03',
      branchname: '00000',
      branchcode: 'NYERI BRANCH',
      manager: 'MANAGER',
      ccy: 'KES',
      guarantors:
      [
      {
        name: 'guarantor1'
      },
      {
        name: 'guarantor2'
      }
      ]
    };
   // console.log(body);
//
    this.ecolService.generateLetter(body).subscribe(data => {
      // console.log(data);
      // send email
      if (this.model.sendemail) {
          const emaildata = {
          file: data.file,
          name: this.accountdetails.client_name,
          email: this.model.emailaddress
        };
        this.sendemail(emaildata);
      }
      swal('Successful!', 'Letter generated and saved!', 'success');
      const bulk = {
        'accnumber': this.model.accnumber,
        'custnumber': this.model.accnumber,
        'idnumber': 'string',
        'guarantorsname': 'string',
        'address': this.model.addressline1,
        'email': this.model.email,
        'telnumber': this.model.telnumber,
        'filepath': environment.uploadpath + data.file,
        'datesent': '2019-02-03T17:06:45.989Z',
        'owner': 'miguta',
        'byemail': 'Y',
        'byphysical': 'Y',
        'bypost': 'Y',
        'demand': 'Demand-1'
      };
      this.demandshistory(bulk);
     // this.guarantorletter(bulk);
     // this.sms(bulk);
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred letter generation!', 'error');
    });
  }

  sendemail(emaildata) {
    this.ecolService.sendDemandEmail(emaildata).subscribe(data => {
      if (data.result === 'success') {
        swal('Successful!', 'Letter sent on email!', 'success');
      } else {
        swal('Error!', 'Error occurred during sending email!', 'error');
      }
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during sending email!', 'error');
    });
  }

  demandshistory(body) {
    this.ecolService.demandshistory(body).subscribe(data => {});
  }

  guarantorletter(body) {
    this.ecolService.guarantorletters(body).subscribe(data => {});
  }

  sms(body) {
    this.ecolService.guarantorletters(body).subscribe(data => {});
  }

  downloadFile(filepath) {
    this.ecolService.downloadFile(filepath).subscribe(data => {
     saveAs(data, 'filename');
    }, error => {
      console.log(error.error);
      swal('Error!', ' Cannot download  file!', 'error');
    });
  }
}
