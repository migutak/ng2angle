
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { SettingsService } from '../../core/settings/settings.service';
import { ThemesService } from '../../core/themes/themes.service';
import { TranslatorService } from '../../core/translator/translator.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { EcolService } from '../../services/ecol.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-offsidebar',
    templateUrl: './offsidebar.component.html',
    styleUrls: ['./offsidebar.component.scss']
})
export class OffsidebarComponent implements OnInit, OnDestroy {

    currentTheme: any;
    selectedLanguage: string;

    constructor(
        public settings: SettingsService,
        public themes: ThemesService,
        public translator: TranslatorService,
        public ecolService: EcolService,
        public router: Router,
        public elem: ElementRef) {
        this.currentTheme = themes.getDefaultTheme();
        this.selectedLanguage = this.getLangs()[0].code;
    }

    ngOnInit() {
        this.anyClickClose();
    }

    setTheme() {
        this.themes.setTheme(this.currentTheme);
    }

    getLangs() {
        return this.translator.getAvailableLanguages();
    }

    setLang(value) {
        this.translator.useLanguage(value);
    }

    anyClickClose() {
        document.addEventListener('click', this.checkCloseOffsidebar.bind(this), false);
    }

    checkCloseOffsidebar(e) {
        const contains = (this.elem.nativeElement !== e.target && this.elem.nativeElement.contains(e.target));
        if (!contains) {
            this.settings.setLayoutSetting('offsidebarOpen', false);
        }
    }

    ngOnDestroy() {
        document.removeEventListener('click', this.checkCloseOffsidebar);
    }

    logout() {
        //
        swal({
            title: 'Are you sure?',
            text: 'You want to logout!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout!'
          }).then((result) => {
            if (result.value) {
                this.ecolService.logout();
                this.router.navigate(['/login']);
            }
          });
    }
}
