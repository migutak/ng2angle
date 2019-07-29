var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { NgxSelectModule } from 'ngx-select-ex';
import { TextMaskModule } from 'angular2-text-mask';
import { TagInputModule } from 'ngx-chips';
import { CustomFormsModule } from 'ng2-validation';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedModule } from '../../shared/shared.module';
import { StandardComponent } from './standard/standard.component';
import { ExtendedComponent } from './extended/extended.component';
import { ValidationComponent } from './validation/validation.component';
import { UploadComponent } from './upload/upload.component';
import { CropperComponent } from './cropper/cropper.component';
var routes = [
    { path: 'standard', component: StandardComponent },
    { path: 'extended', component: ExtendedComponent },
    { path: 'validation', component: ValidationComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'cropper', component: CropperComponent }
];
var FormsModule = /** @class */ (function () {
    function FormsModule() {
    }
    FormsModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                RouterModule.forChild(routes),
                NgxSelectModule,
                ColorPickerModule,
                TextMaskModule,
                TagInputModule,
                CustomFormsModule,
                FileUploadModule,
                ImageCropperModule
            ],
            providers: [ColorPickerService],
            declarations: [
                StandardComponent,
                ExtendedComponent,
                ValidationComponent,
                UploadComponent,
                CropperComponent
            ],
            exports: [
                RouterModule
            ]
        })
    ], FormsModule);
    return FormsModule;
}());
export { FormsModule };
//# sourceMappingURL=forms.module.js.map