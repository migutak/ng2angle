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
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
var MyworklistComponent = /** @class */ (function () {
    function MyworklistComponent(ecolService) {
        this.ecolService = ecolService;
        this.model = {};
    }
    MyworklistComponent.prototype.ngOnInit = function () {
    };
    MyworklistComponent.prototype.Search = function (accnumber) {
        var _this = this;
        this.ecolService.loader();
        this.ecolService.getdemandshistory(accnumber.value).subscribe(function (data) {
            if (data.length > 0) {
                _this.demands = data;
                swal('Successful!', 'Historical letters generated!', 'success');
            }
            else {
                _this.demands = [];
                swal('Warning!', 'No demand Letter was found!', 'warning');
            }
        }, function (error) {
            console.log(error);
            swal('Error!', 'Error occurred letter generation!', 'error');
        });
    };
    MyworklistComponent.prototype.downloadFile = function (filepath) {
        this.ecolService.downloadFile(filepath).subscribe(function (data) {
            saveAs(data, 'filename');
        }, function (error) {
            console.log(error.error);
            swal('Error!', ' Cannot download  file!', 'error');
        });
    };
    MyworklistComponent = __decorate([
        Component({
            selector: 'app-myworklist',
            templateUrl: './myworklist.component.html',
            styleUrls: ['./myworklist.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService])
    ], MyworklistComponent);
    return MyworklistComponent;
}());
export { MyworklistComponent };
//# sourceMappingURL=myworklist.component.js.map