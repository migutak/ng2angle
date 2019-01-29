import { Component, OnInit, ViewChild } from '@angular/core';
import { JqxDomService } from '../../../shared/jqwidgets-dom.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as $ from 'jquery';
import { jqxButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';

@Component({
  selector: 'app-demand1',
  templateUrl: './demand1.component.html',
  styleUrls: ['./demand1.component.scss']
})
export class Demand1Component implements OnInit {

  @ViewChild('myModal') myModal;
  public radioModel: string;
  // public checkModel: any = { left: false, middle: true, right: false };
  constructor(private http: HttpClient, private jqxDomService: JqxDomService) {

  }

  source: any =
    {
      url: environment.api + '/api/tbl_q_all?filter[limit]=20',
      datafields:
        [
          { name: 'accnumber', type: 'string' },
          { name: 'custnumber', type: 'string' },
          { name: 'client_name', type: 'string' },
          { name: 'oustbalance', type: 'number' },
          { name: 'totalarrears', type: 'number' },
          { name: 'daysinarr', type: 'number' },
          { name: 'bucket', type: 'string' },
          { name: 'branchname', type: 'string' },
          { name: 'region', type: 'string' },
          { name: 'arocode', type: 'string' },
          { name: 'rrocode', type: 'string' },
          { name: 'colofficer', type: 'string' },
          { name: 'section', type: 'string' }
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
      { text: 'BUCKET', datafield: 'bucket', filtertype: 'input' },
      { text: 'BRANCHNAME', datafield: 'branchname', filtertype: 'input' },
      { text: 'DATEDUE', datafield: 'region', filtertype: 'input' },
      { text: 'AROCODE', datafield: 'arocode', filtertype: 'input' },
      { text: 'COLOFFICER', datafield: 'colofficer', filtertype: 'input' },
      { text: 'DEMAND', datafield: 'rrocode', filtertype: 'input' }

    ];

  accnumber: String;
  onClickMe(event, rowdata) {
    console.log('ACCNUMBER: ' + event.target.textContent);
    // open modal
    // $('#classicModal').modal('show');
    // this.openModel();
    this.accnumber = event.target.textContent;
    document.getElementById('openModalButton').click();
  }

  ngOnInit() {

  }

  openModel() {
    this.myModal.nativeElement.className = 'modal fade show';
  }
  closeModel() {
    this.myModal.nativeElement.className = 'modal hide';
  }

}
