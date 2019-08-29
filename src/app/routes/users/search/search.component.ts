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

  branches: Array<any>;
  buttonTitle = 'update user';

  constructor(fb: FormBuilder, private ecolService: EcolService ) {
    // Model Driven validation
    this.valForm = fb.group({
      'username': [null, Validators.required],
      'firstname': [null, Validators.required],
      'lastname': [''],
      'surname': [''],
      'division': [''],
      'team': [''],
      'branch': [''],
      'manager': [''],
      'email': [''],
      'role': [''],
      'expirydate': [''],
      'active': ['']
    });
    // Datepicker
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit() {
    this.getbranches();
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
   // console.log(body);
   this.ecolService.loader();
   this.ecolService.putuser(body).subscribe(data => {
     // console.log(data);
      swal('Successful!', 'user updated!', 'success');

    }, error => {
     // console.log(error);
    // this.buttonTitle = 'update user';
      swal('Error!', 'Error occurred during processing!', 'error');
    });
  }

  search(username) {
    this.ecolService.loader();
    if (username) {
      this.ecolService.getuser(username).subscribe(data => {
        if (data.length > 0) {
          this.valForm.patchValue({
            username: data[0].USERNAME,
            firstname: data[0].FIRSTNAME,
            lastname: data[0].LASTNAME,
            surname: data[0].SURNAME,
            division: data[0].DIVISION,
            team: data[0].TEAM,
            branch: data[0].BRANCH,
            email: data[0].EMAIL,
            active: data[0].ACTIVE,
            expirydate: data[0].EXPIRYDATE,
            role: data[0].ROLE
          });
          // success
        swal('Successful!', 'user details retrieved!', 'success');
        this.buttonTitle = 'update user';
        } else {
          swal('Warning!', 'No user found!', 'warning');
          this.buttonTitle = 'create user';
          this.valForm.patchValue({
            username: '',
            firstname: '',
            lastname: '',
            surname: '',
            division: '',
            team: '',
            branch: '',
            email: '',
            active: '',
            expirydate: '',
            role: ''
          });
        }
      }, error => {
        console.log(error);
        swal('Error!', 'Error occurred during processing!', 'error');
        this.buttonTitle = 'create user';
      });
    }
  }

  getbranches() {
    this.ecolService.getbranches().subscribe(data => {
      // console.log(data);
      this.branches = data;
    });
  }

}
