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
var WidgetsComponent = /** @class */ (function () {
    function WidgetsComponent(colors) {
        this.colors = colors;
        this.lat = 33.790807;
        this.lng = -117.835734;
        this.zoom = 14;
        this.scrollwheel = false;
        this.sparkOptions1 = {
            barColor: this.colors.byName('primary'),
            height: 20,
            barWidth: 3,
            barSpacing: 2
        };
        this.sparkOptions2 = {
            type: 'line',
            height: 80,
            width: '100%',
            lineWidth: 2,
            lineColor: '#dddddd',
            spotColor: '#bbbbbb',
            fillColor: '',
            highlightLineColor: '#fff',
            spotRadius: 3,
            resize: true
        };
        this.sparkOptions3 = {
            barColor: '#fff',
            height: 50,
            barWidth: 6,
            barSpacing: 6
        };
        this.sparkOptions4 = {
            barColor: this.colors.byName('primary'),
            height: 30,
            barWidth: 6,
            barSpacing: 6
        };
    }
    WidgetsComponent.prototype.ngOnInit = function () {
    };
    WidgetsComponent = __decorate([
        Component({
            selector: 'app-widgets',
            templateUrl: './widgets.component.html',
            styleUrls: ['./widgets.component.scss']
        }),
        __metadata("design:paramtypes", [ColorsService])
    ], WidgetsComponent);
    return WidgetsComponent;
}());
export { WidgetsComponent };
//# sourceMappingURL=widgets.component.js.map