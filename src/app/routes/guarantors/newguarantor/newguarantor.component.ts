import {Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
const cust = localStorage.getItem('custnumber');
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-newguarantor',
  templateUrl: './newguarantor.component.html',
  styleUrls: ['./newguarantor.component.scss']
})
export class NewguarantorComponent implements OnInit {

  model: any = {};
  constructor(private ecolService: EcolService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form) {
    // console.log(form.value);
    // Loading indictor
    this.ecolService.loader();
    //
   const body = {
      nationid: form.value.nationid,
      guarantorname: form.value.guarantorname,
      accnumber: form.value.accnumber,
      custnumber: form.value.custnumber,
      address: form.value.address,
      postalcode: form.value.postalcode,
      telnumber: form.value.telnumber,
      email: form.value.email,
      active: form.value.active
    };

    this.ecolService.submitGuarantor(body).subscribe(data => {
      swal('Successful!', 'saved successfully!', 'success');
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during processing!', 'error');
    });
  }

  cancel () {
    // redirect to ListComponent
    this.router.navigate(['/guarantors/list']);
  }

}
