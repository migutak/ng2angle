import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  valForm: FormGroup;

  // Datepicker
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  bsConfig = {
      containerClass: 'theme-angle'
  };


  constructor(fb: FormBuilder, private ecolService: EcolService ) {
    // Model Driven validation
    this.valForm = fb.group({
      'username': [null, Validators.required],
      'firstname': [null, Validators.required],
      'lastname': ['', Validators.required],
      'surname': [''],
      'division': [''],
      'branch': [''],
      'manager': [''],
      'email': [''],
      'role': [''],
      'createdate': [{value: new Date(), disabled: true  }, Validators.required],
      'expirydate': [''],
      'active': [false]
    });
    // Datepicker
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit() {
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    // tslint:disable-next-line:forin
    for (const c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      console.log('Valid!');
    }
    // console.log(value);

    this.putuser(value);
  }

  putuser(body) {
    this.ecolService.loader();
    this.ecolService.putuser(body).subscribe(data => {
     // console.log(data);
      swal('Successful!', 'user updated!', 'success');
    }, error => {
     // console.log(error);
      swal('Error!', 'Error occurred during processing!', 'error');
    });
  }

  search(username) {
    this.ecolService.loader();
    if (username) {
      this.ecolService.getuser(username).subscribe(data => {
        console.log(data);
        if (data.length > 0) {
          this.valForm.patchValue({
            username: data[0].username,
            firstname: data[0].firstname,
            lastname: data[0].lastname,
            surname: data[0].surname,
            division: data[0].division,
            branch: data[0].branch,
            email: data[0].username,
            active: data[0].active,
            expirydate: data[0].expirydate,
            createdate: data[0].createdate
          });
          // success
        swal('Successful!', 'user details retrieved!', 'success');
        } else {
          swal('Warning!', 'No user found!', 'warning');
        }
      }, error => {
        console.log(error);
        swal('Error!', 'Error occurred during processing!', 'error');
      });
    }
  }

}
