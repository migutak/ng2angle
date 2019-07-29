var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';
import { DataService } from '../../services/data.service';
import { CustomFormsModule } from 'ng2-validation';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { LockComponent } from './lock/lock.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { Error404Component } from './error404/error404.component';
import { SendLetterccComponent } from './actionscc/sendlettercc.component';
import { SendLetterComponent } from './actions/sendletter.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ActivityLogComponent } from './activitylog/activitylog.component';
import { ActivityActionComponent } from '../pages/activitylog/activityaction/activityaction.component';
import { ActivityHomeComponent } from '../pages/activitylog/activityhome/activityhome.component';
import { AccPlanComponent } from '../pages/activitylog/accplan/accplan.component';
import { CustContactsComponent } from '../pages/activitylog/custcontacts/custcontacts.component';
import { DemandLettersComponent } from '../pages/activitylog/demandletters/demandletters.component';
import { SmsComponent } from '../pages/activitylog/sms/sms.component';
import { NotesComponent } from '../pages/activitylog/notes/notes.component';
import { FilesComponent } from '../pages/activitylog/files/files.component';
import { GuarantorsComponent } from '../pages/activitylog/guarantors/guarantors.component';
import { BulknotesComponent } from '../pages/activitylog/bulknotes/bulknotes.component';
import { CollateralsComponent } from '../pages/activitylog/collaterals/collaterals.component';
import { ActivitydashComponent } from '../pages/activitydash/activitydash.component';
import { EditnoteComponent } from '../pages/activitylog/editnote/editnote.component';
import { PtpsComponent } from './activitylog/ptps/ptps.component';
/* Use this routes definition in case you want to make them lazy-loaded */
/*const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'lock', component: LockComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },
];*/
var PagesModule = /** @class */ (function () {
    function PagesModule() {
    }
    PagesModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                FileUploadModule,
                NgbModule,
                NgxSpinnerModule,
                NgxSelectModule,
                FormsModule,
                NgSelectModule,
                ToasterModule.forRoot(),
                CustomFormsModule,
                BsDatepickerModule.forRoot()
                // RouterModule.forChild(routes)
            ],
            declarations: [
                LoginComponent,
                RegisterComponent,
                RecoverComponent,
                LockComponent,
                MaintenanceComponent,
                Error404Component,
                SendLetterccComponent,
                SendLetterComponent,
                ActivityLogComponent,
                ActivityActionComponent,
                ActivityHomeComponent,
                AccPlanComponent,
                CustContactsComponent,
                DemandLettersComponent,
                SmsComponent,
                NotesComponent,
                FilesComponent,
                GuarantorsComponent,
                BulknotesComponent,
                CollateralsComponent,
                ActivitydashComponent,
                EditnoteComponent,
                PtpsComponent
            ],
            providers: [
                ToasterService,
                DataService
            ],
            exports: [
                RouterModule,
                LoginComponent,
                RegisterComponent,
                RecoverComponent,
                LockComponent,
                MaintenanceComponent,
                Error404Component,
                SendLetterccComponent,
                SendLetterComponent,
                AccPlanComponent,
                CustContactsComponent,
                DemandLettersComponent,
                SmsComponent,
                NotesComponent,
                FilesComponent,
                GuarantorsComponent,
                BulknotesComponent,
                CollateralsComponent,
                ActivitydashComponent,
                EditnoteComponent,
                PtpsComponent
            ]
        })
    ], PagesModule);
    return PagesModule;
}());
export { PagesModule };
//# sourceMappingURL=pages.module.js.map