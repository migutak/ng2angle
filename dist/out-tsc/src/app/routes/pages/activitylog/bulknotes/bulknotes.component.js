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
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
var URL = environment.xlsuploadapi;
var BulknotesComponent = /** @class */ (function () {
    function BulknotesComponent(settings, route, ecolService) {
        var _this = this;
        this.settings = settings;
        this.route = route;
        this.ecolService = ecolService;
        this.uploader = new FileUploader({ url: URL });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        //
        //
        this.uploader.onBuildItemForm = function (item, form) {
            form.append('owner', _this.username);
            form.append('custnumber', _this.custnumber);
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            // console.log('ImageUpload:uploaded:', item, status, response);
        };
        this.uploader.onErrorItem = function (item, response, status, headers) { return _this.onErrorItem(item, response, status, headers); };
        this.uploader.onSuccessItem = function (item, response, status, headers) { return _this.onSuccessItem(item, response, status, headers); };
    }
    BulknotesComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    BulknotesComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    BulknotesComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.accnumber = queryParams.get('accnumber');
        });
        /*this.username = this.route.snapshot.queryParamMap.get('username');
        this.route.queryParamMap.subscribe(queryParams => {
          this.username = queryParams.get('username');
        });*/
        this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.custnumber = queryParams.get('custnumber');
        });
        // get account details
    };
    BulknotesComponent.prototype.onSuccessItem = function (item, response, status, headers) {
        var data = JSON.parse(response); // success server response
        var bulknotes = data.notes;
        if (data.success === false) {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
        else {
            for (var x = 0; x < bulknotes.length; x++) {
                bulknotes[x].custnumber = (bulknotes[x].accnumber).substring(5, 12);
                bulknotes[x].owner = this.username;
                bulknotes[x].notesrc = 'uploaded a note';
            }
            console.log(bulknotes);
            this.ecolService.postnotes(bulknotes).subscribe(function (resp) {
                swal({
                    type: 'success',
                    title: 'All Good!',
                    text: 'Excel bulk notes upload is a success',
                });
            }, function (error) {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            });
        }
    };
    BulknotesComponent.prototype.onErrorItem = function (item, response, status, headers) {
        var error = JSON.parse(response); // error server response
        console.log('error', error);
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong with xlxs upload!',
        });
    };
    BulknotesComponent.prototype.downloadFile = function () {
        var template = environment.xlstemplate;
        this.ecolService.downloadFile(template).subscribe(function (data) {
            saveAs(data, 'ECollect_bulk_notes_upload_template.xlsx');
        }, function (error) {
            console.log(error);
            swal('Error!', ' Cannot download template  file!', 'error');
        });
    };
    BulknotesComponent = __decorate([
        Component({
            selector: 'app-bulknotes',
            templateUrl: './bulknotes.component.html',
            styleUrls: ['./bulknotes.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService,
            ActivatedRoute,
            EcolService])
    ], BulknotesComponent);
    return BulknotesComponent;
}());
export { BulknotesComponent };
//# sourceMappingURL=bulknotes.component.js.map