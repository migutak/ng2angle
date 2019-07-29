var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';
import { AgmCoreModule } from '@agm/core';
import { NgxSelectModule } from 'ngx-select-ex';
import { SharedModule } from '../../shared/shared.module';
import { BugtrackerComponent } from './bugtracker/bugtracker.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CodeeditorComponent } from './codeeditor/codeeditor.component';
import { ContactdetailsComponent } from './contactdetails/contactdetails.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FaqComponent } from './faq/faq.component';
import { FilemanagerComponent } from './filemanager/filemanager.component';
import { FollowersComponent } from './followers/followers.component';
import { ForumComponent } from './forum/forum.component';
import { ForumdiscussionComponent } from './forum/forumdiscussion/forumdiscussion.component';
import { ForumtopicsComponent } from './forum/forumtopics/forumtopics.component';
import { HelpcenterComponent } from './helpcenter/helpcenter.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ComposeComponent } from './mailbox/compose/compose.component';
import { FolderComponent } from './mailbox/folder/folder.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { ViewComponent } from './mailbox/view/view.component';
import { PlansComponent } from './plans/plans.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsdetailsComponent } from './projectsdetails/projectsdetails.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { SocialboardComponent } from './socialboard/socialboard.component';
import { TeamviewerComponent } from './teamviewer/teamviewer.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TodolistComponent } from './todolist/todolist.component';
import { VotelinksComponent } from './votelinks/votelinks.component';
var routes = [
    { path: 'contacts', component: ContactsComponent },
    { path: 'contactdetails', component: ContactdetailsComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'projectsdetails', component: ProjectsdetailsComponent },
    { path: 'teamviewer', component: TeamviewerComponent },
    { path: 'socialboard', component: SocialboardComponent },
    { path: 'votelinks', component: VotelinksComponent },
    { path: 'bugtracker', component: BugtrackerComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'helpcenter', component: HelpcenterComponent },
    { path: 'followers', component: FollowersComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'plans', component: PlansComponent },
    { path: 'filemanager', component: FilemanagerComponent },
    {
        path: 'forum',
        children: [
            { path: '', component: ForumComponent },
            { path: 'topics/:catid', component: ForumtopicsComponent, outlet: 'primary' },
            { path: 'discussion/:topid', component: ForumdiscussionComponent, outlet: 'primary' }
        ]
    },
    {
        path: 'mailbox',
        component: MailboxComponent,
        children: [
            { path: '', redirectTo: 'folder/inbox' },
            { path: 'folder/:folder', component: FolderComponent },
            { path: 'view/:mid', component: ViewComponent },
            { path: 'compose', component: ComposeComponent }
        ]
    },
    { path: 'timeline', component: TimelineComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'invoice', component: InvoiceComponent },
    { path: 'search', component: SearchComponent },
    { path: 'todolist', component: TodolistComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'codeeditor', component: CodeeditorComponent }
];
var ExtrasModule = /** @class */ (function () {
    function ExtrasModule() {
    }
    ExtrasModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                RouterModule.forChild(routes),
                TreeModule.forRoot(),
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyBNs42Rt_CyxAqdbIBK0a5Ut83QiauESPA'
                }),
                NgxSelectModule
            ],
            declarations: [
                BugtrackerComponent,
                CalendarComponent,
                CodeeditorComponent,
                ContactdetailsComponent,
                ContactsComponent,
                FaqComponent,
                FilemanagerComponent,
                FollowersComponent,
                ForumComponent,
                ForumdiscussionComponent,
                ForumtopicsComponent,
                HelpcenterComponent,
                InvoiceComponent,
                ComposeComponent,
                FolderComponent,
                MailboxComponent,
                ViewComponent,
                PlansComponent,
                ProfileComponent,
                ProjectsComponent,
                ProjectsdetailsComponent,
                SearchComponent,
                SettingsComponent,
                SocialboardComponent,
                TeamviewerComponent,
                TimelineComponent,
                TodolistComponent,
                VotelinksComponent
            ],
            exports: [
                RouterModule
            ]
        })
    ], ExtrasModule);
    return ExtrasModule;
}());
export { ExtrasModule };
//# sourceMappingURL=extras.module.js.map