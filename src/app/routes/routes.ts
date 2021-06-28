import { LayoutComponent } from '../layout/layout.component';

import { LoginComponent } from './pages/login/login.component';
import { ExtloginComponent } from './pages/extletters/extlogin.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoverComponent } from './pages/recover/recover.component';
import { LockComponent } from './pages/lock/lock.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { Error404Component } from './pages/error404/error404.component';
import { SendLetterccComponent } from './pages/actionscc/sendlettercc.component';

import { SendLetterComponent } from './pages/actions/sendletter.component';
import { ActivityLogComponent } from './pages/activitylog/activitylog.component';
import { MultipleptpComponent } from './pages/multipleptp/multipleptp.component';
import { ActivityIpfComponent } from './pages/activityipf/activityipf.component';
import { ActivityIpfUpdateComponent } from './pages/activityipfupdate/activityipfupdate.component';
import { AuthGuard } from '../auth.guard';
import { ActivityActionComponent } from './pages/activitylog/activityaction/activityaction.component';
import { ActivityHomeComponent } from './pages/activitylog/activityhome/activityhome.component';
import { AccPlanComponent } from './pages/activitylog/accplan/accplan.component';
import { CustContactsComponent } from './pages/activitylog/custcontacts/custcontacts.component';
import { DemandLettersComponent } from './pages/activitylog/demandletters/demandletters.component';
import { SmsComponent } from './pages/activitylog/sms/sms.component';
import { NotesComponent } from './pages/activitylog/notes/notes.component';
import { FilesComponent } from './pages/activitylog/files/files.component';
import { GuarantorsComponent } from './pages/activitylog/guarantors/guarantors.component';
import { EditnoteComponent } from './pages/activitylog/editnote/editnote.component';
import { BulknotesComponent } from './pages/activitylog/bulknotes/bulknotes.component';
import { CollateralsComponent } from './pages/activitylog/collaterals/collaterals.component';
import { ActivitydashComponent } from './pages/activitydash/activitydash.component';
import { PtpsComponent } from './pages/activitylog/ptps/ptps.component';
import { WriteoffstoryComponent } from './pages/activitylog/writeoffstory/writeoffstory.component';
import { ProductsComponent } from './pages/activitylog/products/products.component';
import { RelegationapprovalComponent } from './pages/activitylog/relegation/approval.component';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'reminders', loadChildren: './schedule/schedule.module#ScheduleModule' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'guarantors', loadChildren: './guarantors/guarantors.module#GuarantorsModule' },
            { path: 'letters', loadChildren: './letters/letters.module#LettersModule' },
            { path: 'demand', loadChildren: './demand/demand.module#DemandModule' },
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'creditcards', loadChildren: './creditcards/creditcards.module#CreditcardsModule' },
            { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
            { path: 'work', loadChildren: './work/work.module#WorkModule' },
            { path: 'watch', loadChildren: './watch/watch.module#WatchModule' },

            { path: 'remedial', loadChildren: './remedial/remedial.module#RemedialModule' },
            { path: 'mcoopcash', loadChildren: './mcoopcash/mcoopcash.module#McoopcashModule' },
            { path: 'reports', loadChildren: './reports/reports.module#ReportsModule' },
            { path: 'manuals', loadChildren: './manuals/manuals.module#ManualsModule' },
            { path: 'debtcollectors', loadChildren: './debtcollectors/debtcollectors.module#DebtcollectorsModule' },
            { path: 'marketors', loadChildren: './marketors/marketors.module#MarketorsModule' },
            { path: 'auctioneers', loadChildren: './auctioneers/auctioneers.module#AuctioneersModule' },
            { path: 'repossessors', loadChildren: './repossessors/repossessors.module#RepossessorsModule' },
            { path: 'writeoffs', loadChildren: './writeoffs/writeoffs.module#WriteoffsModule' },
            { path: 'investigators', loadChildren: './investigators/investigators.module#InvestigatorsModule' },
            { path: 'valuers', loadChildren: './valuers/valuers.module#ValuersModule' },
            { path: 'invoices', loadChildren: './invoices/invoices.module#InvoicesModule' },
            { path: 'spportal', loadChildren: './spportal/spportal.module#SpPortalModule' },
            { path: 'configurations', loadChildren: './configurations/configurations.module#ConfigurationsModule' },
            { path: 'assetfinance', loadChildren: './assetfinance/assetfinance.module#AssetfinanceModule' },
            { path: 'teamleader', loadChildren: './teamleader/teamleader.module#TeamLeaderModule' },
            { path: 'admin-relegations', loadChildren: './admin-relegations/admin-relegations.module#AdminrelegationsModule' },
            { path: 'allocations', loadChildren: './allocations/allocations.module#AllocationsModule' },
        ],
        canActivate: [AuthGuard]
    },

    // Not lazy-loaded routes
    { path: 'login', component: LoginComponent },
    { path: 'extletters', component: ExtloginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'lock', component: LockComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: '404', component: Error404Component },
    { path: 'activitydash', component: ActivitydashComponent },
    { path: 'sendlettercc', component: SendLetterccComponent },
    { path: 'sendletter', component: SendLetterComponent },
    { path: 'multipleptp', component: MultipleptpComponent },
    {
        path: 'activitylog',
        component: ActivityLogComponent,
        children: [
            { path: '', redirectTo: 'notes', pathMatch: 'full' },
            { path: 'activityhome', component: ActivityHomeComponent },
            { path: 'activityaction', component: ActivityActionComponent },
            { path: 'notes', component: NotesComponent },
            { path: 'files', component: FilesComponent },
            { path: 'sms', component: SmsComponent },
            { path: 'accplan', component: AccPlanComponent },
            { path: 'contacts', component: CustContactsComponent },
            { path: 'demandletters', component: DemandLettersComponent },
            { path: 'remedialcollaterals', component: CollateralsComponent },
            { path: 'bulknotes', component: BulknotesComponent },
            { path: 'guarantors', component: GuarantorsComponent },
            { path: 'editnote', component: EditnoteComponent },
            { path: 'ptps', component: PtpsComponent },
            { path: 'writeoffstory', component: WriteoffstoryComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'relegationapproval', component: RelegationapprovalComponent },
            { path: '**', redirectTo: 'notes' }
        ],
        canActivate: [AuthGuard]

    },
    {
        path: 'cancelipf',
        component: ActivityIpfComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cancelipfupdate',
        component: ActivityIpfUpdateComponent,
        canActivate: [AuthGuard]
    },
    // Not found
    { path: '', redirectTo: 'extlettersx', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }

];
