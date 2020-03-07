import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
// import { HttpClient} from '@angular/common/http';
import {AllModules} from '@ag-grid-enterprise/all-modules';
import {NgxSmartModalService} from 'ngx-smart-modal';
import swal from 'sweetalert2';
import {EcolService} from '../../../services/ecol.service';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {GridOptions} from '@ag-grid-community/all-modules';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {

  public gridApi;
  public gridColumnApi;
  private statusBar;
  public gridOptions: GridOptions;
  public columnDefs;
  public defaultColDef;
  public rowModelType;
  public cacheBlockSize;
  public maxBlocksInCache;
  public rowData: [];
  public sortingOrder;
  private str: string;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  username: string;
  searchText: string;
  model: any = {};
  pivotPanelShow = true;
  insuranceid: string;
  insurancename: string;
  physicaladdress: string;
  postaladdress: string;
  emailaddress: string;
  contactperson: string;

  editnoteForm: FormGroup;
  editinsurancename: any;

  modules = AllModules;

  constructor(public ngxSmartModalService: NgxSmartModalService, private ecolService: EcolService, private rout: Router,
              private formBuilder: FormBuilder, public http: HttpClient) {
    this.gridOptions = <GridOptions>{


      // suppressCellSelection: true,


      // domLayout: 'autoHeight',
      rowSelection: 'single',
      rowModelType: 'normal',
      // rowModelType: 'infinite',

      pagination: true,
      paginationPageSize: 20,

      onGridReady: (params) => {

        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        // params.api.sizeColumnsToFit();
        // this.gridApi.setDatasource(this.dataSource);
        // environment.api + '/api/tqall/paged/myallocation?colofficer=' + this.username
        this.http
          .get(environment.api + '/api/tqall/insurance')
          .subscribe(resp => {
            console.log(typeof resp); // to check whether object or array
            this.str = JSON.stringify(resp, null, 4);
            const obj: any = JSON.parse(this.str);

            params.api.setRowData(obj.rows);
            // params.api.refreshCells({force : true});

          });
        // function change() {
        //   params.api.setRowData(data);
        //   gridOptions.api.refreshCells({force : true});
        // }


      }

    };


    this.columnDefs = [
      {
        headerName: 'Edit',
        cellRenderer: function (params) {
          if (params.value === undefined) {
            return '<i title="Edit Insurance" style="cursor: pointer" class="fas fa-edit fa-lg"></i>';
          } else {
            return ''; // <img src="assets/img/user/loading.gif" alt="Loading Icon">

            // <a  href="#" target="_blank">' + params.value + '</a>
          }
        },
      },
      {
        field: 'INSURANCENAME',
        // cellRenderer: function (params) {
        //   if (params.value !== undefined) {
        //     return '<a  href="#" target="_blank">' + params.value + '</a>';
        //   } else {
        //     return ''; // <img src="assets/img/user/loading.gif" alt="Loading Icon">
        //   }
        // },
        filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, resizable: true
      },
      {field: 'PHYSICALADDRESS', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, resizable: true},
      {field: 'POSTALADDRESS', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, resizable: true},
      {field: 'EMAILADDRESS', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, resizable: true},
      {field: 'CONTACTPERSON', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, resizable: true},
      // tslint:disable-next-line:max-line-length
      {
        field: 'DATEOFENTRY',
        filter: 'agTextColumnFilter',
        filterParams: {newRowsAction: 'keep'},
        resizable: true,
        valueFormatter: this.dateFormatter,
      },

      // tslint:disable-next-line:max-line-length
      {
        field: 'DATEOFLASTUPDATE',
        filter: 'agTextColumnFilter',
        filterParams: {newRowsAction: 'keep'},
        resizable: true,
        valueFormatter: this.dateFormatter,
      },
    ];
    this.defaultColDef = {
      width: 120,
      resizable: true,
      sortable: true,
      floatingFilter: true,
      unSortIcon: true,
      suppressResize: false,
      enableRowGroup: true,
      enablePivot: true,
      pivot: true
    };
    this.sortingOrder = ['desc', 'asc', null ];
    this.defaultColDef = {
      width: 120,
      resizable: true,
      sortable: true,
      floatingFilter: true,
      unSortIcon: true,
      suppressResize: false,
      enableRowGroup: true,
      enablePivot: true,
      pivot: true
    };
    this.statusBar = {
      statusPanels: [
        {
          statusPanel: 'agTotalAndFilteredRowCountComponent',
          align: 'left'
        },
        {
          statusPanel: 'agTotalRowCountComponent',
          align: 'center'
        },
        {statusPanel: 'agFilteredRowCountComponent'},
        {statusPanel: 'agSelectedRowCountComponent'},
        {statusPanel: 'agAggregationComponent'}
      ]
    };
  }
// refresh() {
//   // this.gridApi.redrawRows();
//   gridOptions.api.setRowData(data);
//   gridOptions.api.refreshCells({force : true});
// }



  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
    this.buildForm();
  }

  // formats the dates
  dateFormatter(params) {
    return moment(params.value).format('MM/DD/YYYY HH:mm');
  }

  opennewInsuranceModal() {
    this.ngxSmartModalService.getModal('newInsurance').open();
  }

  openeditInsuranceModal() {
    this.ngxSmartModalService.getModal('editInsurance').open();
  }

  closeeditInsuranceModal() {
    this.ngxSmartModalService.getModal('editInsurance').close();
  }

  closenewInsuranceModal() {
    this.ngxSmartModalService.getModal('newInsurance').close();
  }

  get f() {
    return this.editnoteForm.controls;
  }

  onSubmit(form) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    // Loading indictor
    this.ecolService.loader();

    //
    const body = {
      insurancename: form.value.insurancename,
      physicaladdress: form.value.physicaladdress,
      postaladdress: this.model.postaladdress,
      emailaddress: this.model.emailaddress,
      contactperson: form.value.contactperson,
      dateofentry: new Date(),
      dateoflastupdate: 'NEVER',
    };
    this.ecolService.postinsurance(body).subscribe(data => {
      this.closenewInsuranceModal(); // will only close modal if success
      this.refresh ();
      form.reset();
      swal('Success!', 'Insurance added successfully!', 'success');
    }, error => {
      console.log(error);
      console.log(body);
      swal('Error!', 'Error occurred during processing!', 'error');
    });
  }

  onUpdate() {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    // Loading indictor
    this.ecolService.loader();

    //
    const body = {
      editid: this.f.editid.value,
      editinsurancename: this.f.editinsurancename.value,
      editphysicaladdress: this.f.editphysicaladdress.value,
      editpostaladdress: this.f.editpostaladdress.value,
      editemailaddress: this.f.editemailaddress.value,
      editcontactperson: this.f.editcontactperson.value,
    };
    console.log(body);
    // this.newnotes = this.f.notemade.value;
    this.editinsurancename = this.insurancename;
    if (this.editinsurancename === this.model.INSURANCENAME) {
      console.log('You havent changed a thing');
      swal({
        title: 'Hey, Kindly Edit to Submit',
        imageUrl: 'assets/img/user/coop.jpg',
        text: 'Update details to submit!',
        // showCancelButton: true,
        confirmButtonColor: '#7ac142',
        cancelButtonColor: '#00543d',
        confirmButtonText: 'Okay'
      });

    } else {
      // this.nochange = false;
      console.log('good,you\'ve changed ');
      this.ecolService.updateinsurance(body).subscribe(data => {
        console.log(data);
        this.closeeditInsuranceModal();
        this.refresh ();
        swal('Successful!', 'Insurance updated!', 'success');
        //
      }, error => {
        console.log(error);
        console.log(body);
        swal('Error!', 'Error occurred during processing!', 'error');
      });
    }



  }

  onRowDoubleClicked(event: any) {
    this.model = event.node.data;
    this.insuranceid = this.model.ID;
    this.insurancename = this.model.INSURANCENAME;
    this.physicaladdress = this.model.PHYSICALADDRESS;
    this.postaladdress = this.model.POSTALADDRESS;
    this.emailaddress = this.model.EMAILADDRESS;
    this.contactperson = this.model.CONTACTPERSON;

    console.log(this.insurancename);

    // tslint:disable-next-line:max-line-length
    // window.open(environment.applink + '/activitylog?accnumber=' + this.model.ACCNUMBER + '&custnumber=' + this.model.CUSTNUMBER + '&username=' + this.currentUser.USERNAME + '&sys=collections', '_blank');
    this.openeditInsuranceModal();
  }

  buildForm() {
    // get static data

    this.editnoteForm = this.formBuilder.group({
      editid: [{value: this.insuranceid, disabled: true}],
      editinsurancename: [{value: this.insurancename, disabled: false}],
      editphysicaladdress: [{value: this.physicaladdress, disabled: false}, [Validators.required]],
      editpostaladdress: [{value: this.postaladdress, disabled: false}],
      editemailaddress: [{value: this.emailaddress, disabled: false}, [Validators.email]],
      editcontactperson: [{value: this.contactperson, disabled: false}]
    });

  }




  deleteInsurance() {
    swal({
      title: (this.insurancename).toUpperCase() + '  will be Deleted',
      imageUrl: 'assets/img/user/coop.jpg',
      text: 'Are you sure?!',
      showCancelButton: true,
      confirmButtonColor: '#7ac142',
      cancelButtonColor: '#00543d',
      confirmButtonText: 'Yes, Delete!'
    }).then((result) => {
      if (result.value) {
        const body = {
          editid: this.f.editid.value,
        };
        this.ecolService.deleteinsurance(body).subscribe(data => {
          console.log(body);
          this.closeeditInsuranceModal();
          this.refresh ();
          swal('Successful!', 'Insurance deleted!', 'success');
          //
        }, error => {
          console.log(error);
          swal('Error!', 'Error occurred during processing!', 'error');
        });
      }
    });
  }

  refresh () {
    // this.gridApi = params.api;
    // this.gridColumnApi = params.columnApi;
    // params.api.sizeColumnsToFit();
    // this.gridApi.setDatasource(this.dataSource);
    // environment.api + '/api/tqall/paged/myallocation?colofficer=' + this.username
    this.http
      .get(environment.api + '/api/tqall/insurance')
      .subscribe(resp => {
        console.log(typeof resp); // to check whether object or array
        this.str = JSON.stringify(resp, null, 4);
        const obj: any = JSON.parse(this.str);

        this.gridOptions.api.setRowData(obj.rows);
        this.gridOptions.api.refreshCells({force: true});

      });

  }

}

