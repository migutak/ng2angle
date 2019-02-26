import { Component, OnInit, ViewChild } from '@angular/core';
import { JqxDomService } from '../../../../shared/jqwidgets-dom.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import * as $ from 'jquery';
import { jqxButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { EcolService } from '../../../../services/ecol.service';

@Component({
  selector: 'app-demandsdue',
  templateUrl: './demandsdue.component.html',
  styleUrls: ['./demandsdue.component.scss']
})
export class DemandsdueComponent implements OnInit {

  @ViewChild('myModal') myModal;
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  public radioModel: string;

  total:  any = {};
  constructor(private jqxDomService: JqxDomService, private ecolService: EcolService) {

  }

  source: any =
    {
      url: environment.api + '/api/demandsduecc?filter[status]=PENDING&filter[limit]=150',
      datafields:
        [
          { name: 'cardacct', type: 'string' },
          { name: 'cardnumber', type: 'string' },
          { name: 'cardname', type: 'string' },
          { name: 'outbalance', type: 'number' },
          { name: 'exppmnt', type: 'number' },
          { name: 'daysinarrears', type: 'number' },
          { name: 'address', type: 'string' },
          { name: 'rpcode', type: 'string' },
          { name: 'city', type: 'string' },
          { name: 'mobile', type: 'string' },
          { name: 'emailaddress', type: 'string' },
          { name: 'colofficer', type: 'string' },
          { name: 'demandletter', type: 'string' },
          { name: 'datedue', type: 'string' },
          { name: 'status', type: 'string' }
        ],
      datatype: 'json'
    };

  dataAdapter: any = new jqx.dataAdapter(this.source);

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
      { text: 'CARDNUMBER', datafield: 'cardnumber', width: 100, filtertype: 'input' },
      { text: 'CARDNAME', datafield: 'cardname', width: 150, filtertype: 'input' },
      { text: 'OUTBALANCE', datafield: 'outbalance', filtertype: 'input', cellsformat: 'd' },
      { text: 'EXPPMNT', datafield: 'exppmnt', filtertype: 'input', cellsformat: 'd' },
      { text: 'DAYSINARR', datafield: 'daysinarrears', filtertype: 'input', cellsformat: 'd' },
      { text: 'TELNUMBER', datafield: 'mobile', filtertype: 'input' },
      { text: 'EMAILADDRESS', datafield: 'emailaddress', filtertype: 'input' },
      { text: 'COLOFFICER', datafield: 'colofficer', filtertype: 'input' },
      { text: 'DEMANDLETTER', datafield: 'demandletter', filtertype: 'input' },
      { text: 'DATEDUE', datafield: 'datedue', filtertype: 'input' },
      { text: 'STATUS', datafield: 'status', filtertype: 'input' }

    ];

    cardacct: String;
  onClickMe(event, rowdata) {
    this.cardacct = event.target.textContent;
    // open page
    window.open(environment.applink + '/sendlettercc?cardacct=' + this.cardacct, '_blank');
  }

  ngOnInit() {
  }

  filterfunction (column, value) {
    console.log(column, value);
  }

  refreshgrid() {
  this.source.url = environment.api + '/api/demandsduecc?filter[where][demandletter]='
   + this.radioModel.toUpperCase() + '&filter[limit]=150',

  // console.log(this.source.url, this.dataAdapter);
  // tslint:disable-next-line:max-line-length
  // passing `cells` to the `updatebounddata` method will refresh only the cells values when the new rows count is equal to the previous rows count.
  //
  this.myGrid.updatebounddata('cells');
  }


}
