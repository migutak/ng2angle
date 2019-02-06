import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';

@Component({
  selector: 'app-demand2',
  templateUrl: './demand2.component.html',
  styleUrls: ['./demand2.component.scss']
})
export class Demand2Component implements OnInit {

  model: any = {};
  demands: any;
  constructor(private ecolService: EcolService) { }

  ngOnInit() {
  }

  Search(accnumber) {
    this.ecolService.getdemandshistory(accnumber.value).subscribe(data => {
      if (data.length > 0) {
        this.demands = data;
      }
    });
  }

}
