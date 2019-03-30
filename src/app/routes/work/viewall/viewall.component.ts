import { Component, OnInit, ViewChild } from '@angular/core';
import { JqxDomService } from '../../../shared/jqwidgets-dom.service';
import { environment } from '../../../../environments/environment';
import * as $ from 'jquery';
import { jqxButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { EcolService } from '../../../services/ecol.service';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})
export class ViewallComponent implements OnInit {

  @ViewChild('myModal') myModal;
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  public radioModel: string;

  total:  any = {};
  custnumber: string;
  user = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private jqxDomService: JqxDomService, private ecolService: EcolService) {

  }

  source: any =
    {
      url: environment.api + '/api/tbl_q_all?&filter[limit]=150',
      datafields:
        [
          { name: 'accnumber', type: 'string' },
          { name: 'custnumber', type: 'string' },
          { name: 'client_name', type: 'string' },
          { name: 'oustbalance', type: 'number' },
          { name: 'totalarrears', type: 'number' },
          { name: 'daysinarr', type: 'number' },
          { name: 'address', type: 'string' },
          { name: 'postalcode', type: 'string' },
          { name: 'section', type: 'string' },
          { name: 'telnumber', type: 'string' },
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
        text: 'ACCNUMBER', datafield: 'accnumber', width: 150, filtertype: 'input',
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
      { text: 'CUSTNUMBER', datafield: 'custnumber', width: 100, filtertype: 'input' },
      { text: 'CLIENT_NAME', datafield: 'client_name', width: 200, filtertype: 'input' },
      { text: 'OUSTBALANCE', datafield: 'oustbalance', filtertype: 'input', cellsformat: 'd' },
      { text: 'TOTALARREARS', datafield: 'totalarrears', filtertype: 'input', cellsformat: 'd' },
      { text: 'DAYSINARR', datafield: 'daysinarr', filtertype: 'input', cellsformat: 'd' },
      { text: 'SECTION', datafield: 'section', filtertype: 'input' },
      { text: 'BRANCHNAME', datafield: 'branchname', filtertype: 'input' },
      { text: 'BUCKET', datafield: 'bucket', filtertype: 'input' },
      { text: 'COLOFFICER', datafield: 'colofficer', filtertype: 'input' }

    ];

  accnumber: String;
  onClickMe(event, rowdata) {
    // console.log('ACCNUMBER: ' + event.target.textContent);
    // console.log('CUSTNUMBER', (event.target.textContent).slice(5, 12));
    // open modal
    this.accnumber = event.target.textContent;
    this.custnumber = (event.target.textContent).slice(5, 12);
    // document.getElementById('openModalButton').click();
    // open page
    // tslint:disable-next-line:max-line-length
    window.open(environment.applink + '/activitylog?accnumber=' + this.accnumber + '&custnumber=' + this.custnumber + '&username=' + this.user.username + '&sys=collections', '_blank');
  }

  ngOnInit() {
    // 
  }

  filterfunction (column, value) {
    console.log(column, value);
  }

  refreshgrid() {
    // this.mygrid.setOptions({source:{}});
  this.source.url = environment.api + '/api/demandsdue?filter[where][demandletter]=' + this.radioModel.toUpperCase() + '&filter[limit]=150',

  // console.log(this.source.url, this.dataAdapter);
  // tslint:disable-next-line:max-line-length
  // passing `cells` to the `updatebounddata` method will refresh only the cells values when the new rows count is equal to the previous rows count.
  //
  this.myGrid.updatebounddata('cells');
  }

}
