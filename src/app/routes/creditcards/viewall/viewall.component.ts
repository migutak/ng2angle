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

  @ViewChild('myModal') myModal;
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  public radioModel: string;

  total: any = {};
  // source: any = {};
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private jqxDomService: JqxDomService, private ecolService: EcolService) {

  };
  
  source =
    {
      url: environment.api + '/api/tbl_q_all/viewallcc',
      totalrecords: 1000000,
      filter: function() {
        // update the grid and send a request to the server.
        $("#myGrid").jqxGrid('updatebounddata', 'filter');
    },
    sort: function() {
        // update the grid and send a request to the server.
        $("#myGrid").jqxGrid('updatebounddata', 'sort');
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ,
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
          { name: 'colofficer', type: 'string' },
          { name: 'DUEDATE', type: 'string' },
          { name: 'CYCLE', type: 'string' },
          { name: 'SQNUMBER', type: 'string' }
        ],
      datatype: 'json'
    };

  dataAdapter: any = new jqx.dataAdapter(this.source);
  
  rendergridrows (obj) {
    return obj.data;
  };

  columns: any[] =
    [
      {
        text: 'CARDACCT', datafield: 'cardacct', width: 150, filtertype: 'input',
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
      { text: 'CARDNUMBER', datafield: 'CARDNUMBER', width: 100, filtertype: 'input' },
      { text: 'CARDNAME', datafield: 'CARDNAME', width: 150, filtertype: 'input' },
      { text: 'OUTBALANCE', datafield: 'OUTBALANCE', filtertype: 'input', cellsformat: 'd' },
      { text: 'EXPPMNT', datafield: 'EXPPMNT', filtertype: 'input', cellsformat: 'd' },
      { text: 'DAYSINARR', datafield: 'DAYSINARREARS', filtertype: 'input', cellsformat: 'd' },
      { text: 'CYCLE', datafield: 'CYCLE', filtertype: 'input' },
      { text: 'COLOFFICER', datafield: 'colofficer', filtertype: 'input' },
      { text: 'SQNUMBER', datafield: 'SQNUMBER', filtertype: 'input' },
      { text: 'DUEDATE', datafield: 'DUEDATE', filtertype: 'input' }

    ];

    // render grid

    

  cardacct: String;

  onClickMe(event, rowdata) {
    this.cardacct = event.target.textContent;
    // open page
    window.open(environment.applink + '/activitylog?cardacct=' + this.cardacct + '&username=' + this.currentUser.username, '_blank');
  }

  ngOnInit() {
  }

  filterfunction(column, value) {
    console.log(column, value);
  }

}
