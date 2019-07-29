var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SettingsComponent } from './settings/settings.component';
import { AutomationComponent } from './automation/automation.component';
import { CustomerSuspensionsComponent } from './customersuspensions/customersuspensions.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { FilterPipe } from './filter.pipe';
import { AgGridModule } from 'ag-grid-angular';
import { CustomFormsModule } from 'ng2-validation';
var routes = [
    { path: '', redirectTo: 'dashboard' },
    { path: 'settings', component: SettingsComponent },
    { path: 'automation', component: AutomationComponent },
    { path: 'customersuspensions', component: CustomerSuspensionsComponent }
];
var LettersModule = /** @class */ (function () {
    function LettersModule() {
    }
    LettersModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                CommonModule,
                NgxSelectModule,
                NgxSpinnerModule,
                AgGridModule.withComponents([]),
                RouterModule.forChild(routes),
                CustomFormsModule
            ],
            declarations: [
                SettingsComponent,
                AutomationComponent,
                CustomerSuspensionsComponent,
                FilterPipe
            ],
            exports: [
                RouterModule
            ]
        })
    ], LettersModule);
    return LettersModule;
}());
export { LettersModule };
//# sourceMappingURL=letters.module.js.map