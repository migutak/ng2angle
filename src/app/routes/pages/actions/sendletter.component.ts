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
  itemsDemands: Array<string> = ['Demand1', 'Demand2', 'Prelisting', 'PostlistingSecured', 'PostlistingUnsecured', 'Day90', 'Day40'];
  currentUser: any = JSON.parse(localStorage.getItem('currentUser'));

  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService) {
    //
  }

  ngOnInit() {
    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.accnumber = queryParams.get('accnumber');
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
      this.demands = data;
    });
  }

  generate() {
    this.ecolService.loader();
    this.processletter(this.model.demand, this.model.accnumber, this.model.emailaddress);
    this.getdemandshistory(this.accnumber);

    /*const body = {
      demand: this.accountdetails.demand,
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
    this.ecolService.generateLetter(body).subscribe(data => {
      console.log('file generated==>', data);
      // send email
      if (this.model.sendemail) {
          const emaildata = {
          file: environment.letters_path + data.result.file,
          name: this.accountdetails.client_name,
          email: this.model.emailaddress
        };
        this.sendemail(emaildata);
      }
      swal('Successful!', 'Letter generated and saved!', 'success');

    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred letter generation!', 'error');
    });*/
  }

  processletter(demand, accnumber, emailaddress) {
    this.ecolService.getAccount(accnumber).subscribe(data => {
      if (data.length > 0) {
        const letter = {
          demand: demand.toLowerCase(),
          cust: data[0].custnumber,
          acc: data[0].accnumber,
          custname: data[0].client_name,
          address: this.model.addressline1,
          postcode: this.model.postcode,
          arocode: data[0].arocode,
          branchname: data[0].branchcode,
          branchcode: data[0].branchcode,
          manager: data[0].manager,
          ccy: data[0].currency,
          demand1date : new Date(),
          guarantors: data[0].guarantors
        };
        const emaildata = {
          name: data[0].client_name,
          email: emailaddress,
          title: demand
        };
      // generate letter
      this.generateletter(letter, emaildata);
      const bulk = {
        'accnumber': this.model.accnumber,
        'custnumber': this.model.accnumber,
        'address': this.model.addressline1,
        'email': this.model.email,
        'telnumber': this.model.telnumber,
        'filepath': environment.letters_path + data.result.file,
        'datesent': new Date(),
        'owner': this.currentUser.username,
        'byemail': this.model.sendemail,
        'byphysical': this.model.sendphysical,
        'bypost': this.model.sendpostal,
        'demand': demand
      };
      this.demandshistory(bulk);
      } else {
        swal('None!', accnumber + ' not found!', 'warning');
      }
    }, error => {
      console.log(error);
      swal('Error!', 'exception occured!', 'error');
    });
  }

  generateletter(letter, emaildata: any) {
    this.ecolService.generateLetter(letter).subscribe(data => {
      swal('Success!', 'Letter generated!', 'success');
      // send email
      // add file full path
      emaildata.file = environment.letters_path + data.result.file;
      this.ecolService.sendDemandEmail(emaildata).subscribe(response => {
        console.log(response);
        swal('Success!', 'Letter sent on email!', 'success');
      });
      // send sms
    }, error => {
      console.log(error);
      swal('Error!', 'Error sending to email!', 'error');
    });
  }

  /*sendemail(emaildata) {
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
  }*/

  demandshistory(body) {
    this.ecolService.demandshistory(body).subscribe(data => {
      console.log(data);
    });
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
