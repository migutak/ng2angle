import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';
import { FlexmonsterPivot } from 'ng-flexmonster';
import * as Flexmonster from 'flexmonster';

@Component({
    selector: 'app-rollrates',
    templateUrl: './rollrates.component.html',
    styleUrls: ['./rollrates.component.scss']
})
export class RollratesComponent implements OnInit {
    @ViewChild('pivot') pivot: FlexmonsterPivot;
    public pivotReport = {
        dataSource: {
            data: "http://127.0.0.1:8000/api/rollrates"
        },
        slice: {
            rows: [
                { uniqueName: 'bucket_01AUG20' }
            ],
            columns: [
                { uniqueName: 'bucket_02AUG20' }
            ],
            measures: [
                { uniqueName: 'accnumber', aggregation: 'count' },
                { uniqueName: 'oustbalance_01AUG20', aggregation: 'sum' }
            ]
        }
    };

    constructor() {
    }


    public ngOnInit(): void {
    }

    onPivotReady(pivot: Flexmonster.Pivot): void {
        console.log('[ready] FlexmonsterPivot', this.pivot);
    }

    showInfo(): void {
        this.pivot.flexmonster.alert({
            title: "Customizing Pivot",
            message: "1) How to customize the Toolbar: <a style='text-decoration:underline; color:blue' href='https://www.flexmonster.com/doc/customizing-toolbar/'>see guide</a>",
            type: "info",
            blocking: false
        });
    }

    customizeToolbar(toolbar: Flexmonster.Toolbar): void {

        // Get all tabs
        var tabs = toolbar.getTabs();
        // The reference to the handler method
        var newTabHandler = this.showInfo.bind(this);
    
        toolbar.getTabs = function () {
          let newTab = {
            id: "fm-tab-newtab",
            title: "New Tab",
            handler: newTabHandler,
            icon: toolbar.icons.open
          }
    
          // Add new tab
          tabs.unshift(newTab);
    
          return tabs;
        }
    
      }

      onCustomizeCell(cell: Flexmonster.CellBuilder, data: Flexmonster.CellData): void {
        // console.log("[customizeCell] FlexmonsterPivot");
        if (data.isClassicTotalRow) {
          cell.addClass('fm-total-classic-r');
        }
        if (data.isGrandTotalRow) {
          cell.addClass('fm-grand-total-r');
        }
        if (data.isGrandTotalColumn) {
          cell.addClass('fm-grand-total-c');
        }
      }
    
      onReportComplete(): void {
        this.pivot.flexmonster.off('reportcomplete');
        this.pivot.flexmonster.setReport({
          dataSource: {
            dataSourceType: 'json',
            filename: 'http://127.0.0.1:8000/api/rollrates'
          }
        });
      }

}
