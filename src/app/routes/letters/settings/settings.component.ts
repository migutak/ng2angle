import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public itemsCategories: Array<string> = ['1-Demand', '2-Demand', 'Pre-listing', 'Post-listing', '90-day', '40-day'];
  public itemsDemands: Array<string> = ['Demand1', 'Demand2', 'Prelisting', 'PostlistingSecured', 'PostlistingUnsecured', 'Day90', 'Day40'];
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
    valueCategory;
    valueTag;
    valueReview;
    contents: string;
    letter: {};

  constructor(private ecolService: EcolService) { }

  ngOnInit() {
  }

  onSubmit(form) {
    // console.log(form.value);
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

    this.ecolService.updateLetter(body).subscribe(data => {
      swal('Successful!', 'saved successfully!', 'success');
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

}
