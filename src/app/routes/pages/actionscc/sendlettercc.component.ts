import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { saveAs} from 'file-saver';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sendlettercc',
  templateUrl: './sendlettercc.component.html',
  styleUrls: ['./sendlettercc.component.scss']
})
export class SendLetterccComponent implements OnInit {

  cardacct: string;
  accountdetails: any;
  guarantors: [];
  model: any = {};
  filepath: string;
  demands: any;
  file: string;
  itemsDemands: Array<string> = ['overduecc', 'prelistingcc', 'suspension'];
  currentUser: any = JSON.parse(localStorage.getItem('currentUser'));


  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService) {
    //
  }

  ngOnInit() {
    this.cardacct = this.route.snapshot.queryParamMap.get('cardacct');
    this.route.queryParamMap.subscribe(queryParams => {
      this.cardacct = queryParams.get('cardacct');
    });

    // get account details
    this.getcardaccount(this.cardacct);
    this.getdemandshistory(this.cardacct);
  }

  openletter(demand) {
    window.open('http://ecollecttst.co-opbank.co.ke:8002/' + demand +
      '?cardacct=00&outbalance=00&exp_pmt=00&city=00&rpcode=00&address=00&cardname=00', '_blank');
  }

  getcardaccount(cardacct) {
    this.ecolService.getcardAccount(cardacct).subscribe(data => {
      console.log('this is getcardAccount==>', data);
      this.accountdetails = data[0];
      this.guarantors = data[0].guarantors;
      this.model.accnumber = data[0].cardacct;
      this.model.custnumber = data[0].cardnumber;
      this.model.addressline1 = data[0].address + ' ' + data[0].city;
      this.model.postcode = data[0].rpcode;
      this.model.emailaddress = data[0].email;
      this.model.celnumber = data[0].mobile;
      // if guarantors are available

    });
  }

  getdemandshistory(cardacct) {
    this.ecolService.getdemandshistory(cardacct).subscribe(data => {
      this.demands = data;
    });
  }

  generate() {
    this.ecolService.loader();
    this.processletter(this.model.demand, this.model.accnumber, this.model.emailaddress);
    this.getdemandshistory(this.cardacct);
  }

  processletter(demand, cardacct, emailaddress) {
    this.ecolService.getcardAccount(cardacct).subscribe(data => {
      if (data.length > 0) {
        const letter = {
          demand: demand.toLowerCase(),
          card_acct: data[0].cardacct,
          cardname: data[0].cardname,
          address: this.model.addressline1,
          postcode: this.model.postcode,
          exp_pmnt: data[0].exppmnt,
          out_balance: data[0].exppmnt,
          manager: 'ROSE KARAMBU'
        };
        const emaildata = {
          name: data[0].cardname,
          email: emailaddress,
          title: demand
        };
      // generate letter
      this.generateletter(letter, emaildata);

      } else {
        swal('None!', cardacct + ' not found!', 'warning');
      }
    }, error => {
      console.log(error);
      swal('Error!', 'exception occured!', 'error');
    });
  }

  generateletter(letter, emaildata: any) {
    this.ecolService.generateLetterccoverdue(letter).subscribe(data => {
      // console.log('generateLetterccoverdue', data);
      this.file = data.result.file;
      swal('Success!', 'Letter generated!', 'success');
      // save to history
      const bulk = {
        'accnumber': this.model.accnumber,
        'custnumber': this.model.accnumber,
        'address': this.model.addressline1,
        'email': this.model.email,
        'telnumber': this.model.telnumber,
        'filepath': environment.letters_path + this.file,
        'datesent': new Date(),
        'owner': this.currentUser.username,
        'byemail': this.model.emailaddress,
        'byphysical': this.model.sendphysical,
        'bypost': this.model.sendpostal,
        'demand': letter.demand
      };
      this.demandshistory(bulk);
      // send email
      // add file full path
      emaildata.file = environment.letters_path + data.result.file;
      /*this.ecolService.sendDemandEmail(emaildata).subscribe(response => {
        console.log(response);
        swal('Success!', 'Letter sent on email!', 'success');
      });*/
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
    console.log('demandshistory body', body);
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
     saveAs(data, 'Credit_Card_Demand_Letter');
    }, error => {
      console.log(error.error);
      swal('Error!', ' Cannot download  file!', 'error');
    });
  }

  resend(filepath) {
    swal({
      title: 'confirm email address',
      input: 'text',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Send Email',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {},
      allowOutsideClick: () => !swal.isLoading()
    }).then ((result) => {
      if (result.value) {
        swal(
          'Sent!',
          'Email has been sent',
          'success'
        );
      }
    });
  }
}
