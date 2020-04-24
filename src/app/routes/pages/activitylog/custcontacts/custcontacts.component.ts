import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-custcontacts',
  templateUrl: './custcontacts.component.html',
  styleUrls: ['./custcontacts.component.scss']
})
export class CustContactsComponent implements OnInit {

  accnumber: string;
  custnumber: string;
  contacts: [];
  model: any = {};
  addcontact: any = {};
  username: string;
  edit = false;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService,
    private spinner: NgxSpinnerService,
    public dataService: DataService) {
    //
  }

  ngOnInit() {
    /** spinner starts on init */
    // this.spinner.show();

    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.accnumber = queryParams.get('accnumber');
    });

    /*this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });*/

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.custnumber = queryParams.get('custnumber');
    });

    // get contacts
    this.getcontacts(this.custnumber);
  }

  savecontact(form) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.addcontact.custnumber = this.custnumber;
    this.addcontact.telephone = form.contactnumber;
    this.addcontact.contact = form.contactnumber;
    this.addcontact.email = form.email;
    this.addcontact.active = form.active;
    this.addcontact.owner = this.username;
    this.addcontact.updatedby = this.username;
    this.addcontact.updatedlast = new Date();
    this.addcontact.contacttype = form.contacttype;
    this.addcontact.description = form.description;
    this.addcontact.address = form.address;
    // save to db
    this.ecolService.postteles(this.addcontact).subscribe(response => {
      swal(
        'Good!',
        'Contact saved!',
        'success'
      );
      this.getcontacts(this.custnumber);
      this.dataService.pushTeles(0);
    }, error => {
      console.log(error);
      swal({
        title: 'Ooops!',
        text: 'Contact Not saved!',
        type: 'error',
        footer: '<a href="http://helpdesk.co-opbank.co.ke" target="_blank">Report issue to helpdesk?</a>'
      });
    });
  }

  editcontact(contact) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    this.model.id = contact.id;
    this.model.custnumber = contact.custnumber;
    this.model.contactnumber = contact.telephone;
    this.model.email = contact.email;
    this.model.active = contact.active;
    this.model.owner = this.username;
    this.model.description = contact.description;
    this.model.address = contact.address;
    this.model.contacttype = contact.contacttype;
    this.model.updatedby = this.username;
    this.model.updatedlast = new Date();
    //
    this.edit = true;
  }

  updatecontact(form) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    this.model.id = form.id;
    this.model.custnumber = this.custnumber;
    this.model.telephone = form.contactnumber;
    this.model.email = form.email;
    this.model.active = form.active;
    this.model.owner = this.username;
    this.model.updatedby = this.username;
    this.model.updatedlast = new Date();
    this.addcontact.contacttype = form.contacttype;
    this.addcontact.description = form.description;
    this.addcontact.address = form.address;
    // save to db
    this.ecolService.putteles(this.model).subscribe(response => {
      swal(
        'Good!',
        'Contact updated!',
        'success'
      );
      this.getcontacts(this.custnumber);
    }, error => {
      console.log(error);
      swal(
        'Ooops!',
        'Contact Not updated!',
        'error'
      );
    });
  }

  getcontacts(custnumber) {
    this.spinner.show();
    this.ecolService.getteles(custnumber).subscribe(data => {
      this.contacts = data;
      this.dataService.pushContacts(data.length);
      this.dataService.pushTeles(0);
      this.spinner.hide();
    }, error => {
      console.log(error);
      this.spinner.hide();
    });
  }

  cancel() {
    this.edit = false;
    this.model = {};
  }

}
