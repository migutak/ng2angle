import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { EcolService } from '../../../services/ecol.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    valForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    data: any;

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
        /*for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log('Valid!');
            console.log(value);
        }*/
        this.ecolService.login(value.username, value.password)
        .subscribe(user => {
            // login successful if there's a user in the response
            if (user !== null || user !== undefined) {
                // store user details and basic auth credentials in local storage
                // to keep user logged in between page refreshes
                // get user permissions
                this.ecolService.getpermissions(user.role).subscribe(permission => {
                    // console.log(permission);
                    user.authdata = window.btoa(value.username + ':' + value.password);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('userpermission', JSON.stringify(permission));
                    localStorage.setItem('profile', '1');

                    // this.router.navigate([this.returnUrl]);
                    this.router.navigate(['/home']);
                });
                //
            } else {
                this.error = 'Wrong username or password';
                this.loading = false;
            }

           // return user;
        }, error => {
          console.log(error);
         if (error.statusText === 'Not Found') {
            this.error = 'Wrong username or password';
            this.loading = false;
          } else {
            this.error = 'Error during login';
            this.loading = false;
          }

        });
           /* .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });*/

    }

    ngOnInit() {
        // reset login status
        this.ecolService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }
}
