import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-newcase',
    templateUrl: './newcase.component.html',
    styleUrls: ['./newcase.component.scss'],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class NewcaseComponent implements OnInit {
    accounts: any = [];
    sptypes = [];
    data: any = {};
    minDate: Date;

    bsConfig = { 
        isAnimated: true,
        adaptivePosition: true,
        dateInputFormat: 'YYYY-MM-DD' 
    }

    constructor(
        private ecolService: EcolService,
        private router: Router,
        private spinner: NgxSpinnerService, 
        private http: HttpClient,
        ) {
            this.minDate = new Date();
            this.minDate.setDate(this.minDate.getDate() - 1);
        }

    ngOnInit() {
        // get sptypes
        this.ecolService.getallsptype().subscribe(data => {
            this.sptypes = data;
        });
    }

    changeSptype(type) {
        this.http
            .get(
                environment.api + '/api/sptypes?filter[where][SPTITLE]=' + type
            )
            .subscribe(data => {
               this.data.spaccount = data[0].ACCNUMBER
            });
    }

    onBlurMethod() {
        this.spinner.show();
        if(this.data.custnumber == '' || this.data.custnumber==undefined) {
            this.spinner.hide();
            return;
        }
        this.ecolService.accounts(this.data.custnumber).subscribe(accounts => {
            if (accounts.length > 0) {
                this.accounts = accounts;
                this.spinner.hide();
            } else {
                swal('Warning!', 'No account found for customer ' + this.data.custnumber, 'success');
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
        if(this.data.accnumber == '' || this.data.accnumber==undefined) {
            this.spinner.hide();
            return;
        }
        this.ecolService.account(this.data.accnumber).subscribe(account => {
            if (account) {
                this.data.custname = account.custname;
                this.data.rrocode = account.rrocode;
                this.data.arocode = account.arocode;
                this.spinner.hide();
            } else {
                swal('Warning!', 'A/C Details not found for  ' + this.data.accnumber, 'success');
                this.spinner.hide();
            }
        }, error => {
            console.log(error);
            this.spinner.hide();
            alert('Error!');
        })
    }

    addinvocefunc(form) {
        // Loading indictor
        this.ecolService.loader();
        //
        const body = {
            sptitle: form.value.sptitle,
            custname: form.value.custname,
            accnumber: form.value.accnumber,
            custnumber: form.value.custnumber,
            spaccount: form.value.spaccount,
            arocode: form.value.arocode,
            rrocode: form.value.rrocode,
            feenotedate: form.value.feenotedate,
            dateinput: form.value.dateinput,
            feenoteamnt: form.value.feenoteamnt,
            method: form.value.method
        };
        this.ecolService.newinvoice(body).subscribe(data => {
            swal('Success!', 'saved successfully!', 'success');
            this.router.navigate(['/invoices/allcases']);
        }, error => {
            console.log(error);
            swal('Error!', 'Error occurred during processing!', 'error');
        });
        
    }

    cancel() {
        // redirect to ListComponent
        this.router.navigate(['/invoices/allcases']);
    }

}
