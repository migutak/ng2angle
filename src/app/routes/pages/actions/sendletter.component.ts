import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

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
  file: string;
  itemsDemands: Array<string> = ['Demand1', 'Demand2', 'Prelisting', 'PostlistingSecured', 'PostlistingUnsecured', 'Day90', 'Day40'];
  currentUser: any = JSON.parse(localStorage.getItem('currentUser'));

  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

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
    // console.log('getdemandshistory called ...');
    this.ecolService.getdemandshistory(accnumber).subscribe(data => {
      this.demands = data;
    });
  }

  generate() {
    this.ecolService.loader();
    this.processletter(this.model.demand, this.model.accnumber, this.model.emailaddress);
    this.getdemandshistory(this.accnumber);

    /*
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

  openletter(letter) {
    this.ecolService.loader();
    const body = {
      'demand': letter.demand,
      'showlogo': letter.showlogo,
      'format': letter.format,
      'cust': '1234567',
      'acc': '00000012345678',
      'custname': 'DORIS KAWER',
      'address': 'PO BOX 40 KISII',
      'postcode': '00300',
      'arocode': 'RRO001',
      'branchname': 'KARIOKO',
      'branchcode': '00500',
      'manager': 'ROSE KARAMBU',
      'ccy': 'KES',
      'demand1date': '',
      'guarantors': [
        { 'name': 'Guarantor acccount', 'address': 'Po box 009 - 00200 Nairobi', 'celnumber': '0700' },
        { 'name': 'Guarantor account ', 'address': 'Po box 90 Nakuru', 'celnumber': '0700' }
      ],
      'accounts': [
        { 'accnumber': '0000009999999', 'oustbalance': 90000, 'princarrears': 9000, 'intarrears': 9000, 'totalarrears': 9000 },
        { 'accnumber': '0000009999999', 'oustbalance': 90000, 'princarrears': 9000, 'intarrears': 9000, 'totalarrears': 9000 },
        { 'accnumber': '0000009999999', 'oustbalance': 90000, 'princarrears': 9000, 'intarrears': 9000, 'totalarrears': 9000 }
      ]
    };
    console.log(body);
    // call generate letter api
    this.ecolService.generateLetter(body).subscribe(data => {
      // sucess
      if (data.result === 'success') {
        swal('Good!', data.message, 'success');
        this.downloadDemand(data.message, data.filename);
      } else {
        swal('Error!', 'Error occured during letter generation!', 'error');
      }

      //
    }, error => {
      console.log('error==>', error);
      swal('Error!', 'Error occured during letter generation!', 'error');
    });
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
          demand1date: new Date(),
          guarantors: data[0].guarantors
        };
        const emaildata = {
          name: data[0].client_name,
          email: emailaddress,
          title: demand
        };
        // generate letter
        this.generateletter(letter, emaildata);

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
      if (data.result === 'success') {
        //
        swal('Success!', 'Letter generated!', 'success');
        this.file = data.result.file;
        // save to history
        const bulk = {
          'accnumber': this.model.accnumber,
          'custnumber': this.model.accnumber,
          'address': this.model.addressline1,
          'email': this.model.email,
          'telnumber': this.model.telnumber,
          'filepath': data.message,
          'datesent': new Date(),
          'owner': this.currentUser.username,
          'byemail': this.model.sendemail,
          'byphysical': this.model.sendphysical,
          'bypost': this.model.sendpostal,
          'demand': letter.demand
        };
        console.log('files details to db ', bulk);
        this.demandshistory(bulk);
        // send email
        // add file full path
        emaildata.file = environment.letters_path + data.result.file;
        /*this.ecolService.sendDemandEmail(emaildata).subscribe(response => {
          console.log(response);
          swal('Success!', 'Letter sent on email!', 'success');
        });*/
        // send sms
      } else {
        // error in letter generation
        swal('Error!', 'Error generating to letter!', 'error');
      }
    }, error => {
      console.log(error);
      swal('Error!', 'Error generating to letter!', 'error');
    });
  }  // end generateletter

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
      // console.log(data);
      this.getdemandshistory(this.accnumber);
    });
  }

  guarantorletter(body) {
    this.ecolService.guarantorletters(body).subscribe(data => { });
  }

  sms(body) {
    this.ecolService.guarantorletters(body).subscribe(data => { });
  }

  downloadFile(filepath) {
    this.ecolService.downloadFile(filepath).subscribe(data => {
      saveAs(data, 'filename');
    }, error => {
      console.log(error.error);
      swal('Error!', ' Cannot download  file!', 'error');
    });
  }

  downloadDemand(filepath, filename) {
    this.ecolService.downloadFile(filepath).subscribe(data => {
      saveAs(data, filename);
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
      preConfirm: (email) => { },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
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
