import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public itemsCategories: Array<string> = ['1-Demand', '2-Demand', 'Pre-listing', 'Post-listing', '90-day', '40-day'];
  public itemsDemands: Array<string> = ['Demand1', 'Demand2', 'Prelisting', 'PostlistingSecured', 'PostlistingUnsecured', 'Day90', 'Day40',
'creditcard_overdue', 'creditcard_prelisting', 'creditcard_suspension'];
  public itemsTags: Array<number> = [7, 14, 30, 60, 90, 120];
  public memoTags: Array<number> = [100, 140, 300, 600, 900, 120];
  public itemsReview = [
        'Adam <adam@email.com>',
        'Amalie <amalie@email.com>',
        'Wladimir <wladimir@email.com>',
        'Samantha <samantha@email.com>',
        'Estefanía <estefanía@email.com>',
        'Natasha <natasha@email.com>',
        'Nicole <nicole@email.com>',
        'Adrian <adrian@email.com>'
    ];
    model: any = {};
    test: any = {};
    valueCategory;
    valueTag;
    valueReview;
    contents: string;
    letter: {};
    demandSettings: any;
    disable = true;

  constructor(private ecolService: EcolService) { }

  ngOnInit() {
    this.getdemandSettings();
  }

  getdemandSettings() {
    this.ecolService.getdemandSettings().subscribe(response => {
      this.demandSettings = response;
    }, error => {
      console.log(error);
    });
  }

  testSubmit(form) {
    this.ecolService.loader();
    const body = {
      demand: form.value.demand,
      accnumber1: form.value.accnumber1,
      accnumber2: form.value.accnumber2,
      accnumber3: form.value.accnumber3,
      telnumber: form.value.telnumber,
      email: form.value.email,
      sendsms: form.value.sendsms
      };

      //
      this.processletter(body.demand, body.accnumber1, body.email);
      this.processletter(body.demand, body.accnumber2, body.email);
      this.processletter(body.demand, body.accnumber3, body.email);
      // console.log(body);
  }

  generateletter(letter, emaildata: any) {
    console.log(letter);
    this.ecolService.generateLetter(letter).subscribe(data => {
      console.log(data);
      swal('Success!', 'Letter generated!', 'success');
      // send email
      // add file full path
      emaildata.file = environment.letters_path + data.result.file;
      this.ecolService.sendDemandEmail(emaildata).subscribe(response => {
        console.log(response);
      });
      // send sms
    }, error => {
      console.log(error);
    });
  }

  processletter(demand, accnumber, emailaddress) {
    console.log(demand);
    this.ecolService.getAccount(accnumber).subscribe(data => {
      if (data.length > 0) {
        const letter = {
          demand: demand.toLowerCase(),
          cust: data[0].custnumber,
          acc: data[0].accnumber,
          custname: data[0].client_name,
          address: data[0].addressline1,
          postcode: data[0].postcode,
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

      } else {
        swal('None!', accnumber + 'not found!', 'warning');
      }
    }, error => {
      console.log(error);
      swal('Error!', 'exception occured!', 'error');
    });
  }

  onSubmit(form) {
    // Loading indictor
    this.ecolService.loader();
    //
   const body = {
    letterid: form.value.letterid,
    lettername: form.value.letterid,
    templatepath: form.value.accnumber,
    daysinarr: form.value.daysinarr,
    sms: form.value.sms,
    suspendletter: form.value.suspendletter,
    suspendsms: form.value.suspendsms,
    suspendautodelivery: form.value.suspendautodelivery,
    exceptions: form.value.exceptions[0],
    exceptionscust: form.value.exceptionscust,
    byemail: form.value.byemail,
    bypost: form.value.bypost,
    byphysical: form.value.byphysical,
    onlyto: form.value.onlyto
    };

    /*this.ecolService.updateLetter(body).subscribe(data => {
      swal('Successful!', 'saved successfully!', 'success');
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during processing!', 'error');
    });*/

    this.ecolService.demandSettings(body).subscribe(data => {
      swal('Successful!', 'saved successfully!', 'success');
      this.getdemandSettings();
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during processing!', 'error');
    });
  }

  onChange(letter) {
    // load letter details
    this.ecolService.getLetter(letter).subscribe(data => {
      letter = data;
      // console.log(data);
      this.model.sms = data.sms;
      this.model.daysinarr = data.daysinarr;
      this.model.onlyto = data.onlyto;
      this.model.exceptions = data.exceptions;
      this.model.exceptionscust = data.exceptionscust;
      this.model.suspendlette =  data.suspendletter;
      this.model.suspendsms =  data.suspendsms;
      this.model.suspendautodelivery = data.suspendautodelivery;
      this.model.bysms =  data.bysms;
      this.model.bypost =  data.bypost;
      this.model.byphysical = data.byphysical;
      swal('Successful!', 'letter retrieved successfully!', 'success');
    }, error => {
      console.log(error);
      swal('Error!', 'No letter found!', 'error');
    });
  }

  updatedemandsettings (demand) {
    this.disable = false;
    this.model = demand;
  }

  update() {
    swal({
      title: 'Are you sure?',
      text: 'You want to update!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update!'
    }).then((result) => {
      if (result.value) {
        this.ecolService.loader();
        this.ecolService.putdemandSettings(this.model).subscribe(Response => {
          swal('Successful!', 'letter updated!', 'success');
        }, error => {
          console.log(error);
          swal('Error!', 'Error updating letter!', 'error');
        });
      }
    });
  }

  delete() {
    swal({
      title: 'Are you sure?',
      text: 'You want to DELETE!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.value) {
        //
      }
    });
  }

}