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
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../environments/environment';
import { EcolService } from '../../../services/ecol.service';
var AllManualsComponent = /** @class */ (function () {
    function AllManualsComponent(ecolService) {
        this.ecolService = ecolService;
        //
    }
    AllManualsComponent.prototype.ngOnInit = function () { };
    AllManualsComponent.prototype.open = function (manualpath, filename) {
        this.downloadDemand(environment.manuals_path + manualpath, filename);
    };
    AllManualsComponent.prototype.downloadDemand = function (filepath, filename) {
        this.ecolService.downloadFile(filepath).subscribe(function (data) {
            saveAs(data, filename);
        }, function (error) {
            console.log(error);
            swal({
                title: 'Error!',
                imageUrl: "assets/img/user/coop.jpg",
                text: 'Cannot download  file!',
                confirmButtonColor: '#7ac142'
            });
        });
    };
    AllManualsComponent = __decorate([
        Component({
            selector: 'app-allmanuals',
            templateUrl: './allmanuals.component.html',
            styleUrls: ['./allmanuals.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService])
    ], AllManualsComponent);
    return AllManualsComponent;
}());
export { AllManualsComponent };
//# sourceMappingURL=allmanuals.component.js.map