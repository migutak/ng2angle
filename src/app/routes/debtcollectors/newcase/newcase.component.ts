import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';


@Component({
    selector: 'app-newcase',
    templateUrl: './newcase.component.html',
    styleUrls: ['./newcase.component.scss'],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class NewcaseComponent implements OnInit {
    model: any = {};
    selectedSimpleItem = ['NAIROBI', 'CENTRAL', 'COAST', 'WESTERN', 'RIFT VALLEY'];
    accounts: any = [];

    bsConfig = { 
        isAnimated: true,
        adaptivePosition: true,
        dateInputFormat: 'YYYY-MM-DD' 
    }

    constructor(
        private ecolService: EcolService,
        private router: Router,
        private spinner: NgxSpinnerService, 
        ) { }

    ngOnInit() {
        //
    }

    onBlurMethod() {
        this.spinner.show();
        if(this.model.custnumber == '' || this.model.custnumber==undefined) {
            this.spinner.hide();
            return;
        }
        this.ecolService.accounts(this.model.custnumber).subscribe(accounts => {
            if (accounts.length > 0) {
                this.accounts = accounts;
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

    onBlurAccount() {
        this.spinner.show();
        if(this.model.accnumber == '' || this.model.accnumber==undefined) {
            this.spinner.hide();
            return;
        }
        this.ecolService.account(this.model.accnumber).subscribe(account => {
            if (account) {
                this.model.custname = account.custname;
                this.model.rrocode = account.rrocode;
                this.model.oustbalance = account.oustbalance;
                this.model.address = account.addressline1;
                this.model.arocode = account.arocode;
                this.model.loansettlementacc = account.settleaccno;
                this.model.nationid = account.nationid;
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
            accbalance: form.value.oustbalance,
            loansettlementacc: form.value.loansettlementacc,
            accnumber: form.value.accnumber,
            custnumber: form.value.custnumber,
            fileno: form.value.fileno,
            arocode: form.value.arocode,
            rrocode: form.value.rrocode,
            region: form.value.region,
            dateinput: form.value.dateinput,
            owner: form.value.owner,
            custname: form.value.custname,
            address: form.value.address,
            nationid: form.value.nationid
        };
        // check if there exists a request
        this.ecolService.checkindebtcollector(body.accnumber).subscribe(resp => {
            if (resp && resp.length>0) {
                swal('Warning!', 'There exist a running Request for this account ' + body.accnumber, 'warning');
                return;
            } else {
                this.ecolService.newdebtcollector(body).subscribe(data => {
                    swal('Success!', 'saved successfully!', 'success');
                }, error => {
                    console.log(error);
                    swal('Error!', 'Error occurred during processing!', 'error');
                });
            }
        }, error => {
            console.log(error);
            return;
        })
        
    }

    cancel() {
        // redirect to ListComponent
        this.router.navigate(['/debtcollectors/allcases']);
    }

}
