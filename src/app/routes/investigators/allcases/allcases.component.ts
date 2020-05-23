import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { AgGridAngular } from 'ag-grid-angular';

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
    pivotPanelShow = true;

    modules = AllModules;

    constructor() {
        this.columnDefs = [
            {
                field: 'ACCNUMBER',
                filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true, checkboxSelection: true
            },
            {
                field: 'APPLINK',
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return '<a  href="#" target="_blank">' + params.value + '</a>';
                    } else {
                        return 'No Data Found';
                        // return '<img src="assets/img/user/loading.gif">';
                    }
                },
                filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true
            },
            { field: 'CUSTNAME', filter: 'agTextColumnFilter', width: 200, filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'CUSTNUMBER', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'STATUS', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'PRODUCTCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'BUSINESSUNIT', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'PROPERTYNO', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
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
            { field: 'REASONFORINVESTIGATION', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'REGION', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'REQUESTDATE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'REQUESTBY', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'RROCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'SERVICEPROVIDER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
            { field: 'CASENUMBER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
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
                fetch(environment.api + '/api/tbl_investigators/gridviewall', {
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

    onRowDoubleClicked(event: any) {
        this.model = event.node.data;
        window.open(this.model.APPLINK, '_blank');
    }


    public ngOnInit(): void {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
    }

    getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        console.log(selectedData);
    }


}
