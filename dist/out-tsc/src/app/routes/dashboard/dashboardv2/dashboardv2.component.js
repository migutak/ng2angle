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
import { HttpClient } from '@angular/common/http';
import { ColorsService } from '../../../shared/colors/colors.service';
var Dashboardv2Component = /** @class */ (function () {
    function Dashboardv2Component(colors, http) {
        var _this = this;
        this.colors = colors;
        this.http = http;
        this.sparkOptions1 = {
            barColor: this.colors.byName('info'),
            height: 60,
            barWidth: 10,
            barSpacing: 6,
            chartRangeMin: 0
        };
        this.sparkOptions2 = {
            type: 'line',
            height: 60,
            width: '80%',
            lineWidth: 2,
            lineColor: this.colors.byName('purple'),
            chartRangeMin: 0,
            spotColor: '#888',
            minSpotColor: this.colors.byName('purple'),
            maxSpotColor: this.colors.byName('purple'),
            fillColor: '',
            highlightLineColor: '#fff',
            spotRadius: 3,
            resize: true
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
                // position: ($rootScope.app.layout.isRTL ? 'right' : 'left'),
                tickColor: '#eee'
            },
            shadowSize: 0
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
                // position: ($rootScope.app.layout.isRTL ? 'right' : 'left'),
                tickFormatter: function (v) {
                    return v /* + ' visitors'*/;
                }
            },
            shadowSize: 0
        };
        this.easyPiePercent1 = 60;
        this.easyPiePercent2 = 30;
        this.easyPiePercent3 = 50;
        this.easyPiePercent4 = 75;
        this.pieOptions1 = {
            animate: {
                duration: 800,
                enabled: true
            },
            barColor: this.colors.byName('info'),
            trackColor: '#edf2f6',
            scaleColor: false,
            lineWidth: 2,
            lineCap: 'round',
            size: 130
        };
        this.pieOptions2 = {
            animate: {
                duration: 800,
                enabled: true
            },
            barColor: this.colors.byName('pink'),
            trackColor: '#edf2f6',
            scaleColor: false,
            lineWidth: 2,
            lineCap: 'round',
            size: 130
        };
        this.pieOptions3 = {
            animate: {
                duration: 800,
                enabled: true
            },
            barColor: this.colors.byName('purple'),
            trackColor: '#edf2f6',
            scaleColor: false,
            lineWidth: 2,
            lineCap: 'round',
            size: 130
        };
        this.pieOptions4 = {
            animate: {
                duration: 800,
                enabled: true
            },
            barColor: this.colors.byName('warning'),
            trackColor: '#edf2f6',
            scaleColor: false,
            lineWidth: 2,
            lineCap: 'round',
            size: 130
        };
        http.get('assets/server/chart/barstackedv2.json').subscribe(function (data) { return _this.barStackedData = data; });
        http.get('assets/server/chart/splinev2.json').subscribe(function (data) { return _this.splineData = data; });
    }
    Dashboardv2Component.prototype.ngOnInit = function () {
    };
    Dashboardv2Component = __decorate([
        Component({
            selector: 'app-dashboardv2',
            templateUrl: './dashboardv2.component.html',
            styleUrls: ['./dashboardv2.component.scss']
        }),
        __metadata("design:paramtypes", [ColorsService, HttpClient])
    ], Dashboardv2Component);
    return Dashboardv2Component;
}());
export { Dashboardv2Component };
//# sourceMappingURL=dashboardv2.component.js.map