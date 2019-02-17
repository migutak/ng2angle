import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: any;
    userdata: any = {};
    userperm: any;

    constructor(public userblockService: UserblockService) {

        this.userdata = JSON.parse(localStorage.getItem('currentUser'));
        this.userperm = JSON.parse(localStorage.getItem('userpermission'));

        this.user = {
            picture: 'assets/img/user/coop.jpg',
            username: this.userdata.username,
            division: this.userdata.team,
            role: this.userdata.role
        };
    }

    ngOnInit() {

    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

}
