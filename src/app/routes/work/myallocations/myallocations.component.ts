import { Component, OnInit, ViewChild } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import { JqxDomService } from '../../../shared/jqwidgets-dom.service';
import { jqxButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-myallocations',
  templateUrl: './myallocations.component.html',
  styleUrls: ['./myallocations.component.scss']
})
export class MyallocationsComponent implements OnInit {

  
  @ViewChild('myGrid') myGrid: jqxGridComponent;

  total: any = {};
  // source: any = {};
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private jqxDomService: JqxDomService, private ecolService: EcolService) {

  };

  source: any =
    {
      datatype: 'json',
      totalrecords: 100,
      // root: 'Rows',
      url: environment.api + '/api/tbl_q_all/viewall',
      filter: function () {
        // update the grid and send a request to the server.
        this.myGrid.applyfilters();
      },
      sort: function () {
        // update the grid and send a request to the server.
        // $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
      },
      beforeprocessing: function (data) {
        if (data != null && data.length > 0) {
          //this.totalrecords = data.length;
          this.totalrecords = data[0].totalRecords;
        }
      },
      datafields:
        [
          { name: 'ACCNUMBER', type: 'string' },
          { name: 'CUSTNUMBER', type: 'string' },
          { name: 'CARDNUMBER', type: 'string' },
          { name: 'CLIENT_NAME', type: 'string' },
          { name: 'OUSTBALANCE', type: 'number' },
          { name: 'DAYSINARR', type: 'number' },
          { name: 'TOTALARREARS', type: 'number' },
          { name: 'BUCKET', type: 'string' },
          { name: 'RPCODE', type: 'string' },
          { name: 'CITY', type: 'string' },
          { name: 'BRANCHNAME', type: 'string' },
          { name: 'AROCODE', type: 'string' },
          { name: 'COLOFFICER', type: 'string' },
          { name: 'DUEDATE', type: 'date' },
          { name: 'CYCLE', type: 'string' },
          { name: 'SQNUMBER', type: 'string' }
        ],
    }
  dataAdapter: any = new jqx.dataAdapter(this.source, {
    downloadComplete: function (data, status, xhr) {
      if (!this.totalrecords) {
        this.totalrecords = data.length;
      }
    },
    loadError: function (xhr, status, error) {
      throw new Error(error);
    }
  });
  rendergridrows = (params: any): any[] => {
    let data = params.data;
    return data;
  }
  totalcolumnrenderer = (row: number, column: any, cellvalue: any): string => {
    // let newCellValue = jqx.dataFormat.formatnumber(cellvalue, 'c2');
    return '<span style="margin: 6px 3px; font-size: 12px; float: right; font-weight: bold;">' + cellvalue + '</span>';
  }
  columns: any[] =
    [
      {
        text: 'ACCNUMBER', datafield: 'ACCNUMBER', width: 150, filtertype: 'input',
        createwidget: (row: number, column: any, value: string, htmlElement: HTMLElement, rowdata): void => {
          const that = this;
          const container = document.createElement('div');
          htmlElement.appendChild(container);
          const result = this.jqxDomService.loadComponent(jqxButtonComponent, container);
          (<jqxButtonComponent>result.componentRef.instance).autoCreate = false;
          // tslint:disable-next-line:no-shadowed-variable
          (<jqxButtonComponent>result.componentRef.instance).onClick.subscribe((clickEvent, rowdata) => {
            that.onClickMe(clickEvent, rowdata);
          });
          (<jqxButtonComponent>result.componentRef.instance).createComponent({ value: value, width: 150, height: 30 });
        },
        initwidget: (row: number, column: any, value: any, htmlElement: HTMLElement): void => { }
      },
      { text: 'CUSTNUMBER', datafield: 'CUSTNUMBER', width: 150, filtertype: 'input' },
      { text: 'CLIENT_NAME', datafield: 'CLIENT_NAME', width: 200, filtertype: 'input' },
      { text: 'OUSTBALANCE', datafield: 'OUSTBALANCE', filtertype: 'input', cellsformat: 'd', cellsrenderer: this.totalcolumnrenderer, cellsalign: 'right' },
      { text: 'DAYSINARR', datafield: 'DAYSINARR', filtertype: 'input', cellsformat: 'd' },
      { text: 'TOTALARREARS', datafield: 'TOTALARREARS', filtertype: 'input', cellsformat: 'c' },
      { text: 'BUCKET', datafield: 'BUCKET', filtertype: 'input' },
      { text: 'COLOFFICER', datafield: 'colofficer', filtertype: 'input' },
      { text: 'AROCODE', datafield: 'AROCODE', filtertype: 'input' },
      { text: 'BRANCHNAME', datafield: 'BRANCHNAME', filtertype: 'range' }
    ];

  //renger grid end

  cardacct: String;

  onClickMe(event, rowdata) {
    this.cardacct = event.target.textContent;
    // open page
    window.open(environment.applink + '/activitylog?accnumber=' + this.cardacct + '&custnumber=' + this.cardacct + '&username=' + this.currentUser.username + '&sys=collections', '_blank');
  }
  ngOnInit() {
  }

}
