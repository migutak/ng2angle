import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  branchForm: FormGroup;
  branches: [];
  submitted = false;

  constructor(fb: FormBuilder, private ecolService: EcolService) {
    this.branchForm = fb.group({
      'branchcode': [null, Validators.required],
      'branchname': [null, Validators.required],
      'branchmanager': [null, Validators.required],
      'branchemail': [null, Validators.required],
      'region': [null]
    });
  }

  ngOnInit() {
    this.getbranches();
  }

  // convenience getter for easy access to form fields
  get f() { return this.branchForm.controls; }

  submitForm($ev, value: any) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.branchForm.invalid) {
      return;
    }
    this.ecolService.loader();
    // console.log(value);
    this.ecolService.putbranch(value).subscribe(res => {
      swal('Successful!', 'Branch set!', 'success');
      this.getbranches();
    }, error => {
      console.log(error);
      swal('Error!', 'Exception occured!', 'error');
    });
  }

  getbranches() {
    this.ecolService.getbranches().subscribe(response => {
      this.branches = response;
    }, error => {
      console.log(error);
    });
  }

  putbranch(branch) {
    this.ecolService.putbranch(branch).subscribe(response => {
      // success
    }, error => {
      console.log(error);
    });
  }

  update(b) {
    this.branchForm.setValue({
      branchcode: b.branchcode,
      branchname: b.branchname,
      branchmanager: b.manager,
      branchemail: b.branchemail,
      region: b.region
    });
  }

  /*

  this.myFormGroup.patchValue({
    formControlName1: myValue1,
    // formControlName2: myValue2 (can be omitted)
  });*/

}
