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
import { ActivatedRoute } from '@angular/router';
var ActivitydashComponent = /** @class */ (function () {
    //
    function ActivitydashComponent(route) {
        this.route = route;
        this.activitydash = false;
        this.amntcollecteddash = false;
        this.regionaldash = false;
        this.systemdash = false;
    }
    ActivitydashComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.reportname = this.route.snapshot.queryParamMap.get('report');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.reportname = queryParams.get('report');
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
    };
    ActivitydashComponent = __decorate([
        Component({
            selector: 'app-activitydash',
            templateUrl: './activitydash.component.html',
            styleUrls: ['./activitydash.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute])
    ], ActivitydashComponent);
    return ActivitydashComponent;
}());
export { ActivitydashComponent };
//# sourceMappingURL=activitydash.component.js.map