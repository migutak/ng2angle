var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import { environment } from '../../../../environments/environment';
var ADLOGIN = environment.adlogin;
var LoginComponent = /** @class */ (function () {
    function LoginComponent(settings, fb, ecolService, router, route) {
        this.settings = settings;
        this.ecolService = ecolService;
        this.router = router;
        this.route = route;
        this.loading = false;
        this.submitted = false;
        this.error = '';
        this.menuArray = ['Home'];
        this.valForm = fb.group({
            // 'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'username': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }
    LoginComponent.prototype.submitForm = function ($ev, value) {
        var _this = this;
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
        // AD login
        if (ADLOGIN) {
            var body = {
                username: value.username,
                password: value.password
            };
            this.ecolService.auth(body).subscribe(function (response) {
                console.log(response);
                if (response.auth) {
                    // get user
                    _this.getuser(value.username, value.password);
                }
                else {
                    _this.error = 'Wrong username and/or password';
                    _this.loading = false;
                }
            }, function (error) {
                console.log(error);
                _this.error = 'Error during login';
                _this.loading = false;
            });
        }
        else {
            this.getuser(value.username, value.password);
        }
    };
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.ecolService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.getuser = function (username, password) {
        var _this = this;
        this.ecolService.login(username).subscribe(function (user) {
            if (user !== null || user !== undefined) {
                // store user details and basic auth credentials in local storage
                // to keep user logged in between page refreshes
                // get user permissions
                _this.ecolService.getpermissions(user.role).subscribe(function (permission) {
                    // console.log(permission);
                    user.authdata = window.btoa(username + ':' + password);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('userpermission', JSON.stringify(permission));
                    localStorage.setItem('profile', '1');
                    // this.router.navigate([this.returnUrl]);
                    _this.router.navigate(['/home']);
                });
                //
            }
            else {
                _this.error = 'User not created on E-Collect';
                _this.loading = false;
            }
            // return user;
        }, function (error) {
            console.log(error);
            if (error.statusText === 'Not Found') {
                _this.error = 'User not created on E-Collect';
                _this.loading = false;
            }
            else {
                _this.error = 'Error during login';
                _this.loading = false;
            }
        });
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss', './style.css'] //
        }),
        __metadata("design:paramtypes", [SettingsService,
            FormBuilder,
            EcolService,
            Router,
            ActivatedRoute])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map