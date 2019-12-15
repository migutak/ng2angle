/*!
 *
 * Angle - Bootstrap Admin Template
 *
 * Version: 4.2
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import './vendor.ts';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

const p = platformBrowserDynamic().bootstrapModule(AppModule);
// tslint:disable-next-line:no-unused-expression
p.then(() => { (<any>window).appBootstrap && (<any>window).appBootstrap(); });
// .catch(err => console.error(err));
