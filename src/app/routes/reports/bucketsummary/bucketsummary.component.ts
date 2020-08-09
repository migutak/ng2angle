import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';
import { FlexmonsterPivot } from 'ng-flexmonster';
import * as Flexmonster from 'flexmonster';

@Component({
    selector: 'app-bucketsummary',
    templateUrl: './bucketsummary.component.html',
    styleUrls: ['./bucketsummary.component.scss']
})
export class BucketsummaryComponent implements OnInit {
    @ViewChild('pivot') pivot: FlexmonsterPivot;
    public pivotReport = {
        dataSource: {
            dataSourceType: "json",
            data: this.getData()
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

    getData() {
        return [{
            "accnumber": "01198010326800",
            "memogroup": "198",
            "businessunit": null,
            "remedialunit": null,
            "branchcode": "00011107",
            "branchname": null,
            "arocode": "107BM01",
            "rrocode": "RRO00",
            "colofficer": "Unknown",
            "productcode": "custsuspense",
            "daysinarr_01AUG20": 0,
            "bucket_01AUG20": "1+",
            "oustbalance_01AUG20": 68841.65,
            "daysinarr_02AUG20": null,
            "bucket_02AUG20": null,
            "oustbalance_02AUG20": 0
        },
        {
            "accnumber": "01198019896000",
            "memogroup": "198",
            "businessunit": null,
            "remedialunit": null,
            "branchcode": "00011150",
            "branchname": "BONDO BRANCH",
            "arocode": "150BB02",
            "rrocode": "RRO25",
            "colofficer": null,
            "productcode": "custsuspense",
            "daysinarr_01AUG20": 0,
            "bucket_01AUG20": "1+",
            "oustbalance_01AUG20": 496847.44,
            "daysinarr_02AUG20": null,
            "bucket_02AUG20": null,
            "oustbalance_02AUG20": 0
        },
        {
            "accnumber": "01198065933101",
            "memogroup": "198",
            "businessunit": null,
            "remedialunit": null,
            "branchcode": "00011035",
            "branchname": "STIMA PLAZA BRANCH",
            "arocode": "035BB01",
            "rrocode": "RRO00",
            "colofficer": "Unknown",
            "productcode": "custsuspense",
            "daysinarr_01AUG20": 0,
            "bucket_01AUG20": "1+",
            "oustbalance_01AUG20": 13971,
            "daysinarr_02AUG20": null,
            "bucket_02AUG20": null,
            "oustbalance_02AUG20": 0
        },
        {
            "accnumber": "01198066855001",
            "memogroup": "198",
            "businessunit": null,
            "remedialunit": null,
            "branchcode": "00011033",
            "branchname": "ATHI RIVER BRANCH",
            "arocode": "033BM01",
            "rrocode": "RRO00",
            "colofficer": "Unknown",
            "productcode": "custsuspense",
            "daysinarr_01AUG20": 0,
            "bucket_01AUG20": "1+",
            "oustbalance_01AUG20": 327060,
            "daysinarr_02AUG20": null,
            "bucket_02AUG20": null,
            "oustbalance_02AUG20": 0
        },
        {
            "accnumber": "01198075313002",
            "memogroup": "198",
            "businessunit": null,
            "remedialunit": null,
            "branchcode": "00011005",
            "branchname": "MERU BRANCH",
            "arocode": "005PB02",
            "rrocode": "RRO00",
            "colofficer": "Unknown",
            "productcode": "custsuspense",
            "daysinarr_01AUG20": 0,
            "bucket_01AUG20": "1+",
            "oustbalance_01AUG20": 276.03000000000003,
            "daysinarr_02AUG20": null,
            "bucket_02AUG20": null,
            "oustbalance_02AUG20": 0
        },
        {
            "accnumber": "01198093348200",
            "memogroup": "198",
            "businessunit": null,
            "remedialunit": null,
            "branchcode": "00011126",
            "branchname": "KAWANGWARE II BRANCH",
            "arocode": "126PB01",
            "rrocode": "RRO00",
            "colofficer": "Unknown",
            "productcode": "custsuspense",
            "daysinarr_01AUG20": 0,
            "bucket_01AUG20": "1+",
            "oustbalance_01AUG20": 9554,
            "daysinarr_02AUG20": null,
            "bucket_02AUG20": null,
            "oustbalance_02AUG20": 0
        },
        {
            "accnumber": "01198101795901",
            "memogroup": "198",
            "businessunit": null,
            "remedialunit": null,
            "branchcode": "00011032",
            "branchname": "BURUBURU BRANCH",
            "arocode": "032BM01",
            "rrocode": "RRO00",
            "colofficer": "Unknown",
            "productcode": "custsuspense",
            "daysinarr_01AUG20": 0,
            "bucket_01AUG20": "1+",
            "oustbalance_01AUG20": 23994.5,
            "daysinarr_02AUG20": null,
            "bucket_02AUG20": null,
            "oustbalance_02AUG20": 0
        }]
      }



}
