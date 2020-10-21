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
  buttonTitle = true;

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
    this.minDate = new Date();
  }

  ngOnInit() {
    this.getbranches();
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (const c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    
    this.putuser(value);
  }

  CreateUserfnc($ev, value: any) {
    if(value.lastname === "") {
      value.lastname = " "
    };
    $ev.preventDefault();
    for (const c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    
    this.postuser(value);
  }

  postuser(body) {
   if(body.active == true) {
     body.active = 'Y'
   } else {
     body.active = 'N'
   }
   this.ecolService.loader();
   this.ecolService.postuser(body).subscribe(data => {
      swal('Successful!', 'user updated!', 'success');

    }, error => {
      swal('Error!', 'Error occurred during processing!', 'error');
    });
  }

  putuser(body) {
    if(body.active == true) {
      body.active = 'Y'
    } else {
      body.active = 'N'
    }
    this.ecolService.loader();
    this.ecolService.putuser(body).subscribe(data => {
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
            firstname: data[0].FIRSTNAME  || ' ',
            lastname: data[0].LASTNAME  || ' ',
            surname: data[0].SURNAME,
            division: data[0].DIVISION  || ' ',
            team: data[0].TEAM  || ' ',
            branch: data[0].BRANCH  || ' ',
            email: data[0].EMAIL  || ' ',
            active: active,
            expirydate: data[0].EXPIRYDATE || '0',
            createdate: data[0].CREATEDATE || '2013-01-01T10:46:19.000Z', 
            role: data[0].ROLE
          });
          // success
        swal('Successful!', 'user details retrieved!', 'success');
        this.buttonTitle = true;
        } else {
          swal('Warning!', 'No user found!', 'warning');
          this.buttonTitle = false;
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
        this.buttonTitle = false;
      });
    }
  }

  getbranches() {
    this.ecolService.getbranches().subscribe(data => {
      this.branches = data;
    });
  }

}
