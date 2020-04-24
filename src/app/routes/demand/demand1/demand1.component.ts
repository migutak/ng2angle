import { Component, OnInit, ViewChild } from '@angular/core';
import { JqxDomService } from '../../../shared/jqwidgets-dom.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { EcolService } from '../../../services/ecol.service';

@Component({
  selector: 'app-demand1',
  templateUrl: './demand1.component.html',
  styleUrls: ['./demand1.component.scss']
})
export class Demand1Component implements OnInit {

  
  public radioModel: string;

  total:  any = {};
  rowValue: any;
  custnumber: string;
  user = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private jqxDomService: JqxDomService, private ecolService: EcolService) {

  }

  source: any =
    {
      url: environment.api + '/api/demandsdue?filter[status]=PENDING&filter[limit]=150',
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

  columns: any[] =
    [
      
      { text: 'CUSTNUMBER', datafield: 'custnumber', width: 100, filtertype: 'input' },
      { text: 'CLIENT_NAME', datafield: 'client_name', width: 200, filtertype: 'input' },
      { text: 'OUSTBALANCE', datafield: 'oustbalance', filtertype: 'input', cellsformat: 'd' },
      { text: 'TOTALARREARS', datafield: 'totalarrears', filtertype: 'input', cellsformat: 'd' },
      { text: 'DAYSINARR', datafield: 'daysinarr', filtertype: 'input', cellsformat: 'd' },
      { text: 'SECTION', datafield: 'section', filtertype: 'input' },
      { text: 'BRANCHNAME', datafield: 'branchname', filtertype: 'input' },
      { text: 'TELNUMBER', datafield: 'telnumber', filtertype: 'input' },
      { text: 'EMAILADDRESS', datafield: 'emailaddress', filtertype: 'input' },
      { text: 'COLOFFICER', datafield: 'colofficer', filtertype: 'input' },
      { text: 'DEMANDLETTER', datafield: 'demandletter', filtertype: 'input' },
      { text: 'DATEDUE', datafield: 'datedue', filtertype: 'input' },
      { text: 'STATUS', datafield: 'status', filtertype: 'input' }

    ];

  accnumber: String;
  onClickMe(event, rowdata) {
    this.accnumber = event.target.textContent;
    this.custnumber = (event.target.textContent).slice(5, 12);
    // tslint:disable-next-line:max-line-length
    // console.log('this row', this.rowValue);
    // tslint:disable-next-line:max-line-length
    window.open(environment.applink + '/sendletter?accnumber=' + this.accnumber + '&custnumber=' + this.custnumber + '&username=' + this.user.username, '_blank');
  }

  myGridOnRowSelect(event: any): void {
    const args = event.args;
    const selectedRowIndex = args.rowindex;


  }

  myGridOnCellSelect(event: any): void {
    const args = event.args;
    const selectedRowIndex = args.rowindex;

  }

  ngOnInit() {
    // get total for badges
    this.gettotals();
  }

  filterfunction (column, value) {
    console.log(column, value);
  }

  

  gettotal (column, value, letter) {
    this.ecolService.gettotalletters(column, value, letter).subscribe(data => {
      if (data.length > 0) {
        this.total.DEMAND1 =  data[0].TOTAL;
      }
    }, error => {
      console.log(error);
    });
  }

  gettotal1 (column, value, letter) {
    this.ecolService.gettotalletters(column, value, letter).subscribe(data => {
      if (data.length > 0) {
        this.total.DEMAND2 =  data[0].TOTAL;
      }
    }, error => {
      console.log(error);
    });
  }

  gettotal2 (column, value, letter) {
    this.ecolService.gettotalletters(column, value, letter).subscribe(data => {
      if (data.length > 0) {
        this.total.PRELISTING =  data[0].TOTAL;
      }
    }, error => {
      console.log(error);
    });
  }

  gettotal3 (column, value, letter) {
    this.ecolService.gettotalletters(column, value, letter).subscribe(data => {
      if (data.length > 0) {
        this.total.POSTLISTING =  data[0].TOTAL;
      }
    }, error => {
      console.log(error);
    });
  }

  gettotal4 (column, value, letter) {
    this.ecolService.gettotalletters(column, value, letter).subscribe(data => {
      if (data.length > 0) {
        this.total.DAY40 =  data[0].TOTAL;
      }
    }, error => {
      console.log(error);
    });
  }

  gettotal5 (column, value, letter) {
    this.ecolService.gettotalletters(column, value, letter).subscribe(data => {
      if (data.length > 0) {
        this.total.DAY90 =  data[0].TOTAL;
      }
    }, error => {
      console.log(error);
    });
  }

  gettotals () {
    this.gettotal(null, null, 'DEMAND1');
    this.gettotal1(null, null, 'DEMAND2');
    this.gettotal2(null, null, 'PRELISTING');
    this.gettotal3(null, null, 'POSTLISTING');
    this.gettotal4(null, null, 'DAY40');
    this.gettotal5(null, null, 'DAY90');
  }

}
