import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activitydash',
  templateUrl: './activitydash.component.html',
  styleUrls: ['./activitydash.component.scss']
})
export class ActivitydashComponent implements OnInit {

  reportname: string;
  activitydash = false;
  amntcollecteddash = false;
  regionaldash = false;
  systemdash = false;

  //
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.reportname = this.route.snapshot.queryParamMap.get('report');
    this.route.queryParamMap.subscribe(queryParams => {
      this.reportname = queryParams.get('report');
    });

    switch (this.reportname) {
      case 'activitydash':
        this.activitydash = true;
        break;
      case 'amntcollecteddash':
        this.amntcollecteddash = true;
        break;
      case 'regionaldash':
        this.regionaldash = true;
        break;
      case 'systemdash':
        this.systemdash = true;
        break;
      default:
      this.activitydash = true;
    }
  }

}
