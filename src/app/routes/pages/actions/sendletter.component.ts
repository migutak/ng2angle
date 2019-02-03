import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';

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
  }

  getaccount(accnumber) {
    this.ecolService.getAccount(accnumber).subscribe(data => {
      console.log(data);
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

  generate() {
    console.log(this.model);
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
    console.log(body);
//
    this.ecolService.generateLetter(body).subscribe(data => {
      // console.log(data);
      // send email
      if (this.model.sendemail) {
          const emaildata = {
          file: data.file,
          name: this.accountdetails.client_name
        };
        this.sendemail(emaildata);
      }
    });
  }

  sendemail(emaildata) {
    this.ecolService.sendDemandEmail(emaildata).subscribe(data => {
      console.log(data);
      alert(' letter generated and email sent');
    });
  }

}
