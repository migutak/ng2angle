var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { SettingsService } from '../../core/settings/settings.service';
import { ThemesService } from '../../core/themes/themes.service';
import { TranslatorService } from '../../core/translator/translator.service';
import { Router } from '@angular/router';
import { EcolService } from '../../services/ecol.service';
import swal from 'sweetalert2';
var OffsidebarComponent = /** @class */ (function () {
    function OffsidebarComponent(settings, themes, translator, ecolService, router, elem) {
        this.settings = settings;
        this.themes = themes;
        this.translator = translator;
        this.ecolService = ecolService;
        this.router = router;
        this.elem = elem;
        this.online = [];
        this.currentTheme = themes.getDefaultTheme();
        this.selectedLanguage = this.getLangs()[0].code;
    }
    OffsidebarComponent.prototype.ngOnInit = function () {
        this.anyClickClose();
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
    };
    OffsidebarComponent.prototype.setTheme = function () {
        this.themes.setTheme(this.currentTheme);
    };
    OffsidebarComponent.prototype.getLangs = function () {
        return this.translator.getAvailableLanguages();
    };
    OffsidebarComponent.prototype.setLang = function (value) {
        this.translator.useLanguage(value);
    };
    OffsidebarComponent.prototype.anyClickClose = function () {
        document.addEventListener('click', this.checkCloseOffsidebar.bind(this), false);
    };
    OffsidebarComponent.prototype.checkCloseOffsidebar = function (e) {
        var contains = (this.elem.nativeElement !== e.target && this.elem.nativeElement.contains(e.target));
        if (!contains) {
            this.settings.setLayoutSetting('offsidebarOpen', false);
        }
    };
    OffsidebarComponent.prototype.getloggedinusers = function () {
        var _this = this;
        this.ecolService.getloggedinusers().subscribe(function (data) {
            _this.online = data;
        });
    };
    OffsidebarComponent.prototype.ngOnDestroy = function () {
        document.removeEventListener('click', this.checkCloseOffsidebar);
    };
    OffsidebarComponent.prototype.logout = function () {
        var _this = this;
        //
        swal({
            title: 'Are you sure?',
            text: 'You want to logout!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout!'
        }).then(function (result) {
            if (result.value) {
                _this.ecolService.logout();
                _this.router.navigate(['/login']);
            }
        });
    };
    OffsidebarComponent = __decorate([
        Component({
            selector: 'app-offsidebar',
            templateUrl: './offsidebar.component.html',
            styleUrls: ['./offsidebar.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService,
            ThemesService,
            TranslatorService,
            EcolService,
            Router,
            ElementRef])
    ], OffsidebarComponent);
    return OffsidebarComponent;
}());
export { OffsidebarComponent };
//# sourceMappingURL=offsidebar.component.js.map