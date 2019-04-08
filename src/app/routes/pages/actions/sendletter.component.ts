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
  selector: 'app-sendletter',
  templateUrl: './sendletter.component.html',
  styleUrls: ['./sendletter.component.scss']
})
export class SendLetterComponent implements OnInit {

  accnumber: string;
  custnumber: string;
  accountdetails: any;
  guarantors: any = [];
  teles: any = [];
  emails: any = [];
  addresses: any = [];
  postcodes: any = [];
  guarantoremails: string = "";
  model: any = {};
  bodyletter: any = {};
  filepath: string;
  demands: any;
  file: string;
  smsMessage: string;
  username: string;
  emaildata: any = {};
  section: string;
  // tslint:disable-next-line:max-line-length
  itemsDemands: Array<string> = ['Demand1', 'Demand2', 'Prelisting', 'PostlistingSecured', 'PostlistingUnsecured', 'Day90', 'Day40', 'Day30', 'prelistingremedial'];

  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      positionClass: 'toast-top-right',
      animation: 'fade'
    });

  constructor(
    public settings: SettingsService,
    public toasterService: ToasterService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private ecolService: EcolService) {
    //
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('demand', this.model.demand);
      form.append('accnumber', this.accnumber);
      form.append('owner', this.username);
      form.append('custnumber', this.custnumber);
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      //
    };

    this.uploader.onSuccessItem = (item: FileItem, response: any, status: number, headers: ParsedResponseHeaders): any => {
      // success
      const obj = JSON.parse(response);
      for (let i = 0; i < obj.files.length; i++) {
        const bulk = {
          'accnumber': this.accnumber,
          'custnumber': this.custnumber,
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
        this.ecolService.demandshistory(bulk).subscribe(datar => {
          // console.log(datar);
          this.getdemandshistory(this.accnumber);
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
    this.getteles(this.custnumber);
  }

  getteles(cust){
    this.ecolService.getteles(cust).subscribe(data_teles => {
      this.teles = data_teles;
      this.emails = data_teles;
      this.postcodes = data_teles;
      this.addresses = data_teles;
    })
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

      this.section = data[0].section

      if (this.guarantors || this.guarantors.length > 0) {
        // loop
        for (let i = 0; i < this.guarantors.length; i++) {
          this.guarantoremails += this.guarantors[i].email + ',';
        }
      }
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
    this.ecolService.getAccount(this.accnumber).subscribe(data => {
      // if account is there
      if (data && data.length > 0) {
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
        this.bodyletter.guarantors = data[0].guarantors || [];
        this.bodyletter.settleaccno = data[0].settleaccno || '00000000000000';
        this.bodyletter.section = this.section;
        this.bodyletter.kbbr = data[0].kbbr;
        //
        this.ecolService.getcustwithAccount(data[0].custnumber).subscribe(accounts => {
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
                // swal('Good!', generateletterdata.message, 'success');
                swal.close();
                this.popsuccessToast('Letter ready for preview');
                this.downloadDemand(generateletterdata.message, generateletterdata.filename);
              } else {
                swal.close();
                // swal('Error!', 'Error occured during letter generation!', 'error');
                this.poperrorToast('Error occured during letter generation!');
              }
              //
            }, error => {
              console.log('error==>', error);
              swal.close();
              this.poperrorToast('Error occured during letter generation!');
            });
          }, error => {
            console.log('demand1history==>', error);
            swal.close();
            this.poperrorToast('Error generating previous demand date!');
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
    this.ecolService.getAccount(accnumber).subscribe(data => {
      if (data && data.length > 0) {
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
        this.bodyletter.branchemail = data[0].branchemail || 'Collection Support <collectionssupport@co-opbank.co.ke>';
        this.bodyletter.ccy = data[0].currency;
        this.bodyletter.demand1date = new Date();
        this.bodyletter.guarantors = data[0].guarantors;
        this.bodyletter.settleaccno = data[0].settleaccno || '00000000000000';
        this.bodyletter.section = this.section;
        this.bodyletter.kbbr = data[0].kbbr;
        // Get all cust accounts
        this.ecolService.getcustwithAccount(data[0].custnumber).subscribe(accounts => {
          this.bodyletter.accounts = accounts;
          this.emaildata = {
            name: data[0].client_name,
            email: emailaddress,
            branchemail: this.bodyletter.branchemail || 'Collection Support <collectionssupport@co-opbank.co.ke>',
            title: letter.demand,
            guarantor: this.bodyletter.guarantors || 0
          };
          // generate letter
          this.generateletter(this.bodyletter);
        }, error => {
          console.log('getcustwithAccount error==>', error);
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
    swal.close();
    this.popinfoToast('Letter Queued to be sent')
    this.ecolService.generateLetter(letter).subscribe(uploaddata => {
      if (uploaddata.result === 'success') {
        //
        // swal('Success!', 'Letter generated!', 'success');
        this.popsuccessToast('Letter generated and queued to be sent');
        // save to history
        const bulk = {
          'accnumber': this.model.accnumber,
          'custnumber': this.model.custnumber,
          'address': this.model.addressline1,
          'email': this.model.emailaddress,
          'telnumber': this.model.telnumber,
          'filepath': uploaddata.message,
          'filename': uploaddata.filename,
          'datesent': new Date(),
          'owner': this.username,
          'byemail': this.model.sendemail,
          'byphysical': this.model.sendphysical,
          'bypost': this.model.sendpostal,
          'demand': letter.demand,
          "customeremail": this.model.emailaddress,
          'status': 'queued',
          'reissued': 'N',
          'guarantorsno': this.guarantors.length || 0,
          'guarantorsemail': this.guarantoremails,
          'sendemail': letter.branchemail || 'Collection Support <collectionssupport@co-opbank.co.ke>'
        };
        //
        this.demandshistory(bulk);
        this.getdemandshistory(this.accnumber);
        this.emaildata.file = uploaddata.message;
        this.ecolService.sendDemandEmail(this.emaildata).subscribe(response => {
          if (response.result === 'fail') {
            swal.close();
            this.poperrorToast('Letter NOT sent on email!');
          } else {
            swal.close();
            this.popsuccessToast('Letter sent on email!')
          }
        });
        // send sms
        this.ecolService.getsmsmessage(letter.demand).subscribe(result => {
          if (result && result.length > 0) {
            this.smsMessage = result[0].message;
          } else {
            // tslint:disable-next-line:max-line-length
            this.smsMessage = 'Dear Customer, We have sent a Demand  Notice to your address. To enquire call  0711049000';
          }

          const smsdata = {
            'demand': letter.demand,
            'custnumber': this.model.custnumber,
            'telnumber': this.model.celnumber,
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

  sendsms(smsdata) {
    this.ecolService.sendsms(smsdata).subscribe(result => {
      // swal('Successful!', 'Demand letter SMS sent!', 'success');
      this.popsuccessToast('Demand letter SMS sent!')
    }, error => {
      console.log(error);
      // swal('Error!', 'Error occurred during sending email!', 'error');
      this.poperrorToast('Error occurred during sending email!');
    });
  }

  demandshistory(body) {
    this.ecolService.demandshistory(body).subscribe(data => {
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
        // resend letter
        //
        const emaildata = {
          email: datafile.customeremail,
          branchemail: datafile.sendemail,
          title: datafile.demand,
          guarantor: datafile.guarantors
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
          "customeremail": datafile.customeremail,
          'status': 'queued',
          'reissued': 'Y',
          'guarantorsno': datafile.guarantorsno,
          'guarantorsemail': datafile.guarantorsemail,
          'sendemail': datafile.sendemail
        };
        //
        this.demandshistory(bulk);
        this.getdemandshistory(datafile.accnumber);
        this.emaildata.file = datafile.filepath;
        this.ecolService.sendDemandEmail(emaildata).subscribe(response => {
          if (response.result === 'fail') {
            swal.close();
            this.poperrorToast('Letter NOT sent on email!');
          } else {
            swal.close();
            this.popsuccessToast('Letter sent on email!')
          }
        });
        // send sms
        this.ecolService.getsmsmessage(datafile.demand).subscribe(result => {
          if (result && result.length > 0) {
            this.smsMessage = result[0].message;
          } else {
            // tslint:disable-next-line:max-line-length
            this.smsMessage = 'Dear Customer, We have sent a Demand  Notice to your address. To enquire call  0711049000';
          }

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

    //save contact
    this.ecolService.existsteles(this.custnumber,model.celnumber,model.emailaddress).subscribe(contact => {
      if(contact.length > 0){
        swal(
          'Warning!',
          'Contact already exists',
          'info'
        );
        this.spinner.hide();
      } else {
        //save
        let telesbody = {
          custnumber: this.custnumber,
          telephone: model.celnumber,
          email: model.emailaddress,
          active: 'Yes',
          owner: this.username,
          updatedby: this.username,
          updatedlast: new Date(),
          address: model.addressline1,
          postcode: model.postcode
        }

        this.ecolService.postteles(telesbody).subscribe(teles => {
          this.spinner.hide();
          this.getteles(this.custnumber);
          swal(
            'Good!',
            'Contact has been added',
            'success'
          );
        })
      }
    }, error =>{
      console.log('error-existsteles', error);
      this.spinner.hide();
      swal(
        'Ooops!',
        'Something went wrong',
        'error'
      );
    })
 
    /*setTimeout(() => {
        this.spinner.hide();
    }, 5000);*/
  }
}
