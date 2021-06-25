import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-activityipf',
  templateUrl: './activityipf.component.html',
  styleUrls: ['./activityipf.component.scss']
})
export class ActivityIpfComponent implements OnInit {

  constructor(public settings: SettingsService) { }

  ngOnInit() {
  }

}
