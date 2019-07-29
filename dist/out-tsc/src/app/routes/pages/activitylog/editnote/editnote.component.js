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
import { environment } from '../../../../../environments/environment';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
var URL = environment.valor;
var EditnoteComponent = /** @class */ (function () {
    function EditnoteComponent(settings, route, ecolService, formBuilder, spinner) {
        this.settings = settings;
        this.route = route;
        this.ecolService = ecolService;
        this.formBuilder = formBuilder;
        this.spinner = spinner;
        this.model = {};
        this.note = [];
        this.submitted = false;
        //
    }
    EditnoteComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.accnumber = queryParams.get('accnumber');
            _this.model.accnumber = queryParams.get('accnumber');
        });
        /*this.username = this.route.snapshot.queryParamMap.get('username');
        this.route.queryParamMap.subscribe(queryParams => {
          this.username = queryParams.get('username');
        });*/
        this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.custnumber = queryParams.get('custnumber');
            _this.model.custnumber = queryParams.get('custnumber');
        });
        this.noteid = this.route.snapshot.queryParamMap.get('id');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.noteid = queryParams.get('id');
            _this.model.id = queryParams.get('id');
        });
        // get this note
        this.getNote(this.noteid);
        this.buildForm();
    };
    EditnoteComponent.prototype.onSubmit = function () {
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        // Loading indictor
        // this.ecolService.loader();
        //
        this.spinner.show();
        var body = {
            id: this.f.id.value,
            owner: this.username,
            notemade: this.f.notemade.value,
            custnumber: this.model.custnumber,
            accnumber: this.model.accnumber,
            notesrc: this.note.notesrc,
            noteimp: this.note.noteimp,
            notedate: new Date(),
        };
        this.spinner.hide();
        this.ecolService.putnote(body).subscribe(function (data) {
            swal({
                title: 'Success!',
                imageUrl: "assets/img/user/coop.jpg",
                text: 'Note updated!',
                showCancelButton: false,
                confirmButtonColor: '#7ac142',
                confirmButtonText: 'Okay'
            });
            // swal('Successful!', 'Note updated!', 'success');
            //
        }, function (error) {
            console.log(error);
            swal('Error!', 'Error occurred during processing!', 'error');
        });
    };
    EditnoteComponent.prototype.getNote = function (id) {
        var _this = this;
        this.ecolService.getanote(id).subscribe(function (data) {
            _this.note = data;
            _this.buildForm();
        }, function (error) {
            console.log(error);
        });
    };
    Object.defineProperty(EditnoteComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.editnoteForm.controls; },
        enumerable: true,
        configurable: true
    });
    EditnoteComponent.prototype.buildForm = function () {
        // get static data
        this.editnoteForm = this.formBuilder.group({
            id: [{ value: this.note.id, disabled: true }],
            accnumber: [{ value: this.note.accnumber, disabled: true }],
            custnumber: [{ value: this.note.custnumber, disabled: true }],
            notemade: [{ value: this.note.notemade, disabled: false }],
            notedate: [{ value: this.note.notedate, disabled: true }],
            owner: [{ value: this.note.owner, disabled: true }]
        });
    };
    EditnoteComponent.prototype.cancel = function () {
        window.history.back();
    };
    EditnoteComponent = __decorate([
        Component({
            selector: 'app-editnote',
            templateUrl: './editnote.component.html',
            styleUrls: ['./editnote.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService,
            ActivatedRoute,
            EcolService,
            FormBuilder,
            NgxSpinnerService])
    ], EditnoteComponent);
    return EditnoteComponent;
}());
export { EditnoteComponent };
//# sourceMappingURL=editnote.component.js.map