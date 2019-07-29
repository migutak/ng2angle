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
var ProjectsdetailsComponent = /** @class */ (function () {
    function ProjectsdetailsComponent(colors) {
        this.colors = colors;
        this.sparkOptionsInfo = {
            type: 'pie',
            sliceColors: [this.colors.byName('gray-lighter'), this.colors.byName('info')],
            height: 60
        };
        this.sparkOptionsWarning = {
            type: 'pie',
            sliceColors: [this.colors.byName('gray-lighter'), this.colors.byName('warning')],
            height: 60
        };
        this.sparkOptionsSuccess = {
            type: 'pie',
            sliceColors: [this.colors.byName('gray-lighter'), this.colors.byName('success')],
            height: 60
        };
        this.sparkOptionsActivity = {
            type: 'line',
            height: 100,
            width: '100%',
            lineWidth: 3,
            lineColor: this.colors.byName('info'),
            chartRangeMin: 0,
            spotColor: '#888',
            minSpotColor: this.colors.byName('info'),
            maxSpotColor: this.colors.byName('info'),
            fillColor: '#e5f2fa',
            highlightLineColor: '#fff',
            spotRadius: 5,
            resize: 'true'
        };
    }
    ProjectsdetailsComponent.prototype.ngOnInit = function () {
    };
    ProjectsdetailsComponent = __decorate([
        Component({
            selector: 'app-projectsdetails',
            templateUrl: './projectsdetails.component.html',
            styleUrls: ['./projectsdetails.component.scss']
        }),
        __metadata("design:paramtypes", [ColorsService])
    ], ProjectsdetailsComponent);
    return ProjectsdetailsComponent;
}());
export { ProjectsdetailsComponent };
//# sourceMappingURL=projectsdetails.component.js.map