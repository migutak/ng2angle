import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../environments/environment';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

const URL = environment.valor;

@Component({
  selector: 'app-sendletter',
  templateUrl: './sendletter.component.html',
  styleUrls: ['./sendletter.component.scss']
})
export class SendLetterComponent implements OnInit {

  accnumber: string;
  custnumber: string;
  accountdetails: any;
  guarantors: [];
  model: any = {};
  bodyletter: any = {};
  filepath: string;
  demands: any;
  file: string;
  smsMessage: string;
  username: string;
  emaildata: any = {};
  // tslint:disable-next-line:max-line-length
  itemsDemands: Array<string> = ['Demand1', 'Demand2', 'Prelisting', 'PostlistingSecured', 'PostlistingUnsecured', 'PostlistingUnsecuredcc', 'Day90', 'Day40', 'Day30', 'prelistingremedial'];

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
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('demand', this.model.demand);
      form.append('accnumber', this.accnumber);
      form.append('owner', this.username);
      form.append('custnumber', this.custnumber);
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status);
      // refresh demad history
      this.getdemandshistory(this.accnumber);
    };

    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any => {
      // success
    };

    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any => {
      // error server response
    };
  }

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
    });
  }

  getdemandshistory(accnumber) {
    this.ecolService.getdemandshistory(accnumber).subscribe(data => {
      this.demands = data;
    });
  }

  generate() {
    this.ecolService.loader();
    this.processletter(this.model, this.model.accnumber, this.model.emailaddress);
    this.getdemandshistory(this.accnumber);
  }

  openletter(letter) {
    // console.log('letter==>', letter);
    this.ecolService.loader();
    this.ecolService.getAccount(this.accnumber).subscribe(data => {
      // if account is there
      if (data && data.length > 0) {
        // console.log('getAccount=>', data);
        this.bodyletter.demand = letter.demand;
        this.bodyletter.showlogo = letter.showlogo;
        this.bodyletter.format = letter.format;
        this.bodyletter.cust = data[0].custnumber;
        this.bodyletter.acc = data[0].accnumber;
        this.bodyletter.custname = data[0].client_name;
        this.bodyletter.address = letter.addressline1;
        this.bodyletter.postcode = letter.postcode;
        this.bodyletter.arocode = data[0].arocode;
        this.bodyletter.branchname = data[0].branchname;
        this.bodyletter.branchcode = data[0].branchcode;
        this.bodyletter.manager = data[0].manager;
        this.bodyletter.ccy = data[0].currency;
        this.bodyletter.demand1date = null;
        this.bodyletter.guarantors = data[0].guarantors;
        // Get all cust accounts
        this.ecolService.getcustwithAccount(data[0].custnumber).subscribe(accounts => {
          // add accounts to the array
          // console.log('accounts=>', accounts);
          this.bodyletter.accounts = accounts;
          // get demand1 date
          this.ecolService.demand1history(this.accnumber).subscribe(dd1date => {
            if (dd1date && dd1date.length > 0) {
              this.bodyletter.demand1date = dd1date[0].datesent;
            }
            // call generate letter api
            this.ecolService.generateLetter(this.bodyletter).subscribe(generateletterdata => {
              // sucess
              if (generateletterdata.result === 'success') {
                swal('Good!', generateletterdata.message, 'success');
                this.downloadDemand(generateletterdata.message, generateletterdata.filename);
              } else {
                swal('Error!', 'Error occured during letter generation!', 'error');
              }
              //
            }, error => {
              console.log('error==>', error);
              swal('Error!', 'Error occured during letter generation!', 'error');
            });
          }, error => {
            console.log('demand1history==>', error);
            swal('Error!', 'Error generating previous demand date!', 'error');
          });
        }, error => {
          console.log('error==>', error);
          swal('Error!', 'unable to retrieve customer accounts!', 'error');
        });
      } else {
        swal('None!', letter.accnumber + ' not found!', 'warning');
      }
    }, error => {
      console.log('error==>', error);
      swal('Error!', 'account info missing!', 'error');
    });
  }

  processletter(letter: any, accnumber, emailaddress) {
    // console.log('processletter==>', letter);
    this.ecolService.getAccount(accnumber).subscribe(data => {
      if (data && data.length > 0) {
        // console.log('getAccount=>', data);
        this.bodyletter.demand = letter.demand;
        this.bodyletter.showlogo = true;
        this.bodyletter.format = 'pdf';
        this.bodyletter.cust = data[0].custnumber;
        this.bodyletter.acc = data[0].accnumber;
        this.bodyletter.custname = data[0].client_name;
        this.bodyletter.address = letter.addressline1;
        this.bodyletter.postcode = letter.postcode;
        this.bodyletter.arocode = data[0].arocode;
        this.bodyletter.branchname = data[0].branchname;
        this.bodyletter.branchcode = data[0].branchcode;
        this.bodyletter.manager = data[0].manager;
        this.bodyletter.branchemail = data[0].branchemail;
        this.bodyletter.ccy = data[0].currency;
        this.bodyletter.demand1date = new Date();
        this.bodyletter.guarantors = data[0].guarantors;
        // Get all cust accounts
        this.ecolService.getcustwithAccount(data[0].custnumber).subscribe(accounts => {
          // add accounts to the array
          this.bodyletter.accounts = accounts;
          this.emaildata = {
            name: data[0].client_name,
            email: emailaddress,
            branchemail: this.bodyletter.branchemail,
            title: letter.demand
          };
          // generate letter
          this.generateletter(this.bodyletter);
        }, error => {
          console.log('error==>', error);
          swal('Error!', 'unable to retrieve customer accounts!', 'error');
        });
      } else {
        swal('None!', letter.accnumber + ' not found!', 'warning');
      }
    }, error => {
      console.log(error);
      swal('Error!', 'exception occured!', 'error');
    });
  }

  generateletter(letter) {
    this.ecolService.generateLetter(letter).subscribe(uploaddata => {
      if (uploaddata.result === 'success') {
        //
        swal('Success!', 'Letter generated!', 'success');
        // save to history
        const bulk = {
          'accnumber': this.model.accnumber,
          'custnumber': this.model.custnumber,
          'address': this.model.addressline1,
          'email': this.model.email,
          'telnumber': this.model.telnumber,
          'filepath': uploaddata.message,
          'filename': uploaddata.filename,
          'datesent': new Date(),
          'owner': this.username,
          'byemail': this.model.sendemail,
          'byphysical': this.model.sendphysical,
          'bypost': this.model.sendpostal,
          'demand': letter.demand
        };
        //
        this.demandshistory(bulk);
        // send email
        // add file full path
        this.emaildata.file = uploaddata.message;
        console.log('sendDemandEmail==>', this.emaildata);
        this.ecolService.sendDemandEmail(this.emaildata).subscribe(response => {
          console.log(response);
          swal('Success!', 'Letter sent on email!', 'success');
        });
        // send sms
        this.ecolService.getsmsmessage(letter.demand).subscribe(result => {
          if (result && result.length > 0) {
            this.smsMessage = result[0].message;
          } else {
            // tslint:disable-next-line:max-line-length
            this.smsMessage = 'Dear Customer, We have sent a Loan Repayment  Demand  Notice to your address. To enquire call  0711049000';
          }

          const smsdata = {
            'demand': letter.demand,
            'custnumber': this.model.custnumber,
            'telnumber': this.model.telnumber,
            'owner': this.username,
            'message': this.smsMessage,
          };
          this.sendsms(smsdata);
        }, error => {
          console.log(error);
        });
      } else {
        // error in letter generation
        swal('Error!', 'Error generating letter!', 'error');
      }
    }, error => {
      console.log(error);
      swal('Error!', 'Cannot generate letter!', 'error');
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

  sendsms(smsdata) {
    console.log('sendsms==data==', smsdata);
    this.ecolService.sendsms(smsdata).subscribe(result => {
      swal('Successful!', 'Demand letter SMS sent!', 'success');
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during sending email!', 'error');
    });
  }

  demandshistory(body) {
    console.log('demandshistory', body);
    this.ecolService.demandshistory(body).subscribe(data => {
      // console.log('saved demandshistory==', data);
      this.getdemandshistory(this.accnumber);
    });
  }

  guarantorletter(body) {
    this.ecolService.guarantorletters(body).subscribe(data => { });
  }

  sms(body) {
    this.ecolService.guarantorletters(body).subscribe(data => { });
  }

  downloadFile(filepath, filename) {
    this.ecolService.downloadFile(filepath).subscribe(data => {
      saveAs(data, filename);
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
