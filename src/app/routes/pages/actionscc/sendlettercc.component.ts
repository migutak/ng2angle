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
  selector: 'app-sendlettercc',
  templateUrl: './sendlettercc.component.html',
  styleUrls: ['./sendlettercc.component.scss']
})
export class SendLetterccComponent implements OnInit {

  cardacct: string;
  accountdetails: any;
  guarantors: [];
  model: any = {};
  letterbody: any = {};
  filepath: string;
  demands: any;
  smsMessage: string;
  file: string;
  username: string;
  itemsDemands: Array<string> = ['overduecc', 'prelistingcc', 'suspension'];

  public uploader: FileUploader = new FileUploader({
    url: URL
  });
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  // Add in the other upload form parameters.

  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService) {
    //
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('demand', this.model.demand);
      form.append('accnumber', this.cardacct);
      form.append('owner', this.username);
      form.append('custnumber', this.cardacct);
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // console.log('ImageUpload:uploaded:', item, status);
      // refresh demad history notes
      
    };

    this.uploader.onSuccessItem = (item: FileItem, response: any, status: number, headers: ParsedResponseHeaders): any => {
      // success
      var obj = JSON.parse(response);
      for (let i=0; i <obj.files.length; i ++) {
        const bulk = {
            'accnumber': this.cardacct,
            'custnumber': this.cardacct,
            'address': 'none',
            'email': 'none',
            'telnumber': 'none',
            'filepath': obj.files[i].path,
            'filename': obj.files[i].originalname,
            'datesent': new Date(),
            'owner': this.username,
            'byemail': false,
            'byphysical': true,
            'bypost': true,
            'demand': this.model.demand
          };
          this.ecolService.demandshistory(bulk).subscribe(response => {
            this.getdemandshistory(this.cardacct);
            swal('Good!', 'Demand letter uploaded successfully!', 'success');
          }, error => {
            swal('Oooops!', 'Demand letter uploaded but unable to add to demands history!', 'warning');
          })
    }
    };

    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any => {
      // error server response
    };
  }

  ngOnInit() {
    this.cardacct = this.route.snapshot.queryParamMap.get('cardacct');
    this.route.queryParamMap.subscribe(queryParams => {
      this.cardacct = queryParams.get('cardacct');
    });

    this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });

    // get account details
    this.getcardaccount(this.cardacct);
    this.getdemandshistory(this.cardacct);
  }

  openletter(letter) {
    this.ecolService.loader();
    this.ecolService.getcardAccount(this.cardacct).subscribe(carddata => {
      // if cardacct
      if (carddata && carddata.length > 0) {
        this.letterbody.demand = letter.demand,
          this.letterbody.showlogo = letter.showlogo,
          this.letterbody.format = letter.format,
          this.letterbody.cardacct = this.cardacct,
          this.letterbody.cardnumber = carddata[0].cardnumber,
          this.letterbody.cardname = carddata[0].cardname,
          this.letterbody.address = letter.addressline1,
          this.letterbody.rpcode = letter.postcode,
          this.letterbody.city = letter.city,
          this.letterbody.EXP_PMNT = carddata[0].exppmnt,
          this.letterbody.OUT_BALANCE = carddata[0].outbalance,
          this.letterbody.demand1date = new Date();

        // console.log(body);
        // call generate letter api
        this.ecolService.generateLetter(this.letterbody).subscribe(data => {
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
      } else {
        swal('None!', letter.accnumber + ' not found!', 'warning');
      }
    }, error => {
      //
      console.log(error);
      swal('Error!', 'account info missing!', 'error');
    });
  }

  getcardaccount(cardacct) {
    this.ecolService.getcardAccount(cardacct).subscribe(data => {
      // console.log('this is getcardAccount==>', data);
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

  downloadDemand(filepath, filename) {
    this.ecolService.downloadFile(filepath).subscribe(data => {
      saveAs(data, filename);
    }, error => {
      console.log(error.error);
      swal('Error!', ' Cannot download  file!', 'error');
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
          cardacct: data[0].cardacct,
          cardname: data[0].cardname,
          showlogo: true,
          format: 'pdf',
          address: this.model.addressline1,
          postcode: this.model.postcode,
          exp_pmnt: data[0].exppmnt,
          out_balance: data[0].exppmnt,
          manager: 'ROSE KARAMBU'
        };
        const emaildata = {
          name: data[0].cardname,
          email: emailaddress,
          title: demand,
          branchemail: 'Contact Centre Team <ContactCentreTeam@co-opbank.co.ke>'
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
    this.ecolService.generateLettercc(letter).subscribe(dataupload => {
      console.log('generateLetterccoverdue==>', dataupload);
      // sucess
      if (dataupload.result === 'success') {
        swal('Good!', dataupload.message, 'success');
        // save to history
        const bulk = {
          'accnumber': this.model.accnumber,
          'custnumber': this.model.accnumber,
          'address': this.model.addressline1,
          'email': this.model.email,
          'telnumber': this.model.telnumber,
          'filepath': dataupload.message,
          'filename': dataupload.filename,
          'datesent': new Date(),
          'owner': this.username,
          'byemail': this.model.emailaddress,
          'byphysical': this.model.sendphysical,
          'bypost': this.model.sendpostal,
          'demand': letter.demand
        };
        this.demandshistory(bulk);
        this.getdemandshistory(this.cardacct);
        this.downloadDemand(letter.message, dataupload.filename);
      } else {
        swal('Error!', 'Error occured during letter generation!', 'error');
      }

      // send email
      // add file full path
      emaildata.file = dataupload.message;
      this.ecolService.sendDemandEmail(emaildata).subscribe(response => {
        console.log(response);
        swal('Success!', 'Letter sent on email!', 'success');
      });
      // send sms
      // get message
      this.ecolService.getsmsmessage(letter.demand).subscribe(result => {
        if (result && result.length > 0) {
          this.smsMessage = result[0].message;
        } else {
          // tslint:disable-next-line:max-line-length
          this.smsMessage = 'Dear Customer, We have sent a Loan Repayment  Demand  Notice to your address. To enquire call  0711049000';
        }

        const smsdata = {
          'demand': letter.demand,
          'custnumber': this.model.accnumber,
          'telnumber': this.model.telnumber,
          'owner': this.username,
          'message': this.smsMessage,
        };
        this.sendsms(smsdata);
      }, error => {
        console.log(error);
      });
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

  sendsms(smsdata) {
    console.log('sendsms==data==', smsdata);
    this.ecolService.sendsms(smsdata).subscribe(result => {
      swal('Successful!', 'Demand letter sent!', 'success');
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during sending email!', 'error');
    });
  }

  getsmsmessage(demand) {
    this.ecolService.getsmsmessage(demand).subscribe(result => {
      this.smsMessage = result[0].message;
    }, error => {
      console.log(error);
    });
  }

  demandshistory(body) {
    console.log('demandshistory body', body);
    this.ecolService.demandshistory(body).subscribe(data => {
      console.log(data);
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
