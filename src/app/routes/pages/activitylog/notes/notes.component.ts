import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import { isNullOrUndefined } from 'util';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  providers: [DatePipe]
})
export class NotesComponent implements OnInit {

  noteData: any = [];
  notes: any = [];
  username: string;
  pager = {
    limit: 5, // default number of notes
    current: 0, // current page
    reachedend: false
  };
  cust: string;
  query = {
    limit: this.pager.limit,
    skip: this.pager.limit * this.pager.current
  };

  currentDate: any = new Date();
  constructor(
    private ecolservice: EcolService,
    private route: ActivatedRoute,
    private rout: Router,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    private ecolService: EcolService,
  ) {
  }

  ngOnInit() {
    //Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => console.log('Time is up!'));

    // check if logged in
    this.ecolService.ifLogged();
    this.ecolService.ifClosed();
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.username = currentUser.username;

    this.route.queryParams.subscribe(params => {
      this.cust = params['custnumber'];
    });
    // this.data.currentMessage.subscribe(message => this.message = message)
    this.getAll(this.cust);
  }

  getAll(cust) {
    this.query.limit = this.pager.limit;
    this.query.skip = this.pager.limit * this.pager.current;

    // const filter = encodeURI(JSON.stringify(this.query));
    // console.log('this.query ', this.query);
    this.ecolservice.getallnotes(this.query, cust).subscribe(data => {
      this.notes = data;
      for (let i = 0; i < data.length; i ++) {
        // tslint:disable-next-line:max-line-length
        if (this.notes[i].OWNER === this.username && (this.datePipe.transform(this.currentDate, 'dd-MMM-yy')).toUpperCase() === ((this.notes[i].NOTEDATE).substring(0, 9) ).toUpperCase()) {
          this.notes[i].showedit = true;
        } else {
          this.notes[i].showedit = false;
        }
      }
      // append posts
      if (!isNullOrUndefined(data) && this.notes.length) {
        this.noteData = this.noteData.concat(data);
      } else {
        this.pager.reachedend = true;
      }
    }, err => {
      console.log(err);
    });
  }

  loadmore(event) {
    this.spinner.show();
    // increase the current by 1
    // if current = 0, skip = limit*current
    event.preventDefault();
    this.pager.current = this.pager.current + 1;
    this.getAll(this.cust);

    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  editnote(note) {
    // tslint:disable-next-line:max-line-length
    this.rout.navigateByUrl('/activitylog/editnote?id=' + note.ID + '&accnumber=' + note.ACCNUMBER + '&custnumber=' + note.CUSTNUMBER + '&username=' + note.OWNER + '&sys=watch').then(e => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
    });
  }

}

