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

  public itemsDemands: Array<string> = ['demand1', 'demand2', 'prelisting', 'PostlistingSecured', 'PostlistingUnsecured', 'Day90', 'Day40', 'Day30',
    'prelistingremedial', 'overduecc', 'prelistingcc', 'suspension', 'PostlistingUnsecuredcc'];

  public items: Array<string> = ['613', '630', '9K3', '739', '6M4', '792', '601', '6M1', '6G6', '6J2', '649'];
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
      //onRowClicked: this.RowSelected,
    };
    
    http.get<any>(environment.api + '/api/autoletters').subscribe(resp => {
      this.rowData1 = resp;
    })
  }

  onRowClicked(event: any) { 
    this.new = false;
    this.model = event.node.data;
    this.model.lastupdateby = this.username;
    this.model.lastupdate = new Date();
  };

  onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;
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
    })
  }

  getData(){
    this.ecolService.getautoLetter().subscribe(res => {
      this.rowData1 = res;
    })
  }

  //postautoLetter
  
  addNew(form){
    const body = {
      "letterid": form.value.letterid,
      "memogroup": form.value.memogroup,
      "daysinarr": form.value.daysinarr,
      "lastupdate": new Date(),
      "lastupdateby": this.username,
      "active": true
    };
    // check duplicate
    this.ecolService.postcheckautoLetter(body).subscribe(resp => {
      //
      let reject = false;
      let acceptModel = []
      let rejectModel = []
      for(let i=0; i<resp.length; i++){
        if(resp[i].isduplicate == true){
          // add to reject
          reject = true
          rejectModel[i] = resp[i]
        } else {
          acceptModel[i] = resp[i]
        }
      }
      console.log('accept', acceptModel);
      console.log('reject', rejectModel);
      if(reject){
        // reject request
        swal('Error!', 'Request contains duplicates ... please correct and resubmit!', 'error');
      } else {
        // acccepts and post
        this.spinner.show();
        this.ecolService.postautoLetter(acceptModel).subscribe(data => {
          swal('Success!', 'Successfully added!', 'success');
          this.spinner.hide();
          this.getData();
        })
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
