var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
var screenfull = require('screenfull');
import { UserblockService } from '../sidebar/userblock/userblock.service';
import { SettingsService } from '../../core/settings/settings.service';
import { MenuService } from '../../core/menu/menu.service';
import { EcolService } from '../../services/ecol.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(menu, userblockService, settings, ecolService, router) {
        this.menu = menu;
        this.userblockService = userblockService;
        this.settings = settings;
        this.ecolService = ecolService;
        this.router = router;
        this.navCollapsed = true; // for horizontal layout
        this.menuItems = []; // for horizontal layout
        this.nu_of_alerts = 4;
        this.nu_of_brokenptps = 0;
        this.nu_of_demandsdue = 0;
        this.nu_of_overdue = 0;
        this.nu_of_cc_demands = 0;
        this.userdata = {};
        // show only a few items on demo
        this.menuItems = menu.getMenu().slice(0, 4); // for horizontal layout
        // get notifications
        // ptps, overdue and demand letters
        // this.getnotification();
        this.userdata = JSON.parse(localStorage.getItem('currentUser'));
        this.userperm = JSON.parse(localStorage.getItem('userpermission'));
        this.user = {
            picture: 'assets/img/user/coop.jpg',
            username: this.userdata.username,
            division: this.userdata.team,
            role: this.userdata.role
        };
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.isNavSearchVisible = false;
        var ua = window.navigator.userAgent;
        if (ua.indexOf('MSIE ') > 0 || !!ua.match(/Trident.*rv\:11\./)) { // Not supported under IE
            this.fsbutton.nativeElement.style.display = 'none';
        }
        // Switch fullscreen icon indicator
        var el = this.fsbutton.nativeElement.firstElementChild;
        screenfull.on('change', function () {
            if (el) {
                el.className = screenfull.isFullscreen ? 'fa fa-compress' : 'fa fa-expand';
            }
        });
    };
    /*getnotification() {
        this.ecolService.notifications().subscribe(data => {
            console.log(data[0]);
            this.nu_of_brokenptps = data[0].brokenptp;
            this.nu_of_cc_demands = data[0].demandsduecc;
            this.nu_of_demandsdue = data[0].demandsdue;
            this.nu_of_alerts = this.nu_of_brokenptps + this.nu_of_cc_demands + this.nu_of_demandsdue;
            console.log(this.nu_of_alerts);
        }, error => {
            console.log(error);
        });
    }*/
    HeaderComponent.prototype.toggleUserBlock = function (event) {
        event.preventDefault();
        this.userblockService.toggleVisibility();
    };
    HeaderComponent.prototype.openNavSearch = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.setNavSearchVisible(true);
    };
    HeaderComponent.prototype.setNavSearchVisible = function (stat) {
        // console.log(stat);
        this.isNavSearchVisible = stat;
    };
    HeaderComponent.prototype.getNavSearchVisible = function () {
        return this.isNavSearchVisible;
    };
    HeaderComponent.prototype.toggleOffsidebar = function () {
        this.settings.toggleLayoutSetting('offsidebarOpen');
    };
    HeaderComponent.prototype.toggleCollapsedSideabar = function () {
        this.settings.toggleLayoutSetting('isCollapsed');
    };
    HeaderComponent.prototype.isCollapsedText = function () {
        return this.settings.getLayoutSetting('isCollapsedText');
    };
    HeaderComponent.prototype.toggleFullScreen = function (event) {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
    };
    HeaderComponent.prototype.logout = function () {
        var _this = this;
        swal({
            title: (this.user.username).toUpperCase() + ',' + '  are you sure?',
            imageUrl: "assets/img/user/coop.jpg",
            text: 'You want to logout!',
            showCancelButton: true,
            confirmButtonColor: '#7ac142',
            cancelButtonColor: '#00543d',
            confirmButtonText: 'Yes, Logout!'
        }).then(function (result) {
            if (result.value) {
                _this.ecolService.logout();
                _this.router.navigate(['/login']);
            }
        });
    };
    __decorate([
        ViewChild('fsbutton'),
        __metadata("design:type", Object)
    ], HeaderComponent.prototype, "fsbutton", void 0);
    HeaderComponent = __decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        }),
        __metadata("design:paramtypes", [MenuService,
            UserblockService,
            SettingsService,
            EcolService,
            Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map