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
var BranchesComponent = /** @class */ (function () {
    function BranchesComponent(fb, ecolService) {
        this.ecolService = ecolService;
        this.submitted = false;
        this.model = {};
        this.branchForm = fb.group({
            'branchcode': [null, Validators.required],
            'branchname': [null, Validators.required],
            'manager': [null, Validators.required],
            'branchemail': [null],
            'region': [null],
            'regsme': [null],
            'regsacco': [null],
            'regportfolio': [null],
            'regpbb': [null],
            'regmortage': [null],
            'regmicrocredit': [null],
            'regagribusiness': [null],
            'regassetfinance': [null],
            'regcorporate': [null],
            'regipf': [null]
        });
    }
    BranchesComponent.prototype.ngOnInit = function () {
        this.getbranches();
    };
    Object.defineProperty(BranchesComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.branchForm.controls; },
        enumerable: true,
        configurable: true
    });
    BranchesComponent.prototype.submitForm = function ($ev, value) {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.branchForm.invalid) {
            return;
        }
        this.ecolService.loader();
        this.ecolService.putbranch(value).subscribe(function (res) {
            swal('Successful!', 'Branch set!', 'success');
            _this.getbranches();
        }, function (error) {
            console.log(error);
            swal('Error!', 'Exception occured!', 'error');
        });
    };
    BranchesComponent.prototype.getbranches = function () {
        var _this = this;
        this.ecolService.getbranches().subscribe(function (response) {
            _this.branches = response;
        }, function (error) {
            console.log(error);
        });
    };
    BranchesComponent.prototype.putbranch = function (branch) {
        this.ecolService.putbranch(branch).subscribe(function (response) {
            // success
        }, function (error) {
            console.log(error);
        });
    };
    BranchesComponent.prototype.update = function (b) {
        this.branchForm.setValue({
            branchcode: b.branchcode,
            branchname: b.branchname,
            manager: b.manager,
            branchemail: b.branchemail,
            region: b.region,
            regsme: b.regsme,
            regsacco: b.regsacco,
            regportfolio: b.regportfolio,
            regpbb: b.regpbb,
            regmortage: b.regmortage,
            regmicrocredit: b.regmicrocredit,
            regagribusiness: b.regagribusiness,
            regassetfinance: b.regassetfinance,
            regcorporate: b.regcorporate,
            regipf: b.regipf
        });
    };
    /*
  
    this.myFormGroup.patchValue({
      formControlName1: myValue1,
      // formControlName2: myValue2 (can be omitted)
    });*/
    BranchesComponent.prototype.onSearch = function () {
        var _this = this;
        this.ecolService.searchbranch(this.model.searchText).subscribe(function (res) {
            _this.branches = res;
        }, function (error) {
            console.log(error);
            swal('Error!', 'Exception occured!', 'error');
        });
    };
    BranchesComponent.prototype.reset = function () {
        var _this = this;
        this.ecolService.getbranches().subscribe(function (res) {
            _this.branches = res;
        }, function (error) {
            console.log(error);
            swal('Error!', 'Exception occured!', 'error');
        });
    };
    BranchesComponent = __decorate([
        Component({
            selector: 'app-branches',
            templateUrl: './branches.component.html',
            styleUrls: ['./branches.component.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder, EcolService])
    ], BranchesComponent);
    return BranchesComponent;
}());
export { BranchesComponent };
//# sourceMappingURL=branches.component.js.map