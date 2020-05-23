import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
    selector: 'app-newcase',
    templateUrl: './newcase.component.html',
    styleUrls: ['./newcase.component.scss'],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class NewcaseComponent implements OnInit {
    model: any = {};
    selectedSimpleItem = ['OWNER', 'THIRD PARTY'];
    accounts: any = [];

    constructor(private ecolService: EcolService,
        private router: Router,
        private spinner: NgxSpinnerService, ) { }

    ngOnInit() {
    }

    onBlurMethod() {
        this.spinner.show();
        this.ecolService.accounts(this.model.custnumber).subscribe(accounts => {
            if (accounts.length > 0) {
                this.accounts = accounts;
                this.spinner.hide();
            } else {
                alert('No accounts found!');
                this.spinner.hide();
            }
        })
    }

    onBlurAccount() {
        this.spinner.show();
        if(this.model.custnumber == '') {
            return;
        }
        this.ecolService.accounts(this.model.custnumber).subscribe(account => {
            if (account) {
                this.model.custname = account[0].custname;
                this.model.rrocode = account[0].rrocode;
                this.model.oustbalance = account[0].oustbalance;
                this.spinner.hide();
            } else {
                alert('No accounts found!');
                this.spinner.hide();
            }
        }, error => {
            console.log(error);
            this.spinner.hide();
            alert('Error!');
        })
    }

    onSubmit(form) {
        // Loading indictor
        this.ecolService.loader();
        //
        const body = {
            propertyno: form.value.propertyno,
            openmarketvalue: form.value.omv,
            accnumber: form.value.accnumber,
            custnumber: form.value.custnumber,
            fileno: form.value.fileno,
            forcedsalevalue: form.value.fsv,
            dateinput: form.value.dateinput,
            owner: form.value.owner,
            custname: form.value.custname,
            ownership: form.value.ownership
        };
        this.ecolService.newmarketer(body).subscribe(data => {
            swal('Success!', 'saved successfully!', 'success');
        }, error => {
            console.log(error);
            swal('Error!', 'Error occurred during processing!', 'error');
        });
    }

    cancel() {
        // redirect to ListComponent
        this.router.navigate(['/marketors/allcases']);
    }

}
