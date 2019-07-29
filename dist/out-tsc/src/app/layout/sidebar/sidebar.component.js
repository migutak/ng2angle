var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../core/menu/menu.service';
import { SettingsService } from '../../core/settings/settings.service';
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(menu, settings, injector) {
        // this.menuItems = menu.getMenu();
        this.menu = menu;
        this.settings = settings;
        this.injector = injector;
        this.sbclickEvent = 'click.sidebar-toggle';
        this.$doc = null;
        this.userperm = [];
    }
    SidebarComponent.prototype.ngOnInit = function () {
        // user permissions
        // this.userperm = JSON.parse(localStorage.getItem('userpermission'));
        // console.log('menu-user-attr', this.userperm[0].attr);
        var _this = this;
        this.router = this.injector.get(Router);
        this.router.events.subscribe(function (val) {
            // close any submenu opened when route changes
            _this.removeFloatingNav();
            // scroll view to top
            window.scrollTo(0, 0);
            // close sidebar on route change
            _this.settings.setLayoutSetting('asideToggled', false);
        });
        this.menuItems = this.menu.getMenu();
        // enable sidebar autoclose from extenal clicks
        this.anyClickClose();
    };
    SidebarComponent.prototype.anyClickClose = function () {
        var _this = this;
        this.$doc = $(document).on(this.sbclickEvent, function (e) {
            if (!$(e.target).parents('.aside-container').length) {
                _this.settings.setLayoutSetting('asideToggled', false);
            }
        });
    };
    SidebarComponent.prototype.ngOnDestroy = function () {
        if (this.$doc) {
            this.$doc.off(this.sbclickEvent);
        }
    };
    SidebarComponent.prototype.toggleSubmenuClick = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this.isSidebarCollapsed() && !this.isSidebarCollapsedText() && !this.isEnabledHover()) {
            var ul_1 = $(event.currentTarget.nextElementSibling);
            // hide other submenus
            var parentNav_1 = ul_1.parents('.sidebar-subnav');
            $('.sidebar-subnav').each(function (idx, el) {
                var $el = $(el);
                // if element is not a parent or self ul
                if (el !== parentNav_1[0] && el !== ul_1[0]) {
                    _this.closeMenu($el);
                }
            });
            // abort if not UL to process
            if (!ul_1.length) {
                return;
            }
            // any child menu should start closed
            ul_1.find('.sidebar-subnav').each(function (idx, el) {
                _this.closeMenu($(el));
            });
            // toggle UL height
            var ulHeight = ul_1.css('height');
            if (ulHeight === 'auto' || parseInt(ulHeight, 10)) {
                this.closeMenu(ul_1);
            }
            else {
                // expand menu
                ul_1.on('transitionend', function () {
                    ul_1.css('height', 'auto').off('transitionend');
                }).css('height', ul_1[0].scrollHeight);
                // add class to manage animation
                ul_1.addClass('opening');
            }
        }
    };
    // Close menu collapsing height
    SidebarComponent.prototype.closeMenu = function (elem) {
        elem.css('height', elem[0].scrollHeight); // set height
        elem.css('height', 0); // and move to zero to collapse
        elem.removeClass('opening');
    };
    SidebarComponent.prototype.toggleSubmenuHover = function (event) {
        var self = this;
        if (this.isSidebarCollapsed() || this.isSidebarCollapsedText() || this.isEnabledHover()) {
            event.preventDefault();
            this.removeFloatingNav();
            var ul = $(event.currentTarget.nextElementSibling);
            var anchor = $(event.currentTarget);
            if (!ul.length) {
                return; // if not submenu return
            }
            var $aside = $('.aside-container');
            var $asideInner = $aside.children('.aside-inner'); // for top offset calculation
            var $sidebar = $asideInner.children('.sidebar');
            var mar = parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0);
            var itemTop = ((anchor.parent().position().top) + mar) - $sidebar.scrollTop();
            var floatingNav_1 = ul.clone().appendTo($aside);
            var vwHeight = document.body.clientHeight;
            // let itemTop = anchor.position().top || anchor.offset().top;
            floatingNav_1
                .addClass('nav-floating');
            // each item has ~40px height
            // multiply to force space for at least N items
            var safeOffsetValue = (40 * 5);
            var navHeight = floatingNav_1.height() + 2; // 2px border
            var safeOffset = navHeight < safeOffsetValue ? navHeight : safeOffsetValue;
            var displacement = 25;
            // if not enough space to show N items, use then calculated 'safeOffset'
            var menuTop = (vwHeight - itemTop > safeOffset) ? itemTop : (vwHeight - safeOffset - displacement);
            floatingNav_1
                .removeClass('opening') // necesary for demo if switched between normal//collapsed mode
                // .addClass('nav-floating')
                .css({
                position: this.settings.getLayoutSetting('isFixed') ? 'fixed' : 'absolute',
                top: menuTop,
                bottom: (floatingNav_1.outerHeight(true) + menuTop > vwHeight) ? (displacement + 'px') : 'auto'
            });
            floatingNav_1
                .on('mouseleave', function () { floatingNav_1.remove(); })
                .find('a').on('click', function (e) {
                e.preventDefault(); // prevents page reload on click
                // get the exact route path to navigate
                var routeTo = $(this).attr('route');
                if (routeTo) {
                    self.router.navigate([routeTo]);
                }
            });
            this.listenForExternalClicks();
        }
    };
    SidebarComponent.prototype.listenForExternalClicks = function () {
        var _this = this;
        var $doc = $(document).on('click.sidebar', function (e) {
            if (!$(e.target).parents('.aside-container').length) {
                _this.removeFloatingNav();
                $doc.off('click.sidebar');
            }
        });
    };
    SidebarComponent.prototype.removeFloatingNav = function () {
        $('.nav-floating').remove();
    };
    SidebarComponent.prototype.isSidebarCollapsed = function () {
        return this.settings.getLayoutSetting('isCollapsed');
    };
    SidebarComponent.prototype.isSidebarCollapsedText = function () {
        return this.settings.getLayoutSetting('isCollapsedText');
    };
    SidebarComponent.prototype.isEnabledHover = function () {
        return this.settings.getLayoutSetting('asideHover');
    };
    SidebarComponent = __decorate([
        Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.scss']
        }),
        __metadata("design:paramtypes", [MenuService, SettingsService, Injector])
    ], SidebarComponent);
    return SidebarComponent;
}());
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map