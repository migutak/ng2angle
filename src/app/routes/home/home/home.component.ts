import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private location: Location) { }

    ngOnInit() {
        // reload home page to refresh menus === kevin
        if (localStorage.getItem('profile') === '1') {
            window.location.reload();
        }
        //
        localStorage.setItem('profile', '0');
    }
}
