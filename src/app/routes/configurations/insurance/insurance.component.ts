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
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
  gridOptions: GridOptions;
  modules = AllModules;

  // Basic example
  columnDefs = [
    {
      headerName: 'insurancename',
      field: 'insurancename',
      width: 150
    }, {
      headerName: 'physicaladdress',
      field: 'physicaladdress',
      width: 120
    }, {
      headerName: 'postaladdress',
      field: 'postaladdress',
      width: 90
    }, {
      headerName: 'emailaddress',
      field: 'emailaddress',
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

    http.get<any>(environment.api + '/api/pmt_insurance').subscribe(resp => {
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
    this.ecolService.put_insurance(body).subscribe(resp => {
      swal('Success!', 'Update successful!', 'success');
      this.getData();
      this.spinner.hide();
      //update to mysql
      this.ecolService.put_pmt_insurance(body).subscribe(mysqlresp => {
        this.getData();
      }, error => {console.log(error);})
    }, error => {
      console.log(error);
      swal('Eror!', 'Update was not completed!', 'error');
      this.spinner.hide();
    });
  }

  getData() {
    this.http.get<any>(environment.api + '/api/pmt_insurance').subscribe(resp => {
      this.rowData1 = resp;
    });
  }

  Submit(form) {
    const body = {
      'insuranceName': form.value.insuranceName,
      'physicalAddress': form.value.physicalAddress,
      'postalAddress': form.value.postalAddress,
      'emailAddress': form.value.emailAddress,
      'telNumber': form.value.telNumber,
      'contactPerson': form.value.contactPerson,
      'updateBy': this.username
    };
    swal({
      title: 'Are you sure?',
      text: 'You want to add new insurance company?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Add!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.ecolService.post_insurance(body).subscribe(resp => {
          swal('Success!', 'Successfully added!', 'success');
          this.getData();
          this.spinner.hide();
          //add to mysql
          this.ecolService.post_pmt_insurance(resp).subscribe(mysqlresp => {
            this.getData();
          }, error => {console.log(error);})
        }, error => {
          console.log(error);
          swal('Eror!', 'Update was not completed!', 'error');
          this.spinner.hide();
        });
      }
    });
  }

  editSubmit(form) {
    const body = {
      'id': this.model.id,
      'insuranceName': form.value.insuranceName,
      'physicalAddress': form.value.physicalAddress,
      'postalAddress': form.value.postalAddress,
      'emailAddress': form.value.emailAddress,
      'telNumber': form.value.telNumber,
      'contactPerson': form.value.contactPerson,
      'updateBy': form.value.updateBy
    };
    swal({
      title: 'Are you sure?',
      text: 'You want to update ' + form.value.INSURANCENAME + '?',
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

  onFileChange(ev) {
    const xfile = ev.target.files[0];
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      if (!jsonData.Sheet1) {
        swal({
          type: 'error',
          title: 'Empty Values',
          text: 'Wrong sheet name',
        });
        return;
      }
      this.outdata = jsonData.Sheet1;
      if(this.outdata.length==0){
        swal({
          type: 'error',
          title: 'Empty Values',
          text: 'Sheet is empty',
        });
        return;
      }
      if (!this.outdata[0].telnumber || !this.outdata[0].insurancename || !this.outdata[0].physicaladdress || !this.outdata[0].postaladdress || !this.outdata[0].emailaddress) {
        swal({
          type: 'error',
          title: 'Empty Values',
          text: 'Wrong field name',
        });
        return;
      }

      swal({
        title: 'Confirmation',
        imageUrl: 'assets/img/user/coop.jpg',
        text: 'Confirm you want to upload Insurance Co(s)',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Upload'
      }).then((result) => {
        if (result.value) {
          this.ecolService.loader();

          this.ecolService.post_pmt_insurance(this.outdata).subscribe(events => {
            swal({
              type: 'success',
              title: 'ALL Good',
              text: 'Insurance successfully added!',
            });

            // refresh list
            this.getData();

          }, error => {
            console.log(error);
            swal({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong with s.p upload!',
            });
          });
        } else {
          swal.close();
          return;
          
        }
      });

    };
    reader.readAsBinaryString(file);
  }

  downloadFile() {
    const template = environment.insurancetemplate;
    this.ecolService.downloadFile(template).subscribe(data => {
      saveAs(data, 'ECollect_insurance_upload_template.xlsx');
    }, error => {
      console.log(error);
      swal('Error!', ' Cannot download template  file!', 'error');
    });
  }
}
