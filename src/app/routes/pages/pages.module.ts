import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

@NgModule({
    imports: [
        SharedModule,
        FileUploadModule,
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
        FilesComponent
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
        FilesComponent
    ]
})
export class PagesModule { }
