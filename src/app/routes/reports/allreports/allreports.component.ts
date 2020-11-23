import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
declare var $: any;
import { environment } from '../../../../environments/environment';
import { ExportWoffStoryService } from '../../../services/exportwoffstory.service';
import { ExportProductsService } from '../../../services/exportproductsstory.service';


@Component({
    selector: 'app-allreports',
    templateUrl: './allreports.component.html',
    styleUrls: ['./allreports.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AllReportsComponent implements OnInit {

    report: string = null;
    searchText: any;

    reports = [
        {
            link: '/frameset?__report=collectoractivity_test2.rptdesign&__title=Activity Report',
            name: ' Collector activity',
            icon:'fa fa-file fa-fw'
        },
        {
            link: '/frameset?__report=collector_activity_raw.rptdesign&__title=Activity Report Raw',
            name: ' Collector activity (Raw)',
            icon: 'fa fa-file fa-fw'
        },
        {
            link: '/frameset?__report=amountcollectedtest.rptdesign&__title=Amount Collected',
            name: ' Amount Collected',
            icon: 'fa fa-file fa-fw'
        },
        {
            link: '/frameset?__report=sms.rptdesign&__title=SMS Sent Report',
            name: ' SMS Report',
            icon: 'fa fa-chart-pie fa-fw'
        },
        {
            link: '/frameset?__report=notes.rptdesign&__title=Notes',
            name: ' Daily Notes report',
            icon: 'fa fa-chart-line fa-fw'
        },
        {
            link: '/frameset?__report=bulk_notes.rptdesign&__title=Bulk Notes',
            name: ' Bulk notes report',
            icon: 'fa fa-chart-line fa-fw'
        },
        {
            link: '/frameset?__report=unactioned.rptdesign&__title=Unactioned report - all Loans',
            name: ' Unactioned report',
            icon: 'fa fa-chart-bar fa-fw'
        },
        {
            link: '/frameset?__report=unactionedcc.rptdesign&__title=Unactioned report - credit cards',
            name: ' Unactioned report - credit cards',
            icon: 'fa fa-chart-bar fa-fw'
        },
        {
            link: '/frameset?__report=unactionedmcoopcash.rptdesign&__title=Unactioned Report Unactioned report - Ecredit',
            name: ' Unactioned report - Ecredit',
            icon: 'fa fa-chart-bar fa-fw'
        },
        {
            link: '/frameset?__report=payingaccounts.rptdesign&__title=Unactioned report CMD',
            name: ' Paying Accounts with History of Default',
            icon: 'fa fa-chart-bar fa-fw'
        }
        ,
        {
            link: '/frameset?__report=portfoliomovt.rptdesign&__title=Portfolio Movement Report',
            name: ' Portfolio movement',
            icon: 'fa fa-file fa-fw'
        },
        {
            link: '/frameset?__report=portfoliomovt_cc_test.rptdesign&__title=Portfolio Movement Report',
            name: ' Portfolio movement Credit cards',
            icon: 'far fa-newspaper'
        },
        {
            link: '/frameset?__report=file_analysis_test.rptdesign&__title=Relegation Analysis',
            name: ' Relegation Analysis',
            icon: 'fa fa-chart-pie fa-fw'
        },
        {
            link: '/frameset?__report=expiredindemnity.rptdesign&__title=Expired indemnity',
            name: ' Service providers Expired Indemnity report',
            icon: 'fa fa-chart-line fa-fw'
        },
        {
            link: '/frameset?__report=summary_allocation_report.rptdesign&__title=Allocation Summary',
            name: ' Allocation summary',
            icon: 'fa fa-chart-bar fa-fw'
        }

        ,
        {
            link: '/frameset?__report=accountswithplan_details.rptdesign&__title=Allocation Summary',
            name: ' Account plan report (Remedial)',
            icon: 'far fa-sticky-note'
        },
        {
            link: '/frameset?__report=demands.rptdesign&__title=Demand Letters Status Report - Loans',
            name: ' Demand Letters Status Report - Loans',
            icon: 'fa fa-chart-bar fa-fw'
        },
        {
            link: '/frameset?__report=demandscc.rptdesign&__title=Demand Letters Status Report - Credit Cards',
            name: ' Demand Letters Status Report - Cards',
            icon: 'fa fa-box'
        },
        {
            link: '/frameset?__report=utilization.rptdesign&__title=Daily Utilization Report',
            name: ' E-Collect utilization Report',
            icon: 'fa fa-chart-bar fa-fw'
        },
        {
            link: '/frameset?__report=accplan_simple.rptdesign&__title=Account Plan Report - Simple',
            name: ' Account plan Report - Simple',
            icon: 'fa fa-box'
        }
        ,
        {
            link: '/frameset?__report=ptps.rptdesign&__title=Promises to Pay',
            name: ' Promises to Pay',
            icon: 'fa fa-chart-bar fa-fw'
        },
        {
            link: '/frameset?__report=notes_for_customer.rptdesign&__title=Customer Notes Report',
            name: ' Customer Notes Report',
            icon: 'fa fa-box'
        },
        {
            link: '/frameset?__report=remedial_offerings.rptdesign&__title=Remedial Report',
            name: ' Remedial Offering Report',
            icon: 'fa fa-chart-bar fa-fw'
        },
        {
            link: '/frameset?__report=relegation_overdue.rptdesign&__title=Relegation Overdue Accounts Report',
            name: ' Relegation Overdue Accounts Report',
            icon: 'fa fa-chart-bar fa-fw'
        },
        {
            link: '/frameset?__report=relegated.rptdesign&__title=Relegated accounts',
            name: ' Relegated Accounts Report',
            icon: 'fa fa-chart-bar fa-fw'
        },
        {
            link: '/frameset?__report=repossessions.rptdesign&__title=Asset Finance Repossessions',
            name: ' Asset Finance Repossessions',
            icon: 'fa fa-chart-bar fa-fw'
        },
        {
            link: '/frameset?__report=ipfcancellation.rptdesign&__title=IPF Cancellations',
            name: ' IPF Cancellations',
            icon: 'fa fa-chart-bar fa-fw'
        },
        {
            link: '/frameset?__report=restructure.rptdesign&__title=Restructure',
            name: ' Restructure report',
            icon: 'fa fa-chart-bar fa-fw'
        }
    ];

    filteredArray = [...this.reports];

    onEvent(msg) {
        console.log(msg);
    }

    public transform(value, keys: string, term: string) {

        if (!term) return value;
        return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

    }

    constructor(
        private exportWoffstoryservice: ExportWoffStoryService,
        private exportProductsService: ExportProductsService
    ) {
        

    }

    ngOnInit() { }


    public filterArray() {
        // Ensures  empty list.
        if (!this.reports.length) {
            this.filteredArray = [];
            return;
        }

        // if no search is detected, the list remains in view.
        if (!this.searchText) {
            this.filteredArray = [...this.reports]; // keep your reports immutable
            return;
        }

        const list = [...this.reports]; // keep list immutable
        const properties = Object.keys(list[0]); // get list properties

        // check all properties for each list and return data if matching to searchText
        this.filteredArray =  list.filter((listdata) => {
            return properties.find((property) => {
                const valueString = listdata[property].toString().toLowerCase();
                return valueString.includes(this.searchText.toLowerCase());
            })
                ? listdata
                : null;
        });

    }


    onNavigate(reportname) {
        window.open('activitydash?report=' + reportname, '_blank');
    }

    openactivityrpt() {
        window.open(environment.birt + '/frameset?__report=collectoractivity_test2.rptdesign&__title=Activity Report', '_blank');
    }

    open(report) {
        window.open(environment.birt + report, '_blank');
    }

    kibanaopenaccplan() {
        this.report = environment.accplanreport;
        window.open(this.report, '_blank');
    }

    kibanaopenptp() {
        this.report = environment.ptpreport;
        window.open(this.report, '_blank');
    }

    exportwoffstory() {
        this.exportWoffstoryservice.generateWoffstory();
    }

    exportproducts() {
        this.exportProductsService.generateWoffstory();
    }

}
