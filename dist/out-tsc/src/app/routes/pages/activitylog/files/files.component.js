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
import { DataService } from '../../../../services/data.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
var URL = environment.filesapi;
var FilesComponent = /** @class */ (function () {
    function FilesComponent(settings, route, ecolService, dataService) {
        var _this = this;
        this.settings = settings;
        this.route = route;
        this.ecolService = ecolService;
        this.dataService = dataService;
        this.model = {};
        this.files = [];
        this.filetype = [
            { filetype: 'Other' },
            { filetype: 'Demand Letter' },
            { filetype: 'Customer Correspondence' }
        ];
        this.uploader = new FileUploader({ url: URL });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        //
        this.uploader.onBuildItemForm = function (item, form) {
            form.append('docdesc', _this.model.docdesc);
            form.append('accnumber', _this.accnumber);
            form.append('owner', _this.username);
            form.append('custnumber', _this.custnumber);
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            // refresh demad history notes
        };
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            // success
            var obj = JSON.parse(response);
            for (var i = 0; i < obj.files.length; i++) {
                var bulk = {
                    'accnumber': _this.accnumber,
                    'custnumber': _this.custnumber,
                    'destpath': obj.files[i].path,
                    'filesize': obj.files[i].size,
                    'filetype': obj.files[i].mimetype,
                    'filepath': obj.files[i].path,
                    'filename': obj.files[i].originalname,
                    'doctype': obj.files[i].originalname,
                    'docdesc': _this.model.filedesc,
                    'colofficer': _this.username,
                    'userdesctype': _this.model.userdesctype
                };
                _this.ecolService.uploads(bulk).subscribe(function (resp) {
                    _this.getfileshistory(_this.custnumber);
                    swal('Good!', 'File uploaded successfully!', 'success');
                }, function (error) {
                    swal('Oooops!', 'File uploaded but unable to add to files history!', 'warning');
                });
            }
        };
        this.uploader.onErrorItem = function (item, response, status, headers) {
            // error server response
        };
    }
    FilesComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    FilesComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    FilesComponent.prototype.ngOnInit = function () {
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
        // get files
        this.getfileshistory(this.custnumber);
    };
    FilesComponent.prototype.getfileshistory = function (custnumber) {
        var _this = this;
        this.ecolService.getfileshistory(custnumber).subscribe(function (data) {
            _this.files = data;
            _this.dataService.pushFile(data.length);
        });
    };
    FilesComponent.prototype.downloadFile = function (filepath, filename) {
        this.ecolService.downloadFile(filepath).subscribe(function (data) {
            saveAs(data, filename);
        }, function (error) {
            console.log(error.error);
            swal('Error!', ' Cannot download  file!', 'error');
        });
    };
    FilesComponent = __decorate([
        Component({
            selector: 'app-files',
            templateUrl: './files.component.html',
            styleUrls: ['./files.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService,
            ActivatedRoute,
            EcolService,
            DataService])
    ], FilesComponent);
    return FilesComponent;
}());
export { FilesComponent };
//# sourceMappingURL=files.component.js.map