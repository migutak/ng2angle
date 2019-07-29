var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
var NavsearchComponent = /** @class */ (function () {
    function NavsearchComponent(elem) {
        this.elem = elem;
        this.onclose = new EventEmitter();
    }
    NavsearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        document.addEventListener('keyup', function (event) {
            if (event.keyCode === 27) { // ESC
                _this.closeNavSearch();
            }
        });
        document.addEventListener('click', function (event) {
            var contains = (_this.elem.nativeElement !== event.target && _this.elem.nativeElement.contains(event.target));
            if (!contains) {
                _this.closeNavSearch();
            }
        });
    };
    NavsearchComponent.prototype.closeNavSearch = function () {
        this.visible = false;
        this.onclose.emit();
    };
    NavsearchComponent.prototype.ngOnChanges = function (changes) {
        // console.log(changes['visible'].currentValue)
        if (changes['visible'].currentValue === true) {
            this.elem.nativeElement.querySelector('input').focus();
        }
    };
    NavsearchComponent.prototype.handleForm = function () {
        console.log('Form submit: ' + this.term);
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NavsearchComponent.prototype, "visible", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NavsearchComponent.prototype, "onclose", void 0);
    NavsearchComponent = __decorate([
        Component({
            selector: 'app-navsearch',
            templateUrl: './navsearch.component.html',
            styleUrls: ['./navsearch.component.scss']
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], NavsearchComponent);
    return NavsearchComponent;
}());
export { NavsearchComponent };
//# sourceMappingURL=navsearch.component.js.map