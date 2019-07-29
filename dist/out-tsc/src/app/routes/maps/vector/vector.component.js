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
var VectorComponent = /** @class */ (function () {
    function VectorComponent() {
        this.defaultColors = {
            markerColor: '#23b7e5',
            bgColor: 'transparent',
            scaleColors: ['#878c9a'],
            regionFill: '#bbbec6' // the base region color
        };
        this.mapName = 'world_mill_en';
        this.mapOptions = {
            markerColor: this.defaultColors.markerColor,
            bgColor: this.defaultColors.bgColor,
            scale: 1,
            scaleColors: this.defaultColors.scaleColors,
            regionFill: this.defaultColors.regionFill
        };
        this.seriesData = {
            'CA': 11100,
            'DE': 2510,
            'FR': 3710,
            'AU': 5710,
            'GB': 8310,
            'RU': 9310,
            'BR': 6610,
            'IN': 7810,
            'CN': 4310,
            'US': 839,
            'SA': 410 // Saudi Arabia
        };
        this.markersData = [
            { latLng: [41.90, 12.45], name: 'Vatican City' },
            { latLng: [43.73, 7.41], name: 'Monaco' },
            { latLng: [-0.52, 166.93], name: 'Nauru' },
            { latLng: [-8.51, 179.21], name: 'Tuvalu' },
            { latLng: [7.11, 171.06], name: 'Marshall Islands' },
            { latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis' },
            { latLng: [3.2, 73.22], name: 'Maldives' },
            { latLng: [35.88, 14.5], name: 'Malta' },
            { latLng: [41.0, -71.06], name: 'New England' },
            { latLng: [12.05, -61.75], name: 'Grenada' },
            { latLng: [13.16, -59.55], name: 'Barbados' },
            { latLng: [17.11, -61.85], name: 'Antigua and Barbuda' },
            { latLng: [-4.61, 55.45], name: 'Seychelles' },
            { latLng: [7.35, 134.46], name: 'Palau' },
            { latLng: [42.5, 1.51], name: 'Andorra' }
        ];
    }
    VectorComponent.prototype.ngOnInit = function () {
    };
    VectorComponent = __decorate([
        Component({
            selector: 'app-vector',
            templateUrl: './vector.component.html',
            styleUrls: ['./vector.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], VectorComponent);
    return VectorComponent;
}());
export { VectorComponent };
//# sourceMappingURL=vector.component.js.map