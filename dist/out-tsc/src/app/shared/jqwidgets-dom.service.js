var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
var JqxDomService = /** @class */ (function () {
    function JqxDomService(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    JqxDomService.prototype.loadComponent = function (component, ownerElement) {
        // 1. Create a component reference from the component
        var componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector, ownerElement);
        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);
        // 3. Get DOM element from component
        var domElement = componentRef.hostView
            .rootNodes[0];
        if (ownerElement) {
            ownerElement.appendChild(domElement);
        }
        this.componentRef = componentRef;
        return { componentRef: componentRef, domElement: domElement };
    };
    JqxDomService.prototype.destroy = function () {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
    };
    JqxDomService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ComponentFactoryResolver,
            ApplicationRef,
            Injector])
    ], JqxDomService);
    return JqxDomService;
}());
export { JqxDomService };
//# sourceMappingURL=jqwidgets-dom.service.js.map