import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { GridOptions } from '@ag-grid-community/all-modules';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as _ from 'lodash';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-sp',
  templateUrl: './sp.component.html',
  styleUrls: ['./sp.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class SpComponent implements OnInit {

  resizeEvent = 'resize.ag-grid';
  $win = $(window);
  new = true;
  memos: any = [];
  outdata = [];

  gridOptions: GridOptions;
  modules = AllModules;

  // Basic example
  columnDefs = [
    {
      headerName: 'Service Provider',
      field: 'SPTITLE',
      width: 150
    }, {
      headerName: 'Contact',
      field: 'CONTACTPERSON',
      width: 120
    }, {
      headerName: 'Telephone',
      field: 'TELEPHONE',
      width: 90
    }, {
      headerName: 'Startdate',
      field: 'STARTDATE',
      width: 90
    }, {
      headerName: 'Endofindemnity',
      field: 'ENDOFINDEMNITY',
      width: 100
    }];
  rowData1: any;
  // tslint:disable-next-line:max-line-length
  username: string;
  postModel: any = {};
  postBody: any = [];
  public singleData;

  // tslint:disable-next-line:max-line-length
  public itemsDemands: Array<string> = ['sms1', 'sms2', 'sms3'];
  // public items: Array<string> = [];
  public items: Array<string> = [];
  model: any = {};
  dataList: any;

  @ViewChild('myInput')
  myInputVariable: ElementRef;

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
      rowSelection: 'single',
      // onRowClicked: this.RowSelected,
    };

    http.get<any>(environment.api + '/api/sptypes').subscribe(resp => {
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
    this.http.get<any>(environment.api + '/api/sptypes').subscribe(resp => {
      this.rowData1 = resp;
    });
  }



  editSubmit(form) {
    const body = {
      'SPTITLE': this.model.SPTITLE,
      'CONTACTPERSON': form.value.CONTACTPERSON,
      'TELEPHONE': form.value.TELEPHONE,
      'SPCODE': form.value.SPCODE,
      'STARTDATE': moment(form.value.STARTDATE).format('DD-MMM-YYYY'),
      'ACCNUMBER': form.value.ACCNUMBER,
      'COVERAGE': form.value.COVERAGE,
      'ADDRESS': form.value.ADDRESS,
      'ENDOFINDEMNITY': form.value.ENDOFINDEMNITY,
      'EMAIL': form.value.EMAIL,
      'ACTIVE': 'Y'
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
      if (!this.outdata[0].SPCODE || !this.outdata[0].SPTITLE || !this.outdata[0].TELEPHONE) {
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
        text: 'Confirm you want to upload Service Provider(s)',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Upload'
      }).then((result) => {
        if (result.value) {
          this.ecolService.loader();

          this.ecolService.sptypes(this.outdata).subscribe(events => {
            swal({
              type: 'success',
              title: 'ALL Good',
              text: 'S.P successfully added!',
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
          this.myInputVariable.nativeElement.value = '';
          document.getElementById('output').innerHTML = '';
          return;
          swal.close();
        }
      });

    };
    reader.readAsBinaryString(file);
  }

  downloadFile() {
    const template = environment.sptemplate;
    this.ecolService.downloadFile(template).subscribe(data => {
      saveAs(data, 'ECollect_service_provider_upload_template.xlsx');
    }, error => {
      console.log(error);
      swal('Error!', ' Cannot download template  file!', 'error');
    });
  }

  eventCheck(event) {
    if(event.target.checked) {
      this.http.get<any>(environment.api + '/api/sptypes/expired').subscribe(resp => {
        this.rowData1 = resp;
      });
    } else {
      this.http.get<any>(environment.api + '/api/sptypes').subscribe(resp => {
        this.rowData1 = resp;
      });
    }
  }

}
