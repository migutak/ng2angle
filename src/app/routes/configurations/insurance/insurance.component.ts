import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {GridOptions} from '@ag-grid-community/all-modules';
import {AllModules} from '@ag-grid-enterprise/all-modules';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class InsuranceComponent implements OnInit {

  resizeEvent = 'resize.ag-grid';
  $win = $(window);
  new = true;
  memos: any = [];

  gridOptions: GridOptions;
  modules = AllModules;

  // Basic example
  columnDefs = [
    {
      headerName: 'insuranceName',
      field: 'insuranceName',
      width: 150
    }, {
      headerName: 'physicalAddress',
      field: 'physicalAddress',
      width: 120
    }, {
      headerName: 'postalAddress',
      field: 'postalAddress',
      width: 90
    }, {
      headerName: 'emailAddress',
      field: 'emailAddress',
      width: 90
    }, {
      headerName: 'telnumber',
      field: 'telnumber',
      width: 100
    }];
  rowData1: any;
  // tslint:disable-next-line:max-line-length
  username: string;
  postModel: any = {};
  postBody: any = [];
  public singleData;
  public items: Array<string> = [];
  model: any = {};
  dataList: any;

  constructor(
    private ecolService: EcolService,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) {
    // Basic example
    this.gridOptions = <GridOptions>{
      headerHeight: 40,
      columnDefs: this.columnDefs,
      rowData: null,
      enableFilter: true,
      rowSelection: 'single'
    };

    http.get<any>(environment.api + '/api/insurance').subscribe(resp => {
      this.rowData1 = resp;
    });
  }

  onRowClicked(event: any) {
    this.new = false;
    this.model = event.node.data;
    this.model.lastupdateby = this.username;
    this.model.lastupdate = new Date();
    // this.model.active = (event.node.data.active).toLowerCase() === 'true' ? true : false;
  }

  onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    
  }

  gridReady(params) {
    params.api.sizeColumnsToFit();
    this.$win.on(this.resizeEvent, () => {
      setTimeout(() => { params.api.sizeColumnsToFit(); });
    });
  }

  shownew() {
    this.new = true;
    this.model = {};
  }

  fneditSubmit(body) {
    this.spinner.show();
    this.ecolService.putsptype(body).subscribe(resp => {
      swal('Success!', 'Update successful!', 'success');
      this.getData();
      this.spinner.hide();
    }, error => {
      console.log(error);
      swal('Eror!', 'Update was not completed!', 'error');
      this.spinner.hide();
    });
  }

  getData() {
    this.http.get<any>(environment.api + '/api/insurance').subscribe(resp => {
      this.rowData1 = resp;
    });
  }

  

   editSubmit(form) {
    const body = {
      //'id': this.model.SPTITLE,
      'insuranceName': form.value.insuranceName,
      'physicalAddress': form.value.physicalAddress,
      'postalAddress': form.value.postalAddress,
      'emailAddress': form.value.emailAddress,
      'telnumber': form.value.telnumber,
      'contactPerson': form.value.contactPerson,
      'updateBy': form.value.updateBy
    };
    swal({
      title: 'Are you sure?',
      text: 'You want to Update!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update!'
    }).then((result) => {
      if (result.value) {
        this.fneditSubmit(body);
      }
    });
  }

  delete() {
    swal({
      title: 'Are you sure?',
      text: 'You want to DELETE!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.value) {
        //
      }
    });
  }
}
