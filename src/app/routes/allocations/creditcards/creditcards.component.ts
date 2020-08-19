import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { GridOptions } from '@ag-grid-community/all-modules';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import swal from 'sweetalert2';
import { EcolService } from '../../../services/ecol.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-creditcards',
  templateUrl: './creditcards.component.html',
  styleUrls: ['./creditcards.component.scss']
})
export class CreditcardsComponent implements OnInit {

  resizeEvent = 'resize.ag-grid';
  $win = $(window);
  new = true;
  memos: any = [];
  gridOptions: GridOptions;
  modules = AllModules;
  username: string;
  model: any = {};
  users:[];

  columnDefs = [
    {
      headerName: 'Cycle',
      field: 'cycle',
      width: 150
    }, {
      headerName: 'Colofficer',
      field: 'colofficer'
    }];
  rowData1: any;

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

    this.getData();
  }
 
  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.getUsers();
  }

  gridReady(params) {
    params.api.sizeColumnsToFit();
    this.$win.on(this.resizeEvent, () => {
      setTimeout(() => { params.api.sizeColumnsToFit(); });
    });
  }

  onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  onRowClicked(event: any) {
    this.new = false;
    this.model = event.node.data;
    this.model.lastupdateby = this.username;
    this.model.lastupdate = new Date();
    // this.model.active = (event.node.data.active).toLowerCase() === 'true' ? true : false;
  }

  getUsers() {
    this.http.get<any>(environment.api + '/api/tblusers?filter[where][team]=CREDITCARDS').subscribe(resp => {
      this.users = resp;
    });
  }

  Submit(form) {
    const body = {
      'cycle': form.value.memogroup,
      'colofficer': form.value.productcode
    };
    swal({
      title: 'Are you sure?',
      text: 'You want to add new cycle allocation?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Add!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.http.post(environment.api + '/api/tbl_allocations_cycles', body).subscribe(resp => {
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

  getData() {
    this.http.get<any>(environment.api + '/api/tbl_allocations_cycles').subscribe(resp => {
      this.rowData1 = resp;
    });
  }

}
