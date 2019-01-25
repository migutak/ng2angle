import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-demand1',
  templateUrl: './demand1.component.html',
  styleUrls: ['./demand1.component.scss']
})
export class Demand1Component implements OnInit {

  model: any = {};
  source: any =
    {
        localdata:
        [
            ['Alfreds Futterkiste', 'Maria Anders', 'Sales Representative', 'Obere Str. 57', 'Berlin', 'Germany'],
            ['Ana Trujillo Emparedados y helados', 'Ana Trujillo', 'Owner', 'Avda. de la Constitucin 2222', 'Mxico D.F.', 'Mexico'],
            ['Antonio Moreno Taquera', 'Antonio Moreno', 'Owner', 'Mataderos 2312', 'Mxico D.F.', 'Mexico'],
            ['Around the Horn', 'Thomas Hardy', 'Sales Representative', '120 Hanover Sq.', 'London', 'UK'],
            ['Berglunds snabbkp', 'Christina Berglund', 'Order Administrator', 'Berguvsvgen 8', 'Lule', 'Sweden'],
            ['Blauer See Delikatessen', 'Hanna Moos', 'Sales Representative', 'Forsterstr. 57', 'Mannheim', 'Germany'],
            ['Blondesddsl pre et fils', 'Frdrique Citeaux', 'Marketing Manager', '24, place Klber', 'Strasbourg', 'France'],
            ['Blido Comidas preparadas', 'Martn Sommer', 'Owner', 'C\/ Araquil, 67', 'Madrid', 'Spain'],
            ['Bon app', 'Laurence Lebihan', 'Owner', '12, rue des Bouchers', 'Marseille', 'France'],
            ['Bottom-Dollar Markets', 'Elizabeth Lincoln', 'Accounting Manager', '23 Tsawassen Blvd.', 'Tsawassen', 'Canada'],
            ['B`s Beverages', 'Victoria Ashworth', 'Sales Representative', 'Fauntleroy Circus', 'London', 'UK'],
            ['Cactus Comidas para llelet', 'Patricio Simpson', 'Sales Agent', 'Cerrito 333', 'Buenos Aires', 'Argentina'],
            ['Centro comercial Moctezuma', 'Francisco Chang', 'Marketing Manager', 'Sierras de Granada 9993', 'Mxico D.F.', 'Mexico'],
            ['Chop-suey Chinese', 'Yang Wang', 'Owner', 'Hauptstr. 29', 'Bern', 'Switzerland'],
            ['Comrcio Mineiro', 'Pedro Afonso', 'Sales Associate', 'Av. dos Lusadas, 23', 'Sao Paulo', 'Brazil'],
            ['Consolidated Holdings', 'Elizabeth Brown', 'Sales Representative', 'Berkeley Gardens 12 Brewery', 'London', 'UK'],
            ['Drachenblut Delikatessen', 'Sven Ottlieb', 'Order Administrator', 'Walserweg 21', 'Aachen', 'Germany'],
            ['Du monde entier', 'Janine Labrune', 'Owner', '67, rue des Cinquante Otages', 'Nantes', 'France'],
            ['Eastern Connection', 'Ann Devon', 'Sales Agent', '35 King George', 'London', 'UK'],
            ['Ernst Handel', 'Roland Mendel', 'Sales Manager', 'Kirchgasse 6', 'Graz', 'Austria']
        ],
        datafields:
        [
            { name: 'CompanyName', type: 'string', map: '0' },
            { name: 'ContactName', type: 'string', map: '1' },
            { name: 'Title', type: 'string', map: '2' },
            { name: 'Address', type: 'string', map: '3' },
            { name: 'City', type: 'string', map: '4' },
            { name: 'Country', type: 'string', map: '5' }
        ],
        datatype: 'array'
    };

    dataAdapter: any = new jqx.dataAdapter(this.source);

    columns: any[] =
    [
        { text: 'Account Number', datafield: 'CompanyName', width: 200 },
        { text: 'Customer Number', datafield: 'ContactName', width: 150 },
        { text: 'Customer Name', datafield: 'Title', width: 100 },
        { text: 'Address', datafield: 'Address', width: 100 },
        { text: 'City', datafield: 'City', width: 100 },
        { text: 'Country', datafield: 'Country' }
    ];
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form.value.send);
    if (form.value.send === 'preview') {
      let headers = new HttpHeaders();
      headers = headers.set('Accept', 'application/pdf');
      // tslint:disable-next-line:max-line-length
      // return this.http.get('/Users/kevinabongo/Documents/demands/00009-Demand1-24-11-2018.pdf', { headers: headers, responseType: 'blob' });
      window.open('/Users/kevinabongo/Documents/demands/00009-Demand1-24-11-2018.pdf', '_blank');
    }
  }

}
