import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  guarantors: any;
  constructor(private ecolService: EcolService, private router: Router) { }

  ngOnInit() {

  }

  getguarantors(accnumber) {
    this.ecolService.loader();
    this.ecolService.retrieveGuarantors(accnumber).subscribe(data => {
      this.guarantors = data;
      swal('Success!', 'Retrieved guarantors!', 'success');
      swal.hideLoading();
    }, error => {
      console.log(error);
      swal('Error!', 'Error retrieving guarantors!', 'error');
    });
  }

  update (id) {
    // redirect to ListComponent
    this.router.navigate(['/guarantors/editguarantor/' + id]);
  }

  addnew () {
    // redirect to ListComponent
    this.router.navigate(['/guarantors/newguarantor']);
  }

}
