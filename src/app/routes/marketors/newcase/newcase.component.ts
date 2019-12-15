import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import * as _ from 'lodash';


@Component({
    selector: 'app-newcase',
    templateUrl: './newcase.component.html',
    styleUrls: ['./newcase.component.scss'],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class NewcaseComponent implements OnInit {
    model: any = {};
    selectedSimpleItem = ['OWNER', 'THIRD PARTY'];
    accounts: any = [
        {accnumber: '000000000'}
    ];

    constructor(private ecolService: EcolService, private router: Router) { }

    ngOnInit() {
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
            swal('Successful!', 'saved successfully!', 'success');
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
