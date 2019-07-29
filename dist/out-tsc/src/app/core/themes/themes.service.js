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
var themeA = require('../../shared/styles/themes/theme-a.scss');
var themeB = require('../../shared/styles/themes/theme-b.scss');
var themeC = require('../../shared/styles/themes/theme-c.scss');
var themeD = require('../../shared/styles/themes/theme-d.scss');
var themeE = require('../../shared/styles/themes/theme-e.scss');
var themeF = require('../../shared/styles/themes/theme-f.scss');
var themeG = require('../../shared/styles/themes/theme-g.scss');
var themeH = require('../../shared/styles/themes/theme-h.scss');
var ThemesService = /** @class */ (function () {
    function ThemesService() {
        this.defaultTheme = 'A';
        this.myShows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        // this.show = this.myShows[Math.floor(Math.random() * this.myShows.length)];
        this.show = this.defaultTheme;
        this.createStyle();
        // this.setTheme(this.defaultTheme);
        this.setTheme(this.show);
    }
    ThemesService.prototype.createStyle = function () {
        var head = document.head || document.getElementsByTagName('head')[0];
        this.styleTag = document.createElement('style');
        this.styleTag.type = 'text/css';
        this.styleTag.id = 'appthemes';
        head.appendChild(this.styleTag);
    };
    ThemesService.prototype.setTheme = function (name) {
        switch (name) {
            case 'A':
                this.injectStylesheet(themeA);
                break;
            case 'B':
                this.injectStylesheet(themeB);
                break;
            case 'C':
                this.injectStylesheet(themeC);
                break;
            case 'D':
                this.injectStylesheet(themeD);
                break;
            case 'E':
                this.injectStylesheet(themeE);
                break;
            case 'F':
                this.injectStylesheet(themeF);
                break;
            case 'G':
                this.injectStylesheet(themeG);
                break;
            case 'H':
                this.injectStylesheet(themeH);
                break;
        }
    };
    ThemesService.prototype.injectStylesheet = function (css) {
        this.styleTag.innerHTML = css;
    };
    ThemesService.prototype.getDefaultTheme = function () {
        return this.defaultTheme;
    };
    ThemesService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], ThemesService);
    return ThemesService;
}());
export { ThemesService };
//# sourceMappingURL=themes.service.js.map