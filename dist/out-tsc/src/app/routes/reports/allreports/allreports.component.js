var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
var AllReportsComponent = /** @class */ (function () {
    function AllReportsComponent() {
    }
    AllReportsComponent.prototype.ngOnInit = function () { };
    AllReportsComponent.prototype.onNavigate = function (reportname) {
        window.open('activitydash?report=' + reportname, '_blank');
    };
    AllReportsComponent.prototype.openactivityrpt = function () {
        window.open(environment.birt + '/frameset?__report=collectoractivity_test2.rptdesign&__title=Activity Report', '_blank');
    };
    AllReportsComponent.prototype.open = function (report) {
        window.open(environment.birt + report, '_blank');
    };
    AllReportsComponent = __decorate([
        Component({
            selector: 'app-allreports',
            templateUrl: './allreports.component.html',
            styleUrls: ['./allreports.component.scss']
        })
    ], AllReportsComponent);
    return AllReportsComponent;
}());
export { AllReportsComponent };
//# sourceMappingURL=allreports.component.js.map