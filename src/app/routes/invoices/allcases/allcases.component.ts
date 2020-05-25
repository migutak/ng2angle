import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import swal from 'sweetalert2';
import { EcolService } from '../../../services/ecol.service';
import { ExportInvoiceService } from '../../../services/exportinvoices.service'

@Component({
    selector: 'app-allcases',
    templateUrl: './allcases.component.html',
    styleUrls: ['./allcases.component.scss']
})
export class AllCasesComponent implements OnInit {
    @ViewChild('agGrid') agGrid: AgGridAngular;
    private gridApi;
    private gridColumnApi;

    public modules = [ClientSideRowModelModule];
    columnDefs;
    defaultColDef;
    rowSelection;
    rowData: any = [];
    isRowSelectable;

    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    username: string;
    searchText: string;
    model: any = {};
    export: boolean = true;
    updatecase: boolean = true;
    data: any = {};
    updateBtnTitle = 'Update Entry: '
    modalOptions: NgbModalOptions;
    minDate: Date;
    butDisabled: boolean = false;
    bsConfig = {
        isAnimated: true,
        adaptivePosition: true,
        dateInputFormat: 'YYYY-MM-DD',
        containerClass: 'theme-blue'
    }

    constructor(
        private modalService: NgbModal,
        private http: HttpClient,
        private ecolService: EcolService,
        private exportInvoiceService: ExportInvoiceService,
    ) {
        this.minDate = new Date();
        this.minDate.setDate(this.minDate.getDate() - 1);

        this.columnDefs = [
            {
                headerName: 'accnumber',
                field: 'accnumber',
                minWidth: 180,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            { field: 'sptitle' },
            {
                field: 'custname',
                minWidth: 150,
            },
            { field: 'feenotedate' },
            { field: 'feenoteamnt' },
            {
                field: 'approvedamnt',
                minWidth: 150,
            },
            {
                field: 'status',
                minWidth: 150,
            },
            { field: 'owner' },
            { field: 'arocode' },
            { field: 'dateinput' },
            { field: 'printdate' },
        ];

        this.defaultColDef = {
            flex: 1,
            minWidth: 100,
            resizable: true,
        };
        this.rowSelection = 'multiple';
        this.isRowSelectable = function (rowNode) {
            return rowNode.data ? rowNode.data.status == 'Print to Finance' : false;
        };
    }

    onQuickFilterChanged() {
        var inputValue = (<HTMLInputElement>document.getElementById('quickFilter')).value;
        this.gridApi.setQuickFilter(inputValue);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.refreshfunc();
    }


    currencyFormatter(params) {
        if (params.value !== undefined) {
            return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        } else {
            return ''
        }
    }

    public ngOnInit(): void {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
    }

    refreshData(status) {
        this.http
            .get(
                environment.api + '/api/tblinvoices?filter[where][status]=' + status
            )
            .subscribe(data => {
                this.gridApi.setRowData(data)
            });
    }

    onRowDoubleClicked(event: any) {
        this.model = event.node.data;
        this.updateBtnTitle = 'Update - ' + this.model.custname;
        this.updatecase = false;
        this.data.id = this.model.id;
        this.data.accnumber = this.model.accnumber;
        this.data.sptitle = this.model.sptitle;
        this.data.status = this.model.status;
        this.data.printdate = this.model.printdate;
        this.data.feenotedate = this.model.feenotedate;
        this.data.feenoteamnt = this.model.feenoteamnt;
        this.data.approvedamnt = this.model.approvedamnt;

        if(this.data.status === 'PAID') {
            this.butDisabled = true;
        } else {
            this.butDisabled = false;
        }
    }

    onRowSelected(event) {
        /*window.alert(
          'row ' + event.node.data.ACCNUMBER + ' selected = ' + event.node.selected
        );*/
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);

        if (selectedData.length == 1) {
            this.export = false;

        } else if (selectedData.length > 1) {
            this.export = false;
        } else {
            this.export = true;
        }
    }

    getSelectedRows() {
        swal({
            title: 'Confirm',
            imageUrl: 'assets/img/user/coop.jpg',
            text: 'Confirm Print to Finance',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Print!'
        }).then((result) => {
            if (result.value) {
                // close tab
                const selectedNodes = this.agGrid.api.getSelectedNodes();
                const selectedData = selectedNodes.map(node => node.data);
                
                this.exportInvoiceService.generateinvoice();
                for (let i = 0; i < selectedData.length; i++) {
                    const body = {
                        id: 0,
                        status: ''
                    }
                    body.id = selectedData[i].id
                    body.status = 'PAID';

                    this.http.patch(environment.api + '/api/tblinvoices', body).subscribe(resp =>{
                        //
                    })
                }
                // refresh grid
                this.refreshfunc();
            } else {
                // reset
                //
            }
        });

    }

    open(content) {
        this.modalService.open(content, this.modalOptions).result.then((result) => {

        }, (reason) => {
            // refresh grid
            this.refreshfunc();
        });
    }

    updateInvoice(form) {
        this.data.feenoteamnt = form.value.feenoteamnt;
        this.data.status = form.value.status;
        this.data.approvedamnt = form.value.approvedamnt;

        this.data.feenotedate = moment(form.value.feenotedate).format('YYYY-MM-DD');
        if (form.value.printdate) {
            this.data.printdate = moment(form.value.printdate).add(1, 'days').format('YYYY-MM-DD');
        }

        this.ecolService.patchinvoices(this.data).subscribe(resp => {
            swal('Success', 'Successfully updated!', 'success');
        }, error => {
            console.log(error);
            swal('Error', 'Error occured!', 'error');
        })
    }

    refreshfunc() {
        this.http
                .get(
                    environment.api + '/api/tblinvoices?filter[where][status][nin]=PAID&filter[where][status][nin]=PAID'
                )
                .subscribe(data => {
                    this.gridApi.setRowData(data)
                }, error => {
                    console.log(error)
                });
    }
}
