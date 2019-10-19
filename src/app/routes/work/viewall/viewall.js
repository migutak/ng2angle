import {Grid} from 'ag-grid-community';
import 'ag-grid-enterprise';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
//License goes here
import {LicenseManager} from "ag-grid-enterprise";
var dbConfig = require('../dbconfig');

LicenseManager.setLicenseKey(dbConfig.license);

const gridOptions = {

    rowModelType: 'serverSide',
    floatingFilter: 'true',
    animateRows:'true',

    columnDefs: [
        {field: 'ACCNUMBER', 
          cellRenderer: function (params) {
            if(params.value !== undefined) {
              return '<a  href="#" target="_blank">' + params.value + '</a>';
            } else {
              return '<img src="assets/img/user/loading.gif">';
            }
          },
          filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}},
        {field: 'CLIENT_NAME',filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}},
        {field: 'CUSTNUMBER',filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}},
        {field: 'DAYSINARR', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}},
        {field: 'OUSTBALANCE', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}, aggFunc: 'sum'},
        {field: 'PRINCARREARS', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}},
        {field: 'INSTAMOUNT', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}},
        {field: 'LIMITAMOUNT', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}},
        {field: 'TOTALARREARS', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}},
        {field: 'RROCODE', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}},
        {field: 'BRANCHCODE', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}},
        {field: 'BRANCHNAME', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}},
        {field: 'COLOFFICER', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}},
    ],

    defaultColDef: {
        sortable: true,
        floatingFilter: true,
    },
    // debug: true,
    // cacheBlockSize: 20,
    // maxBlocksInCache: 3,
    // purgeClosedRowNodes: true,
    // maxConcurrentDatasourceRequests: 2,
    // blockLoadDebounceMillis: 1000
};

const gridDiv = document.querySelector('#myGrid');
new Grid(gridDiv, gridOptions);

const datasource = {
    getRows(params) {
         console.log(JSON.stringify(params.request, null, 1));

         fetch('./viewall/', {
             method: 'post',
             body: JSON.stringify(params.request),
             headers: {"Content-Type": "application/json; charset=utf-8"}
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

gridOptions.api.setServerSideDatasource(datasource);

