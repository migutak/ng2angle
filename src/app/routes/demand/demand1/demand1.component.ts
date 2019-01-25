import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-demand1',
  templateUrl: './demand1.component.html',
  styleUrls: ['./demand1.component.scss']
})
export class Demand1Component implements OnInit {

  model: any = {};
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
