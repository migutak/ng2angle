import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  noteData: any = [];
  notes: any = [];
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

  constructor(private ecolservice: EcolService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.cust = params['custnumber'];
    });
    // this.cust = localStorage.getItem('mycustnumber');
    this.getAll(this.cust);
    console.log('this customer', this.cust);
    // console.log('global custnumber _from_ activity ===', custnumber);
  }

  getAll(cust) {
    this.query.limit = this.pager.limit;
    this.query.skip = this.pager.limit * this.pager.current;

    // const filter = encodeURI(JSON.stringify(this.query));
    // console.log('this.query ', this.query);
    this.ecolservice.getallnotes(this.query, cust).subscribe(data => {
      this.notes = data;

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
    // increase the current by 1
    // if current = 0, skip = limit*current
    event.preventDefault();
    this.pager.current = this.pager.current + 1;
    this.getAll(this.cust);
  }
  
}

