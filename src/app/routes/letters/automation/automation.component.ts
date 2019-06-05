import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GridOptions } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
declare var $: any;


@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.scss']
})
export class AutomationComponent implements OnInit {

  resizeEvent = 'resize.ag-grid';
  $win = $(window);
  new = true;
  memos: any = [];

  gridOptions: GridOptions;

  // Basic example
  columnDefs = [
    /*{
      headerName: '',
      field: 'memogroup',
      cellRenderer: params => {
        return `<input type='checkbox' ${params.value ? 'checked' : 'true'} />`
      }
    },*/
    {
      headerName: 'Memo Group',
      field: 'memogroup',
      width: 150
    }, {
      headerName: 'Demand Letter',
      field: 'letterid',
      width: 120
    }, {
      headerName: 'Daysinarr',
      field: 'daysinarr',
      width: 90
    }, {
      headerName: 'Lastupdateby',
      field: 'lastupdateby',
      width: 90
    }, {
      headerName: 'Lastupdate',
      field: 'lastupdate',
      width: 100
    }];
  rowData1: any;
  // tslint:disable-next-line:max-line-length
  username: string;
  postModel: any = {};
  postBody: any = [];
  public singleData;

  // tslint:disable-next-line:max-line-length
  public itemsDemands: Array<string> = ['demand1', 'demand2', 'prelisting', 'PostlistingSecured', 'PostlistingUnsecured', 'Day90', 'Day40', 'Day30',
    'prelistingremedial', 'overduecc', 'prelistingcc', 'suspension', 'PostlistingUnsecuredcc'];
  // public items: Array<string> = [];
  public items: Array<string> = ['07', '09', '100', '102', '103', '105', '106', '108', '109', '11',
  '111', '112', '113', '114', '116', '117', '118', '120', '121', '122', '123', '124',
  '125',
  '126',
  '127',
  '128',
  '129',
  '13', '130', '131', '132', '134', '135', '136',
  '137',
  '138',
  '139',
  '14',
  '141',
  '142',
  '143',
  '145',
  '146',
  '147',
  '148',
  '149',
  '150',
  '154',
  '16',
  '161',
  '17',
  '175',
  '190',
  '191',
  '192',
  '23',
  '24',
  '240',
  '241',
  '244',
  '245',
  '246',
  '247',
  '248',
  '249',
  '25',
  '281',
  '600',
  '601',
  '602',
  '603',
  '604',
  '605',
  '606',
  '607',
  '608',
  '609',
  '611',
  '612',
  '613',
  '614',
  '616',
  '617',
  '618',
  '619',
  '620',
  '621',
  '622',
  '623',
  '626',
  '627',
  '629',
  '630',
  '631',
  '633',
  '634',
  '635',
  '637',
  '638',
  '639',
  '641',
  '642',
  '644',
  '647',
  '648',
  '649',
  '650',
  '651',
  '652',
  '653',
  '654',
  '655',
  '656',
  '657',
  '658',
  '661',
  '667',
  '670',
  '671',
  '672',
  '673',
  '674',
  '675',
  '676',
  '677',
  '678',
  '679',
  '680',
  '683',
  '689',
  '690',
  '691',
  '692',
  '694',
  '698',
  '6A0',
  '6A8',
  '6B0',
  '6B3',
  '6B7',
  '6B8',
  '6B9',
  '6C3',
  '6C4',
  '6C7',
  '6C8',
  '6D0',
  '6D1',
  '6D3',
  '6D5',
  '6E1',
  '6E2',
  '6E3',
  '6E6',
  '6E7',
  '6F2',
  '6F3',
  '6F4',
  '6F6',
  '6F7',
  '6F9',
  '6FA',
  '6G0',
  '6G1',
  '6G2',
  '6G3',
  '6G4',
  '6G5',
  '6G6',
  '6G7',
  '6G9',
  '6GA',
  '6H0',
  '6H1',
  '6H2',
  '6J0',
  '6J1',
  '6J2',
  '6J3',
  '6J5',
  '6J6',
  '6J8',
  '6K3',
  '6K4',
  '6K6',
  '6K9',
  '6L1',
  '6L2',
  '6L4',
  '6L5',
  '6L7',
  '6L8',
  '6L9',
  '6M0',
  '6M1',
  '6M2',
  '6M3',
  '6M4',
  '6M5',
  '6M6',
  '6M7',
  '6M8',
  '6M9',
  '6MA',
  '6N1',
  '6N3',
  '6N6',
  '6N7',
  '6N8',
  '6N9',
  '6P0',
  '6P1',
  '6P4',
  '6P5',
  '6P6',
  '6P8',
  '6P9',
  '700',
  '704',
  '705',
  '706',
  '723',
  '737',
  '744',
  '784',
  '789',
  '792',
  '793',
  '794',
  '796',
  '797',
  '798',
  '7A0',
  '7A3',
  '7A4',
  '7A5',
  '7B0',
  '7B1',
  '7M3',
  '7N7',
  '9D3',
  '9E7',
  '9E9',
  '9J3',
  '9J4',
  '9J5',
  '9J6',
  '9J8',
  '9J9',
  '9K1',
  '9K2',
  '9K3',
  '9K4',
  'T22'];
  model: any = {};
  dataList: any;

  constructor(
    private ecolService: EcolService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    http: HttpClient
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

    http.get<any>(environment.api + '/api/autoletters').subscribe(resp => {
      this.rowData1 = resp;
    });
  }

  onRowClicked(event: any) {
    this.new = false;
    this.model = event.node.data;
    this.model.lastupdateby = this.username;
    this.model.lastupdate = new Date();
    this.model.active = (event.node.data.active).toLowerCase() === 'true' ? true : false;
  }

  onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    // get memos
    // this.getMemos();
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

  fneditSubmit(form) {
    this.spinner.show();
    this.ecolService.putautoLetter(this.model).subscribe(resp => {
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
    this.ecolService.getautoLetter().subscribe(res => {
      this.rowData1 = res;
    });
  }

  getMemos() {
    this.ecolService.getmemo().subscribe(res => {
      console.log(res.length);
      this.memos = res;
      for (let i = 0; i <= 253; i ++) {
        this.items.push(res[i].memo) ;
      }
      console.log('Array==>', this.items);
    });
  }

  // postautoLetter

  addNew(form) {
    const body = {
      'letterid': form.value.letterid,
      'memogroup': form.value.memogroup,
      'daysinarr': form.value.daysinarr,
      'lastupdate': new Date(),
      'lastupdateby': this.username,
      'active': true
    };
    // check duplicate
    this.ecolService.postcheckautoLetter(body).subscribe(resp => {
      //
      let reject = false;
      const acceptModel = [];
      const rejectModel = [];
      for (let i = 0; i < resp.length; i++) {
        if (resp[i].isduplicate === true) {
          // add to reject
          reject = true;
          rejectModel[i] = resp[i];
        } else {
          acceptModel[i] = resp[i];
        }
      }
      if (reject) {
        // reject request
        swal('Error!', 'Request contains duplicates!', 'error');
        swal({
          type: 'error',
          title: 'Duplicates detected...',
          text:   JSON.stringify(rejectModel),
          footer: '<a href>Find help on this issue?</a>'
        });
      } else {
        // acccepts and post
        this.spinner.show();
        this.ecolService.postautoLetter(acceptModel).subscribe(data => {
          swal('Success!', 'Successfully added!', 'success');
          this.spinner.hide();
          this.getData();
        });
      }
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during processing!', 'error');
    });
  }


  editSubmit(form) {
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
        this.fneditSubmit(form);
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
