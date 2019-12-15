import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';

@Component({
    selector: 'app-login',
    templateUrl: './extlogin.component.html',
    styleUrls: ['./extlogin.component.scss', './style.css', './font-awesome-4.7.0/css/font-awesome.css'] //
})
export class ExtloginComponent implements OnInit {

    valForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    data: any;
    menuArray = ['Home'];

    constructor(
        public settings: SettingsService,
        fb: FormBuilder,
        public ecolService: EcolService,
        public router: Router,
        private route: ActivatedRoute) {

        this.valForm = fb.group({
            // 'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'username': [null, Validators.required],
            'password': [null, Validators.required]
        });

    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        // console.log(value);
        this.submitted = true;

        // stop here if form is invalid
        if (this.valForm.invalid) {
            return;
        }

        this.loading = true;
        
        this.getuser((value.username).toLowerCase());
        
    }

    ngOnInit() {
        // reset login status
        // this.ecolService.logout();

        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/extletters';

    }

    getuser(username) {
        this.ecolService.login(username).subscribe(user => {
            if (user.length > 0) {
                // store user details and basic auth credentials in local storage
                alert('download letter')
                //
            } else {
                this.error = 'Wrong ID';
                this.loading = false;
            }

           // return user;
        }, error => {
          console.log(error);
         if (error.statusText === 'Not Found') {
            this.error = 'Wrong ID';
            this.loading = false;
          } else {
            this.error = 'Error during authentiction';
            this.loading = false;
          }
        });
    }
}
