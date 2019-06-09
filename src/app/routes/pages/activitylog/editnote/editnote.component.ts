import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';

const URL = environment.valor;

@Component({
  selector: 'app-editnote',
  templateUrl: './editnote.component.html',
  styleUrls: ['./editnote.component.scss']
})
export class EditnoteComponent implements OnInit {

  custnumber: string;
  accnumber: string;
  username: string;
  model: any = {};
  note: any = [];
  noteid: string;
  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService) {
    //
  }

  ngOnInit() {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.accnumber = queryParams.get('accnumber');
      this.model.accnumber = queryParams.get('accnumber');
    });

    /*this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });*/

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.custnumber = queryParams.get('custnumber');
      this.model.custnumber = queryParams.get('custnumber');
    });

    this.noteid = this.route.snapshot.queryParamMap.get("noteid");
    this.route.queryParamMap.subscribe(queryParams => {
      this.noteid = queryParams.get('noteid');
      this.model.id = queryParams.get('noteid');
    });

    // get guarantors history
    this.getNote(this.accnumber);
  }

  onSubmit(form) {
   // check if logged in
   this.ecolService.ifLogged();
   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
   this.username = currentUser.username;

    // Loading indictor
    this.ecolService.loader();
    //
   const body = {
      id: this.model.id,
      owner: this.username,
      notemade: this.model.notemade,
      custnumber: this.model.custnumber,
      accnumber: this.model.accnumber,
      notesrc: this.note.notesrc,
      noteimp: this.note.noteimp,
      notedate: new Date()
    };
    this.ecolService.putnote(body).subscribe(data => {
      swal('Successful!', 'Note updated!', 'success');
      // back
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during processing!', 'error');
    });
  }

  getNote(id) {
    this.ecolService.getanote(id).subscribe(data => {
      this.note = data;
    }, error => {
      console.log(error);
    });
  }

}
