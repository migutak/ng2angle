import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { AgGridAngular } from 'ag-grid-angular';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
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
    data: any = {};
    sptypes = [];
    pivotPanelShow = true;

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

    constructor(
        private modalService: NgbModal,
        private ecolService: EcolService
        ) {
        this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop',
            ariaLabelledBy: 'modal-basic-title'
        };

        

        this.columnDefs = [
            {
                field: 'ACCNUMBER',
                filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' },
                resizable: true,
                minWidth: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            { field: 'CUSTNAME', filter: 'agTextColumnFilter', width: 200, filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'CUSTNUMBER', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'NEWSTATUS', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'SERVICEPROVIDER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'DATEASSIGNED', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'PROPERTYNO', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            {
                field: 'ACCBALANCE',
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    } else {
                        return ''
                    }
                },
                filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, aggFunc: 'sum', resizable: true
            },
            {
                field: 'OPENMARKETVALUE',
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    } else {
                        return ''
                    }
                },
                filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, aggFunc: 'sum', resizable: true
            },
            {
                field: 'FORCEDSALEVALUE',
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    } else {
                        return ''
                    }
                },
                filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, aggFunc: 'sum', resizable: true
            },
            { field: 'FILENO', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'OWNERSHIP', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'DATEINPUT', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'STAGEDATE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'AROCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'SERVICEPROVIDER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'DUEDATE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
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
                fetch(environment.api + '/api/tblmarketors/gridviewall', {
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
        } else if (selectedData.length > 1){
            this.export = false;
            this.updatecase = true;
            this.data = {};
        } else {
            this.export = true;
            this.updatecase = true;
            this.data = {};
        }
    }

    updateMarketer(form) {
        this.data.accnumber = form.value.accnumber;
        this.data.serviceprovider = form.value.serviceprovider;
        this.data.newstatus = form.value.newstatus;
        this.data.dateassigned = moment(form.value.dateassigned).format('YYYY-MM-DD');
        
        this.ecolService.patchmarketer(this.data).subscribe(resp => {
            console.log(resp);
            alert('update successfully');
        })
    }

}
