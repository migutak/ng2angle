import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  valForm: FormGroup;
  settingActive = 1;
  title = 'update';
  constructor(fb: FormBuilder) {
    // Model Driven validation
    this.valForm = fb.group({
      'username': [null, Validators.required],
      'firstname': [null, Validators.required],
      'lastname': ['', Validators.required],
      'surname': [''],
      'division': [''],
      'branchcode': [''],
      'manager': [''],
      'email': [''],
    });
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
    console.log(value);
  }

  search(singleModel){
    console.log(singleModel);
  }

}
