var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { OrdersComponent } from './orders/orders.component';
import { OrderviewComponent } from './orderview/orderview.component';
import { ProductsComponent } from './products/products.component';
import { ProductviewComponent } from './productview/productview.component';
import { CheckoutComponent } from './checkout/checkout.component';
var routes = [
    { path: 'orders', component: OrdersComponent },
    { path: 'orderview', component: OrderviewComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'productview', component: ProductviewComponent },
    { path: 'checkout', component: CheckoutComponent }
];
var EcommerceModule = /** @class */ (function () {
    function EcommerceModule() {
    }
    EcommerceModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                RouterModule.forChild(routes)
            ],
            declarations: [
                OrdersComponent,
                OrderviewComponent,
                ProductsComponent,
                ProductviewComponent,
                CheckoutComponent
            ],
            exports: [
                RouterModule
            ]
        })
    ], EcommerceModule);
    return EcommerceModule;
}());
export { EcommerceModule };
//# sourceMappingURL=ecommerce.module.js.map