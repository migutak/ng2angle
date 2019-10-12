import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AgGridModule } from 'ag-grid-angular';
import'ag-grid-enterprise'; 
import { AppComponent } from './app.component';
import { UserIdleModule } from 'angular-user-idle';



import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';
// import { ViewallComponent } from './routes/work/viewall/viewall.component';

// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        // ViewallComponent,
    ],
    imports: [
        BrowserModule,
        UserIdleModule.forRoot({idle: 60, timeout: 30}),
        AgGridModule.withComponents([]),
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule, // required for ng2-tag-input ...
        CoreModule,
        LayoutModule,
        SharedModule.forRoot(),
        RoutesModule,
        SlimLoadingBarModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }

