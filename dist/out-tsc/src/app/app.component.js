var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, HostBinding } from '@angular/core';
import { SettingsService } from './core/settings/settings.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
var AppComponent = /** @class */ (function () {
    // constructor(public settings: SettingsService) { }
    function AppComponent(settings, _loadingBar, _router) {
        var _this = this;
        this.settings = settings;
        this._loadingBar = _loadingBar;
        this._router = _router;
        this._router.events.subscribe(function (event) {
            _this.navigationInterceptor(event);
        });
    }
    Object.defineProperty(AppComponent.prototype, "isFixed", {
        get: function () { return this.settings.getLayoutSetting('isFixed'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "isCollapsed", {
        get: function () { return this.settings.getLayoutSetting('isCollapsed'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "isBoxed", {
        get: function () { return this.settings.getLayoutSetting('isBoxed'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "useFullLayout", {
        get: function () { return this.settings.getLayoutSetting('useFullLayout'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "hiddenFooter", {
        get: function () { return this.settings.getLayoutSetting('hiddenFooter'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "horizontal", {
        get: function () { return this.settings.getLayoutSetting('horizontal'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "isFloat", {
        get: function () { return this.settings.getLayoutSetting('isFloat'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "offsidebarOpen", {
        get: function () { return this.settings.getLayoutSetting('offsidebarOpen'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "asideToggled", {
        get: function () { return this.settings.getLayoutSetting('asideToggled'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "isCollapsedText", {
        get: function () { return this.settings.getLayoutSetting('isCollapsedText'); },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.navigationInterceptor = function (event) {
        if (event instanceof NavigationStart) {
            this._loadingBar.start();
        }
        if (event instanceof NavigationEnd) {
            this._loadingBar.complete();
        }
        if (event instanceof NavigationCancel) {
            this._loadingBar.stop();
        }
        if (event instanceof NavigationError) {
            this._loadingBar.stop();
        }
    };
    AppComponent.prototype.ngOnInit = function () {
        document.addEventListener('click', function (e) {
            var target = e.target;
            if (target.tagName === 'A') {
                e.preventDefault();
            }
        });
    };
    __decorate([
        HostBinding('class.layout-fixed'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], AppComponent.prototype, "isFixed", null);
    __decorate([
        HostBinding('class.aside-collapsed'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], AppComponent.prototype, "isCollapsed", null);
    __decorate([
        HostBinding('class.layout-boxed'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], AppComponent.prototype, "isBoxed", null);
    __decorate([
        HostBinding('class.layout-fs'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], AppComponent.prototype, "useFullLayout", null);
    __decorate([
        HostBinding('class.hidden-footer'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], AppComponent.prototype, "hiddenFooter", null);
    __decorate([
        HostBinding('class.layout-h'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], AppComponent.prototype, "horizontal", null);
    __decorate([
        HostBinding('class.aside-float'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], AppComponent.prototype, "isFloat", null);
    __decorate([
        HostBinding('class.offsidebar-open'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], AppComponent.prototype, "offsidebarOpen", null);
    __decorate([
        HostBinding('class.aside-toggled'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], AppComponent.prototype, "asideToggled", null);
    __decorate([
        HostBinding('class.aside-collapsed-text'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], AppComponent.prototype, "isCollapsedText", null);
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService, SlimLoadingBarService, Router])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map