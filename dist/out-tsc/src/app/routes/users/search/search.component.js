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
import { FormBuilder, Validators } from '@angular/forms';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
var SearchComponent = /** @class */ (function () {
    function SearchComponent(fb, ecolService) {
        this.ecolService = ecolService;
        // Datepicker
        this.bsValue = new Date();
        this.maxDate = new Date();
        this.bsConfig = {
            containerClass: 'theme-angle'
        };
        this.buttonTitle = 'update user';
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
    SearchComponent.prototype.ngOnInit = function () {
        this.getbranches();
    };
    SearchComponent.prototype.submitForm = function ($ev, value) {
        $ev.preventDefault();
        // tslint:disable-next-line:forin
        for (var c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log('Valid!');
        }
        // console.log(value);
        this.putuser(value);
    };
    SearchComponent.prototype.putuser = function (body) {
        // console.log(body);
        this.ecolService.loader();
        this.ecolService.putuser(body).subscribe(function (data) {
            // console.log(data);
            swal('Successful!', 'user updated!', 'success');
        }, function (error) {
            // console.log(error);
            // this.buttonTitle = 'update user';
            swal('Error!', 'Error occurred during processing!', 'error');
        });
    };
    SearchComponent.prototype.search = function (username) {
        var _this = this;
        this.ecolService.loader();
        if (username) {
            this.ecolService.getuser(username).subscribe(function (data) {
                if (data.length > 0) {
                    _this.valForm.patchValue({
                        username: data[0].username,
                        firstname: data[0].firstname,
                        lastname: data[0].lastname,
                        surname: data[0].surname,
                        division: data[0].division,
                        team: data[0].team,
                        branch: data[0].branch,
                        email: data[0].email,
                        active: data[0].active,
                        expirydate: data[0].expirydate,
                        role: data[0].role
                    });
                    // success
                    swal('Successful!', 'user details retrieved!', 'success');
                    _this.buttonTitle = 'update user';
                }
                else {
                    swal('Warning!', 'No user found!', 'warning');
                    _this.buttonTitle = 'create user';
                    _this.valForm.patchValue({
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
            }, function (error) {
                console.log(error);
                swal('Error!', 'Error occurred during processing!', 'error');
                _this.buttonTitle = 'create user';
            });
        }
    };
    SearchComponent.prototype.getbranches = function () {
        var _this = this;
        this.ecolService.getbranches().subscribe(function (data) {
            // console.log(data);
            _this.branches = data;
        });
    };
    SearchComponent = __decorate([
        Component({
            selector: 'app-search',
            templateUrl: './search.component.html',
            styleUrls: ['./search.component.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder, EcolService])
    ], SearchComponent);
    return SearchComponent;
}());
export { SearchComponent };
//# sourceMappingURL=search.component.js.map