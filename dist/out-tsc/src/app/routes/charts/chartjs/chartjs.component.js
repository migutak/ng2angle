var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ColorsService } from '../../../shared/colors/colors.service';
var ChartjsComponent = /** @class */ (function () {
    function ChartjsComponent(colors) {
        this.colors = colors;
        // Line chart
        // -----------------------------------
        this.lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    data: [this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor()]
                }, {
                    label: 'My Second dataset',
                    data: [this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor()]
                }
            ]
        };
        this.lineColors = [
            {
                backgroundColor: 'rgba(114,102,186,0.2)',
                borderColor: 'rgba(114,102,186,1)',
                pointBackgroundColor: 'rgba(114,102,186,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(114,102,186,1)'
            }, {
                backgroundColor: 'rgba(35,183,229,0.2)',
                borderColor: 'rgba(35,183,229,1)',
                pointBackgroundColor: 'rgba(35,183,229,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(35,183,229,1)'
            }
        ];
        this.lineOptions = {
            animation: false,
            responsive: true
        };
        // Bar chart
        // -----------------------------------
        this.barData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    data: [this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor()]
                }, {
                    data: [this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor()]
                }
            ]
        };
        this.barColors = [
            {
                backgroundColor: this.colors.byName('info'),
                borderColor: this.colors.byName('info'),
                pointHoverBackgroundColor: this.colors.byName('info'),
                pointHoverBorderColor: this.colors.byName('info')
            }, {
                backgroundColor: this.colors.byName('primary'),
                borderColor: this.colors.byName('primary'),
                pointHoverBackgroundColor: this.colors.byName('primary'),
                pointHoverBorderColor: this.colors.byName('primary')
            }
        ];
        this.barOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        //  Doughnut chart
        // -----------------------------------
        this.doughnutData = {
            labels: [
                'Purple',
                'Info',
                'Yellow'
            ],
            datasets: [{
                    data: [30, 50, 20]
                }]
        };
        this.doughnutColors = [{
                borderColor: [
                    this.colors.byName('purple'),
                    this.colors.byName('info'),
                    this.colors.byName('yellow')
                ],
                backgroundColor: [
                    this.colors.byName('purple'),
                    this.colors.byName('info'),
                    this.colors.byName('yellow')
                ],
            }];
        this.doughnutOptions = {
            responsive: true
        };
        // Pie chart
        // -----------------------------------
        this.pieData = {
            labels: [
                'Purple',
                'Yellow',
                'Info'
            ],
            datasets: [{
                    data: [30, 40, 30]
                }]
        };
        this.pieColors = [{
                borderColor: [
                    this.colors.byName('info'),
                    this.colors.byName('yellow'),
                    this.colors.byName('purple')
                ],
                backgroundColor: [
                    this.colors.byName('info'),
                    this.colors.byName('yellow'),
                    this.colors.byName('purple')
                ],
            }];
        this.pieOptions = {
            responsive: true
        };
        // Polar chart
        // -----------------------------------
        this.polarData = {
            datasets: [{
                    data: [
                        300,
                        50,
                        100,
                        140
                    ],
                    label: 'My dataset' // for legend
                }],
            labels: [
                'Red',
                'Green',
                'Yellow',
                'Grey'
            ]
        };
        this.polarColors = [
            {
                backgroundColor: [
                    this.colors.byName('pink'),
                    this.colors.byName('purple'),
                    this.colors.byName('pink'),
                    this.colors.byName('purple')
                ],
                borderColor: [
                    this.colors.byName('pink'),
                    this.colors.byName('purple'),
                    this.colors.byName('pink'),
                    this.colors.byName('purple')
                ],
            }
        ];
        this.polarOptions = {
            responsive: true
        };
        // Radar chart
        // -----------------------------------
        this.radarData = {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                    label: 'My First dataset',
                    data: [65, 59, 90, 81, 56, 55, 40]
                }, {
                    label: 'My Second dataset',
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };
        this.radarColors = [
            {
                backgroundColor: 'rgba(114,102,186,0.2)',
                borderColor: 'rgba(114,102,186,1)',
                pointColor: 'rgba(114,102,186,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(114,102,186,1)'
            }, {
                backgroundColor: 'rgba(151,187,205,0.2)',
                borderColor: 'rgba(151,187,205,1)',
                pointColor: 'rgba(151,187,205,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(151,187,205,1)'
            }
        ];
        this.radarOptions = {
            responsive: true
        };
    }
    ChartjsComponent.prototype.ngOnInit = function () {
    };
    // random values for demo
    ChartjsComponent.prototype.rFactor = function () {
        return Math.round(Math.random() * 100);
    };
    ;
    ChartjsComponent = __decorate([
        Component({
            selector: 'app-chartjs',
            templateUrl: './chartjs.component.html',
            styleUrls: ['./chartjs.component.scss']
        }),
        __metadata("design:paramtypes", [ColorsService])
    ], ChartjsComponent);
    return ChartjsComponent;
}());
export { ChartjsComponent };
//# sourceMappingURL=chartjs.component.js.map