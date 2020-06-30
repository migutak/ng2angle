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
  minDate: Date;

    bsConfig = { 
        isAnimated: true,
        adaptivePosition: true,
        dateInputFormat: 'YYYY-MM-DD' 
    }

  branches: Array<any>;
  buttonTitle = 'update user';

  constructor(fb: FormBuilder, private ecolService: EcolService ) {
    // Model Driven validation
    this.valForm = fb.group({
      'username': [null, Validators.required],
      'firstname': [null, Validators.required],
      'lastname': [''],
      'surname': [''],
      'division': ['', Validators.required],
      'team': ['', Validators.required],
      'branch': [''],
      'manager': [''],
      'email': ['', Validators.required],
      'role': ['', Validators.required],
      'expirydate': [''],
      'createdate': [{ value: new Date(), disabled: false }],
      'active': ['', Validators.required]
    });
    // Datepicker
    this.minDate = new Date();
    //this.minDate.setDate(this.minDate.getDate() + 1);
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
    
    // console.log(value);
    this.putuser(value);
  }

  putuser(body) {
   if(body.active == true) {
     body.active = 'Y'
   } else {
     body.active = 'N'
   }
   this.ecolService.loader();
   this.ecolService.putuser(body).subscribe(data => {
     // console.log(data);
      swal('Successful!', 'user updated!', 'success');

    }, error => {
      swal('Error!', 'Error occurred during processing!', 'error');
    });
  }

  search(username) {
    this.ecolService.loader();
    if (username) {
      this.ecolService.getuser(username).subscribe(data => {
        if (data.length > 0) {
          var active = true;
          if(data[0].ACTIVE == 'N') {
            active = false;
          }
          this.valForm.patchValue({
            username: data[0].USERNAME,
            firstname: data[0].FIRSTNAME,
            lastname: data[0].LASTNAME,
            surname: data[0].SURNAME,
            division: data[0].DIVISION,
            team: data[0].TEAM,
            branch: data[0].BRANCH,
            email: data[0].EMAIL,
            active: active,
            expirydate: data[0].EXPIRYDATE,
            createdate: data[0].CREATEDATE,
            role: data[0].ROLE
          });
          // success
        swal('Successful!', 'user details retrieved!', 'success');
        this.buttonTitle = 'Update User';
        } else {
          swal('Warning!', 'No user found!', 'warning');
          this.buttonTitle = 'Create User';
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
            createdate: new Date(),
            expirydate: '',
            role: ''
          });
        }
      }, error => {
        console.log(error);
        swal('Error!', 'Error occurred during processing!', 'error');
        this.buttonTitle = 'Create User';
      });
    }
  }

  getbranches() {
    this.ecolService.getbranches().subscribe(data => {
      this.branches = data;
    });
  }

}
