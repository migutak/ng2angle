var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BranchesComponent } from './branches/branches.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { RolesComponent } from './roles/roles.component';
import { ApprovalsComponent } from './approvals/approvals.component';
var routes = [
    { path: '', redirectTo: 'dashboard' },
    { path: 'search', component: SearchComponent },
    { path: 'roles', component: RolesComponent },
    { path: 'approvals', component: ApprovalsComponent },
    { path: 'branches', component: BranchesComponent }
];
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                RouterModule.forChild(routes)
            ],
            declarations: [
                SearchComponent,
                RolesComponent,
                ApprovalsComponent,
                BranchesComponent
            ],
            exports: [
                RouterModule
            ]
        })
    ], UsersModule);
    return UsersModule;
}());
export { UsersModule };
//# sourceMappingURL=users.module.js.map