import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import { NgbActiveModal, NgbModal, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as moment from 'moment';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ptps',
  templateUrl: './ptps.component.html',
  styleUrls: ['./ptps.component.scss'],
  providers: [{ provide: NgbModal, useClass: NgbActiveModal }, DatePipe]
})
export class PtpsComponent implements OnInit {

  accnumber: string;
  custnumber: string;
  username: string;
  sys: string;
  ptps: any = [];
  ammendptp: any = {};
  iscard: Boolean = false;
  p = 1;
  currentDate: any = new Date();
  /*public minDate: NgbDateStruct;
  public maxDate: NgbDateStruct;


  year = parseInt(moment().format('YYYY'));
  maxyear = parseInt(moment().add(5, 'days').format('YYYY'));
  minyear = parseInt(moment().subtract(5, 'days').format('YYYY'));
  month = parseInt(moment().format('MM'));
  maxmonth = parseInt(moment().add(5, 'days').format('MM'));
  minmonth = parseInt(moment().subtract(5, 'days').format('MM'));
  day = parseInt(moment().format('DD'));
  maxday = parseInt(moment().add(5, 'days').format('DD'));
  minday = parseInt(moment().subtract(5, 'days').format('DD'));*/
  //

  minDate: Date;

    bsConfig = { 
        isAnimated: true,
        adaptivePosition: true,
        dateInputFormat: 'DD-MMM-YY' 
    }

  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService,
    public ngxSmartModalService: NgxSmartModalService,
    private datePipe: DatePipe) {
    // console.log('this.ammendptp.ptpdate', this.ammendptp.ptpdate)
    // this.minDate = { year: this.year, month: this.month, day: this.day };
    // this.maxDate = { year: this.maxyear, month: this.maxmonth, day: this.maxday };

  }

  ngOnInit() {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;


    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.accnumber = queryParams.get('accnumber');
    });

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.custnumber = queryParams.get('custnumber');
    });

    this.sys = this.route.snapshot.queryParamMap.get('sys');
    this.route.queryParamMap.subscribe(queryParams => {
      this.sys = queryParams.get('sys');
    });

    this.getptps();

  }

  getptps() {
    this.ecolService.getptps(this.accnumber).subscribe(data => {
      this.ptps = data;
      for (let i = 0; i < data.length; i++) {
        // if ((this.datePipe.transform(this.currentDate, 'dd-MMM-yy')).toUpperCase() <= (this.ptps[i].PTPDATE).toUpperCase()) {

        if (this.ptps[i].ammended === 'y') {
          this.ptps[i].showedit = false;
        } else if(moment().isAfter(this.ptps[i].ptpdate, 'day')) {
          this.ptps[i].showedit = false;
        } else {
          this.ptps[i].showedit = true;
        }
      }
    }, error => {
      console.log(error);
    });
  }

  openModal(id) {
    this.ammendptp.id = id;
    // get this ptp
    this.ecolService.getthisptp(id).subscribe(data => {

      this.ammendptp.ptpamount = data.ptpamount;
      this.ammendptp.ptpdate = data.ptpdate;
      this.ammendptp.accnumber = data.accnumber;
      this.ammendptp.owner = data.owner;

      // open modal
      this.ngxSmartModalService.getModal('myModal').open()

      // console.log('diff', moment().diff(this.ammendptp.ptpdate, 'days') + 5)
/*
      this.year = parseInt(moment(this.ammendptp.ptpdate).format('YYYY'));
      this.maxyear = parseInt(moment(this.ammendptp.ptpdate).add(5, 'days').format('YYYY'));
      this.minyear = parseInt(moment(this.ammendptp.ptpdate).subtract(5, 'days').format('YYYY'));
      this.month = parseInt(moment(this.ammendptp.ptpdate).format('MM'));
      this.maxmonth = parseInt(moment(this.ammendptp.ptpdate).add(5, 'days').format('MM'));
      this.minmonth = parseInt(moment(this.ammendptp.ptpdate).subtract(5, 'days').format('MM'));
      this.day = parseInt(moment(this.ammendptp.ptpdate).format('DD'));
      this.maxday = parseInt(moment(this.ammendptp.ptpdate).add(5, 'days').format('DD'));
      this.minday = parseInt(moment(this.ammendptp.ptpdate).subtract(5, 'days').format('DD'));

      this.maxDate = { year: this.maxyear, month: this.maxmonth, day: this.maxday };*/

      // min should not be less than today
      if (moment().diff(this.ammendptp.ptpdate, 'days') + 5 >= 0) {
        // console.log(true);
        /*this.year = parseInt(moment().format('YYYY'));
        this.month = parseInt(moment().format('MM'));
        this.day = parseInt(moment().format('DD'));
        this.minDate = { year: this.year, month: this.month, day: this.day };*/
      } else {
        //this.minDate = { year: this.minyear, month: this.minmonth, day: this.minday };
      }

    }, error => {
      console.log(error);
    });

  }

  ammendfunc(form) {
    //
    swal({
      title: 'ammend ptp',
      imageUrl: 'assets/img/user/coop.jpg',
      text: 'Sure to proceed?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes ammend!'
    }).then((result) => {
      if (result.value) {
        // update
        const yr: string = (form.value.ptpdate.year).toString();
        const mn: string = (form.value.ptpdate.month).toString();
        const day: string = (form.value.ptpdate.day).toString();

        const ptpdate = ((moment(yr + mn + day, "YYYYMMDD").format('DD-MMM-YYYY'))).toUpperCase();
        const ptpdate2 = ((moment(yr + mn + day, "YYYYMMDD").format('YYYY-MM-DD')));
        form.value.ptpdate = ptpdate
        const body: any = {
          id: this.ammendptp.id,
          ptpamount: form.value.ptpamount,
          ptpdate: ptpdate,
          ptpdate2: ptpdate2,
          ammendby: this.username,
          ammendcomment: form.value.comment
        }

        this.ecolService.ammendptp(body).subscribe(resp => {
          //
          swal('GOOD!', 'ALL Good! PTP Has Been Ammended', 'success');
          this.ngxSmartModalService.close('myModal');
        }, error => {
          console.log(error);
          swal('Error!', 'ptpammend :: service is currently not available', 'error');
          this.ngxSmartModalService.close('myModal');
        });

      } else {
        // reset
        return;
      }
    });


  }

}
