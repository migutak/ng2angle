var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
var CropperComponent = /** @class */ (function () {
    function CropperComponent() {
        this.name = 'Angular2';
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;
        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;
        this.cropperSettings.canvasWidth = 460;
        this.cropperSettings.canvasHeight = 400;
        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;
        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(0,0,0,.25)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        this.cropperSettings.rounded = false;
        this.data1 = {};
    }
    CropperComponent.prototype.setRoundedMethod = function (value) {
        this.cropperSettings.rounded = value;
    };
    CropperComponent.prototype.cropped = function (bounds) {
        console.log(bounds);
    };
    CropperComponent.prototype.fileChangeListener = function ($event) {
        var image = new Image();
        var file = $event.target.files[0];
        var myReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };
        myReader.readAsDataURL(file);
    };
    CropperComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        ViewChild('cropper', undefined),
        __metadata("design:type", ImageCropperComponent)
    ], CropperComponent.prototype, "cropper", void 0);
    CropperComponent = __decorate([
        Component({
            selector: 'app-cropper',
            templateUrl: './cropper.component.html',
            styleUrls: ['./cropper.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], CropperComponent);
    return CropperComponent;
}());
export { CropperComponent };
//# sourceMappingURL=cropper.component.js.map