import { Component, OnInit, ViewChild } from '@angular/core';
import { JqxDomService } from '../../../shared/jqwidgets-dom.service';
import { environment } from '../../../../environments/environment';
import { jqxButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { EcolService } from '../../../services/ecol.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})
export class ViewallComponent implements OnInit {

  @ViewChild('myGrid') myGrid: jqxGridComponent;

  total: any = {};
  cardnumber: string;
  cardacct: string;
  // source: any = {};
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private jqxDomService: JqxDomService, private ecolService: EcolService) {

  };

  source: any =
    {
      datatype: 'json',
      totalrecords: 100,
      // root: 'Rows',
      url: environment.api + '/api/tbl_q_all/viewallcc',
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
          { name: 'CARDACCT', type: 'string' },
          { name: 'ACCOUNTNO', type: 'string' },
          { name: 'CARDNUMBER', type: 'string' },
          { name: 'CARDNAME', type: 'string' },
          { name: 'OUTBALANCE', type: 'number' },
          { name: 'EXPPMNT', type: 'number' },
          { name: 'DAYSINARREARS', type: 'number' },
          { name: 'ADDRESS', type: 'string' },
          { name: 'RPCODE', type: 'string' },
          { name: 'CITY', type: 'string' },
          { name: 'MOBILE', type: 'string' },
          { name: 'EMAILADDRESS', type: 'string' },
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
        text: 'CARDACCT', datafield: 'CARDACCT', width: 150, filtertype: 'input',
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
      { text: 'CARDNUMBER', datafield: 'CARDNUMBER', width: 150, filtertype: 'input' },
      { text: 'CARDNAME', datafield: 'CARDNAME', width: 200, filtertype: 'input' },
      { text: 'OUTBALANCE', datafield: 'OUTBALANCE', filtertype: 'input', cellsformat: 'd', cellsrenderer: this.totalcolumnrenderer, cellsalign: 'right' },
      { text: 'EXPPMNT', datafield: 'EXPPMNT', filtertype: 'input', cellsformat: 'd' },
      { text: 'DAYSINARR', datafield: 'DAYSINARREARS', filtertype: 'input', cellsformat: 'c' },
      { text: 'CYCLE', datafield: 'CYCLE', filtertype: 'input' },
      { text: 'COLOFFICER', datafield: 'colofficer', filtertype: 'input' },
      { text: 'SQNUMBER', datafield: 'SQNUMBER', filtertype: 'input' },
      { text: 'DUEDATE', datafield: 'DUEDATE', filtertype: 'range' }
    ];

  onClickMe(event, rowdata) {
    this.cardacct = event.target.textContent;
    console.log(rowdata)
    // open page
    window.open(environment.applink + '/activitylog?accnumber=' + this.cardacct + '&custnumber=' + this.cardacct + '&username=' + this.currentUser.username + '&sys=cc', '_blank');
  }

  ngOnInit() {
  }

  filterfunction(column, value) {
    console.log(column, value);
  }

}
