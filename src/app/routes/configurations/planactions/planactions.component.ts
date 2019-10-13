import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-planactions',
  templateUrl: './planactions.component.html',
  styleUrls: ['./planactions.component.scss']
})
export class PlanactionsComponent implements OnInit {

    model: any = {};
    username: string;
    planactions: any = [];
    edit = false;

  constructor(
    private ecolService: EcolService,
    ) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
    this.getplanactions();
    this.getid();
  }


  getid() {
    const possible = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lengthOfCode = 7;
    this.model.actioncode = this.makeRandom(lengthOfCode, possible);
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

  getplanactions() {
    this.ecolService.s_actions().subscribe(response => {
     this.planactions = response;
    }, error => {
      console.log(error);
    });
  }

  saveplanaction(form) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.model.actionid = form.actioncode;
    this.model.actiontitle = form.actiontitle;
    this.model.updateby = this.username;
    // save to db
    this.ecolService.post_s_actions(this.model).subscribe(response => {
      swal(
        'Good!',
        'Action saved!',
        'success'
      );
      this.getplanactions();
      this.model = {};
      this.getid();
    }, error => {
      console.log(error);
      swal({
        title: 'Ooops!',
        text: 'Plan action Not saved!',
        type: 'error',
        footer: '<a href="http://helpdesk.co-opbank.co.ke" target="_blank">Report issue to helpdesk?</a>'
      });
    });
  }

  editaction(form) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.model.actioncode = form.actionid;
    this.model.actiontitle = form.actiontitle;
    //
    this.edit = true;
  }

  updateaction(form) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.model.actionid = form.actioncode;
    this.model.actiontitle = form.actiontitle;
    this.model.updateby = this.username;
    // save to db
    this.ecolService.put_s_actions(this.model).subscribe(response => {
      swal(
        'Good!',
        'Plan action updated!',
        'success'
      );
      this.getplanactions();
    }, error => {
      console.log(error);
      swal(
        'Ooops!',
        'Plan action Not updated!',
        'error'
      );
    });
  }

  cancel() {
    this.edit = false;
    this.model = {};
    this.getid();
  }

  delete() {
    swal({
      title: 'Are you sure?',
      text: 'You want to DELETE!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.value) {
        //
      }
    });
  }
}
