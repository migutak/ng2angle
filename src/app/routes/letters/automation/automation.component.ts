import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.scss']
})
export class AutomationComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  username: string;
  public itemsDemands: Array<string> = ['Demand1', 'Demand2', 'Prelisting', 'PostlistingSecured', 'PostlistingUnsecured', 'Day90', 'Day40', 'Day30',
    'prelistingremedial', 'overduecc', 'prelistingcc', 'suspension', 'PostlistingUnsecuredcc'];
  model: any = {};
  constructor(private ecolService: EcolService,
    private route: ActivatedRoute, ) { }

  ngOnInit() {

    this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });

  }

  onSubmit(form) {
    const body = {
      letterid: form.value.letterid,
      templatepath: form.value.accnumber,
      daysinarr: form.value.daysinarr,
      sms: form.value.sms,
      suspendletter: form.value.suspendletter,
      suspendsms: form.value.suspendsms,
      suspendautodelivery: form.value.suspendautodelivery,
      exceptions: form.value.exceptions[0] || '00',
      exceptionscust: form.value.exceptionscust,
      byemail: form.value.byemail,
      bypost: form.value.bypost,
      byphysical: form.value.byphysical,
      onlyto: form.value.onlyto
    };
    this.ecolService.getdemandSettingsduplicate(body.letterid, body.daysinarr, body.onlyto).subscribe(data => {
      console.log(data);
      if (data.length > 0) {
        // letter already added
        swal('Stop!', 'Letter already added!', 'warning');
      } else {
        // add letter
        this.ecolService.demandSettings(body).subscribe(response => {
          swal('Successful!', 'saved successfully!', 'success');
          this.getdemandSettings();
        }, error => {
          console.log(error);
          swal('Error!', 'Error occurred during processing!', 'error');
        });
      }
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during processing!', 'error');
    });
  }

  getdemandSettings() {
    this.ecolService.getdemandSettings().subscribe(response => {
      this.model = response;
    }, error => {
      console.log(error);
    });
  }

  update() {
    swal({
      title: 'Are you sure?',
      text: 'You want to Update!',
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
