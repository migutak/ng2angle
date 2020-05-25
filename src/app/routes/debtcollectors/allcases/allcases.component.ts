import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { AgGridAngular } from 'ag-grid-angular';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import swal from 'sweetalert2';
import { EcolService } from '../../../services/ecol.service';

@Component({
    selector: 'app-allcases',
    templateUrl: './allcases.component.html',
    styleUrls: ['./allcases.component.scss']
})
export class AllCasesComponent implements OnInit {
    @ViewChild('agGrid') agGrid: AgGridAngular;
    public gridApi;
    public gridColumnApi;

    public columnDefs;
    public defaultColDef;
    public rowModelType;
    public cacheBlockSize;
    public maxBlocksInCache;
    public rowData: [];

    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    username: string;
    searchText: string;
    model: any = {};
    pivotPanelShow = false;
    data: any = {};
    sptypes = [];

    modules = AllModules;
    modalOptions: NgbModalOptions;
    export: boolean = true;
    updatecase: boolean = true;
    closeResult: string;
    bsConfig = { 
        isAnimated: true,
        adaptivePosition: true,
        dateInputFormat: 'YYYY-MM-DD' 
    }

    constructor(private modalService: NgbModal,
        private ecolService: EcolService
        ) {
        this.columnDefs = [
            {
                field: 'ACCNUMBER',
                filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' },
                resizable: true,
                checkboxSelection: true,
                minWidth: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true
            },
            { field: 'CUSTNAME', filter: 'agTextColumnFilter', width: 200, filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'CUSTNUMBER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'NEWSTATUS', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'SERVICEPROVIDER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'DATEINPUT', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'DATEASSIGNED', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'RROCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            {
                field: 'OUSTBALANCE',
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    } else {
                        return ''
                    }
                },
                filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, aggFunc: 'sum', resizable: true
            },
            { field: 'AROCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'REGION', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true }
            
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
        this.rowModelType = "serverSide";
        this.cacheBlockSize = 50;
        this.maxBlocksInCache = 0;
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        const datasource = {
            getRows(params) {
                fetch(environment.api + '/api/tbldebtcollectors/gridviewall', {
                    method: 'post',
                    body: JSON.stringify(params.request),
                    headers: { "Content-Type": "application/json; charset=utf-8" }
                })
                    .then(httpResponse => httpResponse.json())
                    .then(response => {
                        params.successCallback(response.rows, response.lastRow);
                    })
                    .catch(error => {
                        console.error(error);
                        params.failCallback();
                    })
            }
        };

        params.api.setServerSideDatasource(datasource);
    }

    ServerSideDatasource(server) {
        return {
            getRows(params) {
                setTimeout(function () {
                    var response = server.getResponse(params.request);
                    if (response.success) {
                        params.successCallback(response.rows, response.lastRow);
                    } else {
                        params.failCallback();
                    }
                }, 500);
            }
        };
    }

    currencyFormatter(params) {
        if (params.value !== undefined) {
            return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        } else {
            return ''
        }
    }

    open(content) {
        this.modalService.open(content,  this.modalOptions).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
         // refresh grid
         window.location.reload();
        });
      }


    public ngOnInit(): void {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;

        // get sptypes
        this.ecolService.getsptype('AUCTIONEERS-MARKETORS-REPOSSESSORS').subscribe(data => {
            this.sptypes = data;
        });
    }

    getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        console.log(selectedData);
    }

    onRowSelected(event) {
        /*window.alert(
          'row ' + event.node.data.ACCNUMBER + ' selected = ' + event.node.selected
        );*/
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        
        if (selectedData.length == 1) {
            this.export = false;
            this.updatecase = false;
            this.data.id = selectedData[0].ID;
            this.data.accnumber = selectedData[0].ACCNUMBER;
            this.data.serviceprovider = selectedData[0].SERVICEPROVIDER;
            this.data.newstatus = selectedData[0].NEWSTATUS;
            this.data.dateassigned = selectedData[0].DATEASSIGNED;
            this.data.followupcomment = selectedData[0].FOLLOWUPCOMMENT;
        } else if (selectedData.length > 1) {
            this.export = false;
            this.updatecase = true;
            this.data = {};
        } else {
            this.export = true;
            this.updatecase = true;
            this.data = {};
        }
    }

    updateDebtcollector(form) {
        this.data.accnumber = form.value.accnumber;
        this.data.serviceprovider = form.value.serviceprovider;
        this.data.newstatus = form.value.newstatus;
        this.data.followupcomment = form.value.followupcomment;
        this.data.dateassigned = moment(form.value.dateassigned).add(1, 'days').format('YYYY-MM-DD');
        
        this.ecolService.patchdebtcollectors(this.data).subscribe(resp => {
            swal('Success','Successfully updated!','success');
        }, error => {
            console.log(error);
            swal('Error','Error occured!','error');
        })
    }


}
