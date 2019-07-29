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
import { ActivatedRoute, Router } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import { isNullOrUndefined } from 'util';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
var NotesComponent = /** @class */ (function () {
    function NotesComponent(ecolservice, route, rout, datePipe, spinner, ecolService) {
        this.ecolservice = ecolservice;
        this.route = route;
        this.rout = rout;
        this.datePipe = datePipe;
        this.spinner = spinner;
        this.ecolService = ecolService;
        this.noteData = [];
        this.notes = [];
        this.pager = {
            limit: 5,
            current: 0,
            reachedend: false
        };
        this.query = {
            limit: this.pager.limit,
            skip: this.pager.limit * this.pager.current
        };
        this.currentDate = new Date();
    }
    NotesComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.route.queryParams.subscribe(function (params) {
            _this.cust = params['custnumber'];
        });
        // this.data.currentMessage.subscribe(message => this.message = message)
        this.getAll(this.cust);
    };
    NotesComponent.prototype.getAll = function (cust) {
        var _this = this;
        this.query.limit = this.pager.limit;
        this.query.skip = this.pager.limit * this.pager.current;
        // const filter = encodeURI(JSON.stringify(this.query));
        // console.log('this.query ', this.query);
        this.ecolservice.getallnotes(this.query, cust).subscribe(function (data) {
            _this.notes = data;
            for (var i = 0; i < data.length; i++) {
                // tslint:disable-next-line:max-line-length
                if (_this.notes[i].OWNER === _this.username && (_this.datePipe.transform(_this.currentDate, 'dd-MMM-yy')).toUpperCase() === ((_this.notes[i].NOTEDATE).substring(0, 9)).toUpperCase()) {
                    _this.notes[i].showedit = true;
                }
                else {
                    _this.notes[i].showedit = false;
                }
            }
            // append posts
            if (!isNullOrUndefined(data) && _this.notes.length) {
                _this.noteData = _this.noteData.concat(data);
            }
            else {
                _this.pager.reachedend = true;
            }
        }, function (err) {
            console.log(err);
        });
    };
    NotesComponent.prototype.loadmore = function (event) {
        var _this = this;
        this.spinner.show();
        // increase the current by 1
        // if current = 0, skip = limit*current
        event.preventDefault();
        this.pager.current = this.pager.current + 1;
        this.getAll(this.cust);
        setTimeout(function () {
            _this.spinner.hide();
        }, 1500);
    };
    NotesComponent.prototype.editnote = function (note) {
        // tslint:disable-next-line:max-line-length
        this.rout.navigateByUrl('/activitylog/editnote?id=' + note.ID + '&accnumber=' + note.ACCNUMBER + '&custnumber=' + note.CUSTNUMBER + '&username=' + note.OWNER + '&sys=watch').then(function (e) {
            if (e) {
                console.log('Navigation is successful!');
            }
            else {
                console.log('Navigation has failed!');
            }
        });
    };
    NotesComponent = __decorate([
        Component({
            selector: 'app-notes',
            templateUrl: './notes.component.html',
            styleUrls: ['./notes.component.scss'],
            providers: [DatePipe]
        }),
        __metadata("design:paramtypes", [EcolService,
            ActivatedRoute,
            Router,
            DatePipe,
            NgxSpinnerService,
            EcolService])
    ], NotesComponent);
    return NotesComponent;
}());
export { NotesComponent };
//# sourceMappingURL=notes.component.js.map