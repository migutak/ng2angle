import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../environments/environment';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { NgxSpinnerService } from 'ngx-spinner';

const URL = environment.valor;

@Component({
  selector: 'app-sendlettercc',
  templateUrl: './sendlettercc.component.html',
  styleUrls: ['./sendlettercc.component.scss']
})
export class SendLetterccComponent implements OnInit {

  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    public toasterService: ToasterService,
    private spinner: NgxSpinnerService,
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
      const obj = JSON.parse(response);
      for (let i = 0; i < obj.files.length; i++) {
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
        // use file on email
        this.uploadedfilepath = obj.files[i].path;
        this.ecolService.demandshistory(bulk).subscribe(datar => {
          this.getdemandshistory(this.cardacct);
          swal('Good!', 'Demand letter uploaded successfully!', 'success');
        }, error => {
          swal('Oooops!', 'Demand letter uploaded but unable to add to demands history!', 'warning');
        });
      }
    };

    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any => {
      // error server response
    };
  }

  cardacct: string;
  accountdetails: any;
  guarantors: [];
  teles: [];
  model: any = {};
  emails: any = [];
  postcodes: any = [];
  addresses: any = [];
  letterbody: any = {};
  filepath: string;
  demands: any;
  smsMessage: string;
  file: string;
  username: string;
  uploadedfilepath: string;
  itemsDemands: Array<string> = ['overduecc', 'prelistingcc', 'suspension', 'PostlistingUnsecuredcc'];

  public uploader: FileUploader = new FileUploader({
    url: URL
  });
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      positionClass: 'toast-top-right',
      animation: 'fade'
    });

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
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
    this.getteles(this.cardacct);
  }

  getteles(cust) {
    this.ecolService.getteles(cust).subscribe(data_teles => {
      this.teles = data_teles;
      this.emails = data_teles;
      this.postcodes = data_teles;
      this.addresses = data_teles;
    });
  }

  popsuccessToast(msg) {
    this.toasterService.pop('success', 'Success', msg);
  }

  poperrorToast(error) {
    this.toasterService.pop('error', 'Error', error);
  }

  popinfoToast(info) {
    this.toasterService.pop('info', 'Info', info);
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
          this.letterbody.exp_pmnt = carddata[0].exppmnt,
          this.letterbody.out_balance = carddata[0].outbalance,
          this.letterbody.demand1date = new Date();

        // call generate letter api
        this.ecolService.generateLetter(this.letterbody).subscribe(data => {
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
      this.accountdetails = data[0];
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
          cardnumber: data[0].cardnumber,
          cardname: data[0].cardname,
          showlogo: true,
          format: 'pdf',
          address: this.model.addressline1,
          rpcode: this.model.postcode,
          exp_pmnt: data[0].exppmnt,
          out_balance: data[0].outbalance,
          manager: 'ROSE KARAMBU'

        };
        const emaildata = {
          name: data[0].cardname,
          email: emailaddress,
          title: demand,
          branchemail: 'Collection Support <collectionssupport@co-opbank.co.ke>'
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
    swal.close();
    this.popinfoToast('Letter Generation process started');
    this.ecolService.generateLettercc(letter).subscribe(dataupload => {
      // sucess
      if (dataupload.result === 'success') {
        // swal('Good!', dataupload.message, 'success');
        this.popsuccessToast('Letter generated and queued to be sent');
        // save to history
        const bulk = {
          'accnumber': this.model.accnumber,
          'custnumber': this.model.accnumber,
          'address': this.model.addressline1,
          'email': this.model.emailaddress,
          'telnumber': this.model.telnumber,
          'filepath': dataupload.message,
          'filename': dataupload.filename,
          'datesent': new Date(),
          'owner': this.username,
          'byemail': this.model.sendemail,
          'byphysical': this.model.sendphysical,
          'bypost': this.model.sendpostal,
          'demand': letter.demand,
          'status': 'queued',
          'customeremail': this.model.emailaddress,
          'reissued': 'N',
          'guarantorsno': 0,
          'guarantorsemail': 0,
          'sendemail': 'Collection Support <collectionssupport@co-opbank.co.ke>'
        };
        this.demandshistory(bulk);
        this.getdemandshistory(this.cardacct);
        // this.downloadDemand(letter.message, dataupload.filename);
      } else {
        swal('Error!', 'Error occured during letter generation!', 'error');
      }

      // send email
      // add file full path
      emaildata.file = dataupload.message;
      // use uplaoded fie on email
      if (this.model.uploadedfile) {
        emaildata.file = this.uploadedfilepath;
      }
      this.ecolService.sendDemandEmail(emaildata).subscribe(response => {
        // console.log(response);
        /*if (response.result === 'fail') {
          swal('Error!', 'Letter NOT sent on email!', 'error');
        } else {
          swal('Success!', 'Letter sent on email!', 'success');
        }*/
        if (response.result === 'fail') {
          swal.close();
          this.poperrorToast('Letter NOT sent on email!');
        } else {
          swal.close();
          this.popsuccessToast('Letter sent on email!');
        }
      });
      // send sms
      // get message
      this.ecolService.getsmsmessage(letter.demand).subscribe(respo => {
        const sms = respo.smstemplate;
        this.smsMessage = sms.replace('[emailaddressxxx]', 'email address ' + this.model.emailaddress);

        const smsdata = {
          'demand': letter.demand,
          'custnumber': this.model.accnumber,
          'telnumber': this.model.celnumber,
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

  sendsms(smsdata) {
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
    this.ecolService.demandshistory(body).subscribe(data => {
      // console.log(data);
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

  resend(datafile) {
    swal({
      title: 'confirm re-send',
      text: JSON.stringify(datafile),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Send Email',
      showLoaderOnConfirm: true,
      preConfirm: (email) => { },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {

        const emaildata = {
          email: datafile.customeremail,
          branchemail: datafile.sendemail,
          title: datafile.demand,
          // guarantor: datafile.guarantors,
          file: datafile.filepath
        };

        const bulk = {
          'accnumber': datafile.accnumber,
          'custnumber': datafile.custnumber,
          'address': datafile.address,
          'email': datafile.customeremail,
          'telnumber': datafile.telnumber,
          'filepath': datafile.filepath,
          'filename': datafile.filename,
          'datesent': new Date(),
          'owner': this.username,
          'byemail': 'Y',
          'byphysical': 'N',
          'bypost': 'N',
          'demand': datafile.demand,
          'customeremail': datafile.customeremail,
          'status': 'queued',
          'reissued': 'Y',
          'guarantorsno': datafile.guarantorsno,
          'guarantorsemail': datafile.guarantorsemail,
          'sendemail': datafile.sendemail
        };
        //
        this.demandshistory(bulk);
        this.getdemandshistory(datafile.accnumber);
        this.ecolService.sendDemandEmail(emaildata).subscribe(response => {
          if (response.result === 'fail') {
            swal.close();
            this.poperrorToast('Letter NOT sent on email!');
          } else {
            swal.close();
            this.popsuccessToast('Letter sent on email!');
          }
        });
        // send sms
        this.ecolService.getsmsmessage(datafile.demand).subscribe(respo => {
          const sms = respo.smstemplate;
          this.smsMessage = sms.replace('[emailaddressxxx]', 'email address ' + this.model.emailaddress);

          const smsdata = {
            'demand': datafile.demand,
            'custnumber': datafile.custnumber,
            'telnumber': datafile.celnumber,
            'owner': this.username,
            'message': this.smsMessage,
          };
          this.sendsms(smsdata);
        }, error => {
          console.log(error);
        });
        swal(
          'Sent!',
          'Email has been sent',
          'success'
        );
      }
    });
  }

  savecontacts(model) {
    this.spinner.show();

    // save contact
    this.ecolService.existsteles(this.cardacct, model.celnumber, model.emailaddress).subscribe(contact => {
      if (contact.length > 0) {
        swal(
          'Warning!',
          'Contact already exists',
          'info'
        );
        this.spinner.hide();
      } else {
        // save
        const body = {
          custnumber: this.cardacct,
          telephone: model.celnumber,
          email: model.emailaddress,
          active: 'Yes',
          owner: this.username,
          updatedby: this.username,
          updatedlast: new Date(),
          address: model.addressline1,
          postcode: model.postcode
        };

        this.ecolService.postteles(body).subscribe(teles => {
          this.spinner.hide();
          this.getteles(this.cardacct);
          swal(
            'Good!',
            'Contact has been added',
            'success'
          );
        });
      }
    }, error => {
      console.log('error-existsteles', error);
      swal(
        'Ooops!',
        'Something went wrong',
        'error'
      );
      this.spinner.hide();
    });

    /*setTimeout(() => {
        this.spinner.hide();
    }, 5000);*/
  }
}
