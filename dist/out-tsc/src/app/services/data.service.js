var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
var DataService = /** @class */ (function () {
    function DataService() {
        this.ptpsSubject = new BehaviorSubject(0);
        this.notesSubject = new BehaviorSubject(0);
        this.guarantorsSubject = new BehaviorSubject(0);
        this.contactsSubject = new BehaviorSubject(0);
        this.collateralSubject = new BehaviorSubject(0);
        this.filesSubject = new BehaviorSubject(0);
    }
    DataService.prototype.getNotesData = function () {
        return this.notesSubject.asObservable();
    };
    DataService.prototype.getCollateral = function () {
        return this.collateralSubject.asObservable();
    };
    DataService.prototype.getContacts = function () {
        return this.contactsSubject.asObservable();
    };
    DataService.prototype.getGuarantors = function () {
        return this.guarantorsSubject.asObservable();
    };
    DataService.prototype.getFiles = function () {
        return this.filesSubject.asObservable();
    };
    DataService.prototype.getPtpsData = function () {
        return this.ptpsSubject.asObservable();
    };
    DataService.prototype.pustPtpsData = function (dataToPush) {
        this.ptpsSubject.next(dataToPush);
    };
    DataService.prototype.pustNotesData = function (dataToPush) {
        this.notesSubject.next(dataToPush);
    };
    DataService.prototype.pushContacts = function (dataToPush) {
        this.contactsSubject.next(dataToPush);
    };
    DataService.prototype.pushGuarantors = function (dataToPush) {
        this.guarantorsSubject.next(dataToPush);
    };
    DataService.prototype.pushCollateral = function (dataToPush) {
        this.collateralSubject.next(dataToPush);
    };
    DataService.prototype.pushFile = function (totalFiles) {
        this.filesSubject.next(totalFiles);
    };
    DataService.prototype.pushPtpsData = function (ptps) {
        this.ptpsSubject.next(ptps);
    };
    DataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=data.service.js.map