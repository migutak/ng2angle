
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { GridOptions } from '@ag-grid-community/all-modules';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
declare var $: any;
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-memogroups',
  templateUrl: './memogroups.component.html',
  styleUrls: ['./memogroups.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class MemogroupsComponent implements OnInit {

  resizeEvent = 'resize.ag-grid';
  $win = $(window);
  new = true;
  memos: any = [];
  gridOptions: GridOptions;
  modules = AllModules;
  additionalcriteriatrue: boolean = true;
  coopflagtrue: boolean = true;
  facilityamounttrue: boolean = true;
  primaryremedialunittrue: boolean = true;

  // Basic example
  columnDefs = [
    {
      headerName: 'memogroup',
      field: 'memogroup',
      width: 150
    }, {
      headerName: 'productcode',
      field: 'productcode'
    }, {
      headerName: 'businessunit',
      field: 'businessunit'
    }, {
      headerName: 'remedialunit',
      field: 'remedialunit'
    }, {
      headerName: 'shared',
      field: 'vshared'
    }, {
      headerName: 'additionalcriteria',
      field: 'additionalcriteria'
    }, {
      headerName: 'coopflag',
      field: 'coopflag'
    }, {
      headerName: 'facilityamount',
      field: 'facilityamount'
    }, {
      headerName: 'primaryremedialunit',
      field: 'primaryremedialunit'
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
  outdata = [];

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

    http.get<any>(environment.nodeapi + '/tbl_allocations_memogroups').subscribe(resp => {
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
    this.ecolService.patch_tbl_allocations_memogroups(body).subscribe(resp => {
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
    this.http.get<any>(environment.nodeapi + '/tbl_allocations_memogroups').subscribe(resp => {
      this.rowData1 = resp;
    });
  }

  Submit(form) {
    const body = {
      'memogroup': form.value.memogroup,
      'productcode': form.value.productcode,
      'businessunit': form.value.businessunit,
      'remedialunit': form.value.remedialunit,
      'vshared': form.value.vshared,
      'lastupdateby': this.username
    };
    swal({
      title: 'Are you sure?',
      text: 'You want to add new memo group?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Add!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.ecolService.post_tbl_allocations_memogroups(body).subscribe(resp => {
          swal('Success!', 'Successfully added!', 'success');
          this.getData();
          this.spinner.hide();
        }, error => {
          console.log(error);
          swal('Error!', 'Update was not completed!', 'error');
          this.spinner.hide();
        });
      }
    });
  }

  editSubmit(form) {
    const body = {
      'memogroup': form.value.memogroup,
      'poductcode': form.value.poductcode,
      'businessunit': form.value.businessunit,
      'remedialunit': form.value.remedialunit,
      'vshared': form.value.vshared,
      'lastupdateby': form.value.updateby,
      'additionalcriteria': form.value.additionalcriteria,
      'coopflag': form.value.coopflag,
      'facilityamount': form.value.facilityamount,
      'primaryremedialunit': form.value.primaryremedialunit
    };
    swal({
      title: 'Are you sure?',
      text: 'You want to update ' + form.value.memogroup + '?',
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


  onSharedSelected(value: string) {
    if (value === 'y') {
      this.additionalcriteriatrue = false;
    } else {
      this.additionalcriteriatrue = true;
      this.model.additionalcriteria = 'none'
    }
  }


  additionalcriteriaSelected(value: string) {
    if (value === 'coopflag') {
      this.coopflagtrue = false;
      this.facilityamounttrue = true;
      this.primaryremedialunittrue = false;
      this.model.facilityamount = 0;
      this.model.primaryremedialunit = '';
      this.model.coopflag = '';
    } else if (value === 'none') {
      this.coopflagtrue = true;
      this.facilityamounttrue = true;
      this.primaryremedialunittrue = true;
      this.model.facilityamount = 0;
      this.model.primaryremedialunit = '';
      this.model.coopflag = '';
    } else {
      this.coopflagtrue = true;
      this.facilityamounttrue = false;
      this.primaryremedialunittrue = false;
      this.model.facilityamount = 0;
      this.model.primaryremedialunit = '';
      this.model.coopflag = '';
    }
  }

}

