import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import { DataService } from '../../../services/data.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';

const URL = environment.valor;

@Component({
  selector: 'app-activitylog',
  templateUrl: './activitylog.component.html',
  styleUrls: ['./activitylog.component.scss']
})
export class ActivityLogComponent implements OnInit {

  ptp = 0;
  notes: number;
  totalcontacts: number;
  totalcollaterals: number;
  totalguarantors: number;
  totalfiles: number;

  constructor(
    public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService,
    public dataService: DataService
    ) {
      // test service
      dataService.getTestData().subscribe(data => {
        this.ptp = data;
      });

      dataService.getNotesData().subscribe(data => {
        this.notes = data;
      });

      dataService.getCollateral().subscribe(data => {
        this.totalcollaterals = data;
      });

      dataService.getContacts().subscribe(data => {
        this.totalcontacts = data;
      });

      dataService.getGuarantors().subscribe(data => {
        this.totalguarantors = data;
      });

      dataService.getFiles().subscribe(data => {
        this.totalfiles = data;
      });
    //
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('demand', this.model.demand);
      form.append('accnumber', this.accnumber);
      form.append('owner', this.username);
      form.append('custnumber', this.custnumber);
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // console.log('ImageUpload:uploaded:', item, status);
      // refresh demad history notes
      this.getdemandshistory(this.accnumber);
    };
  }

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
  date = new Date();
  sys: string;
  collateralmenu = true;
  guarantorsmenu = true;
  demandlettersmenu = true;
  files: any = [];
  // itemsDemands: Array<string> = ['Demand1', 'Demand2', 'Prelisting', 'PostlistingSecured', 'PostlistingUnsecured', 'Day90', 'Day40'];

  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
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

    this.sys = this.route.snapshot.queryParamMap.get('sys');
    this.route.queryParamMap.subscribe(queryParams => {
      this.sys = queryParams.get('sys');
    });

    // this.data.currentMessage.subscribe(message => this.message = message)

    // get account details
    if (this.sys === 'cc') {
      this.getcard(this.accnumber);
      this.collateralmenu = false;
      this.guarantorsmenu = false;
    } else if (this.sys === 'mcoopcash') {
      this.getmcoopcashaccount(this.accnumber);
      this.collateralmenu = false;
      this.guarantorsmenu = false;
      this.demandlettersmenu = false;
    } else {
      this.getaccount(this.accnumber);
    }
    this.getdemandshistory(this.accnumber);

    // get files
    this.getfileshistory(this.custnumber);

    // notes
    this.getNotes(this.custnumber);
    // notes
    this.getCollateral(this.custnumber);
    // notes
    this.getContacts(this.custnumber);
    // notes
    this.getGuarantors(this.custnumber);
  }


  getcard(cardacct) {
    this.ecolService.getcardAccount(cardacct).subscribe(data => {
      this.accountdetails = data[0];
      this.model.accnumber = data[0].cardacct;
      this.model.custnumber = data[0].cardacct;
      this.model.addressline1 = data[0].address;
      this.model.postcode = data[0].rpcode;
      this.model.emailaddress = data[0].emailaddress;
      this.model.celnumber = data[0].celnumber;
    });
  }

  getNotes(custnumber) {
    this.ecolService.totalnotes(custnumber).subscribe(data => {
      this.notes = data[0].TOTAL;
    });
  }

  getfileshistory(custnumber) {
    this.ecolService.getfileshistory(custnumber).subscribe(data => {
      this.files = data;
      this.totalfiles = data.length;
    });
  }

  getGuarantors(custnumber) {
    this.ecolService.totalguarantors(custnumber).subscribe(data => {
      this.totalguarantors = data[0].TOTAL;
    });
  }

  getContacts(custnumber) {
    this.ecolService.totalcontacts(custnumber).subscribe(data => {
      this.totalcontacts = data[0].TOTAL;
    });
  }

  getCollateral(custnumber) {
    this.ecolService.totalcollaterals(custnumber).subscribe(data => {
      this.totalcollaterals = data[0].TOTAL;
    });
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

  getmcoopcashaccount(accnumber) {
    this.ecolService.getmcoopcashAccount(accnumber).subscribe(data => {
      this.accountdetails = data[0];
      this.model.accnumber = data[0].loanaccnumber;
      this.model.custnumber = data[0].loanaccnumber;
      this.model.addressline1 = data[0].address;
      this.model.postcode = data[0].postcode;
      this.model.celnumber = data[0].phonenumber;
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
            if (dd1date && dd1date.length > 0 ) {
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
    this.ecolService.getAccount(accnumber).subscribe(data => {
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
        this.bodyletter.demand1date = new Date();
        this.bodyletter.guarantors = data[0].guarantors;
        // Get all cust accounts
        this.ecolService.getcustwithAccount(data[0].custnumber).subscribe(accounts => {
          // add accounts to the array
          this.bodyletter.accounts = accounts;
          const emaildata = {
            name: data[0].client_name,
            email: emailaddress,
            title: letter.demand
          };
          // generate letter
          this.generateletter(this.bodyletter, emaildata);
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

  generateletter(letter, emaildata: any) {
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
        emaildata.file = uploaddata.filepath;
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
    this.ecolService.sendsms(smsdata).subscribe(result => {
      swal('Successful!', 'Demand letter SMS sent!', 'success');
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during sending email!', 'error');
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
