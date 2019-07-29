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
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(http, location) {
        var _this = this;
        this.http = http;
        this.location = location;
        this.areaOptions = {
            series: {
                lines: {
                    show: true,
                    fill: 0.8
                },
                points: {
                    show: true,
                    radius: 4
                }
            },
            grid: {
                borderColor: '#eee',
                borderWidth: 1,
                hoverable: true,
                backgroundColor: '#fcfcfc'
            },
            tooltip: true,
            tooltipOpts: {
                content: function (label, x, y) { return x + ' : ' + y; }
            },
            xaxis: {
                tickColor: '#fcfcfc',
                mode: 'categories'
            },
            yaxis: {
                min: 0,
                tickColor: '#eee',
                // position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                tickFormatter: function (v) {
                    return v + ' customers';
                }
            },
            shadowSize: 0
        };
        this.barOptions = {
            series: {
                bars: {
                    align: 'center',
                    lineWidth: 0,
                    show: true,
                    barWidth: 0.6,
                    fill: 0.9
                }
            },
            grid: {
                borderColor: '#eee',
                borderWidth: 1,
                hoverable: true,
                backgroundColor: '#fcfcfc'
            },
            tooltip: true,
            tooltipOpts: {
                content: function (label, x, y) { return x + ' : ' + y; }
            },
            xaxis: {
                tickColor: '#fcfcfc',
                mode: 'categories'
            },
            yaxis: {
                // position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                tickColor: '#eee'
            },
            shadowSize: 0
        };
        this.barStackedOptions = {
            series: {
                stack: true,
                bars: {
                    align: 'center',
                    lineWidth: 0,
                    show: true,
                    barWidth: 0.6,
                    fill: 0.9
                }
            },
            grid: {
                borderColor: '#eee',
                borderWidth: 1,
                hoverable: true,
                backgroundColor: '#fcfcfc'
            },
            tooltip: true,
            tooltipOpts: {
                content: function (label, x, y) { return x + ' : ' + y; }
            },
            xaxis: {
                tickColor: '#fcfcfc',
                mode: 'categories'
            },
            yaxis: {
                min: 0,
                max: 200,
                // position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                tickColor: '#eee'
            },
            shadowSize: 0
        };
        this.lineOptions = {
            series: {
                lines: {
                    show: true,
                    fill: 0.01
                },
                points: {
                    show: true,
                    radius: 4
                }
            },
            grid: {
                borderColor: '#eee',
                borderWidth: 1,
                hoverable: true,
                backgroundColor: '#fcfcfc'
            },
            tooltip: true,
            tooltipOpts: {
                content: function (label, x, y) { return x + ' : ' + y; }
            },
            xaxis: {
                tickColor: '#eee',
                mode: 'categories'
            },
            yaxis: {
                // position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                tickColor: '#eee'
            },
            shadowSize: 0
        };
        // PIE
        // -----------------------------------
        this.pieData = [{
                'label': 'jQuery',
                'color': '#4acab4',
                'data': 30
            }, {
                'label': 'CSS',
                'color': '#ffea88',
                'data': 40
            }, {
                'label': 'LESS',
                'color': '#ff8153',
                'data': 90
            }, {
                'label': 'SASS',
                'color': '#878bb6',
                'data': 75
            }, {
                'label': 'Jade',
                'color': '#b2d767',
                'data': 120
            }];
        this.pieOptions = {
            series: {
                pie: {
                    show: true,
                    innerRadius: 0,
                    label: {
                        show: true,
                        radius: 0.8,
                        formatter: function (label, series) {
                            return '<div class="flot-pie-label">' +
                                // label + ' : ' +
                                Math.round(series.percent) +
                                '%</div>';
                        },
                        background: {
                            opacity: 0.8,
                            color: '#222'
                        }
                    }
                }
            }
        };
        // DONUT
        // -----------------------------------
        this.donutData = [{
                'color': '#39C558',
                'data': 60,
                'label': 'Coffee'
            },
            {
                'color': '#00b4ff',
                'data': 90,
                'label': 'CSS'
            },
            {
                'color': '#FFBE41',
                'data': 50,
                'label': 'LESS'
            },
            {
                'color': '#ff3e43',
                'data': 80,
                'label': 'Jade'
            },
            {
                'color': '#937fc7',
                'data': 116,
                'label': 'AngularJS'
            }
        ];
        this.donutOptions = {
            series: {
                pie: {
                    show: true,
                    innerRadius: 0.5 // This makes the donut shape
                }
            }
        };
        this.splineOptions = {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true,
                    radius: 4
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.5
                }
            },
            grid: {
                borderColor: '#eee',
                borderWidth: 1,
                hoverable: true,
                backgroundColor: '#fcfcfc'
            },
            tooltip: true,
            tooltipOpts: {
                content: function (label, x, y) { return x + ' : ' + y; }
            },
            xaxis: {
                tickColor: '#fcfcfc',
                mode: 'categories'
            },
            yaxis: {
                min: 0,
                max: 150,
                tickColor: '#eee',
                // position: (app.layout.isRTL ? 'right' : 'left'),
                tickFormatter: function (v) {
                    return v /* + ' visitors'*/;
                }
            },
            shadowSize: 0
        };
        // REALTIME
        // -----------------------------------
        this.rtAuxData = [];
        this.realTimeOptions = {
            series: {
                lines: { show: true, fill: true, fillColor: { colors: ['#a0e0f3', '#23b7e5'] } },
                shadowSize: 0 // Drawing is faster without shadows
            },
            grid: {
                show: false,
                borderWidth: 0,
                minBorderMargin: 20,
                labelMargin: 10
            },
            xaxis: {
                tickFormatter: function () {
                    return '';
                }
            },
            yaxis: {
                min: 0,
                max: 110
            },
            legend: {
                show: true
            },
            colors: ['#23b7e5']
        };
        this.getChartData('assets/server/chart/spline.json').subscribe(function (data) { return _this.splineData = data; });
        this.getChartData('assets/server/chart/bar.json').subscribe(function (data) { return _this.barData = data; });
        this.getChartData('assets/server/chart/barstacked.json').subscribe(function (data) { return _this.barStackeData = data; });
        this.getChartData('assets/server/chart/area.json').subscribe(function (data) { return _this.areaData = data; });
        this.getChartData('assets/server/chart/line.json').subscribe(function (data) { return _this.lineData = data; });
    }
    HomeComponent.prototype.ngOnInit = function () {
        // reload home page to refresh menus === kevin
        if (localStorage.getItem('profile') === '1') {
            window.location.reload();
        }
        //
        localStorage.setItem('profile', '0');
        // Generate random data for realtime demo
        this.update();
    };
    HomeComponent.prototype.getChartData = function (url) {
        return this.http.get(url);
    };
    HomeComponent.prototype.change = function () {
        // Change a value
        this.splineData[0].color = '#ff0000';
        // Create a new object in order to provide a different instance
        // so the directive can detect the change using ngOnChanges
        this.splineData = $.extend(true, [], this.splineData);
    };
    HomeComponent.prototype.ready = function ($event) {
        // $event == { plot: PlotObject }
        console.log('Ready!');
    };
    // REALTIME demo
    // -----------------------------------
    HomeComponent.prototype.getRandomData = function () {
        var totalPoints = 300;
        if (this.rtAuxData.length > 0) {
            this.rtAuxData = this.rtAuxData.slice(1);
        }
        // Do a random walk
        while (this.rtAuxData.length < totalPoints) {
            // tslint:disable-next-line:prefer-const
            var prev = this.rtAuxData.length > 0 ? this.rtAuxData[this.rtAuxData.length - 1] : 50, y = prev + Math.random() * 10 - 5;
            if (y < 0) {
                y = 0;
            }
            else if (y > 100) {
                y = 100;
            }
            this.rtAuxData.push(y);
        }
        // Zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < this.rtAuxData.length; ++i) {
            res.push([i, this.rtAuxData[i]]);
        }
        return [res];
    };
    HomeComponent.prototype.update = function () {
        this.realTimeData = this.getRandomData();
        setTimeout(this.update.bind(this), 30);
    };
    HomeComponent = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        }),
        __metadata("design:paramtypes", [HttpClient, Location])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map