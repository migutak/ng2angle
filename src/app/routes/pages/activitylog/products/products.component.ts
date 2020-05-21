import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  accnumber: string;
  custnumber: string;
  username: string;
  sys: string;
  data: any = {};
  account: any = [];
  checked: boolean = false;
  // Datepicker
  bsValue = new Date();
  maxDate = new Date();
  bsConfig = {
    isAnimated: true,
    adaptivePosition: true,
    dateInputFormat: 'YYYY-MM-DD'
     // containerClass: 'theme-angle'
  }

  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService) {
    //
  }

  currentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return day + '-' + month + '-' + year;
  }

  ngOnInit() {
    // check if logged!
    this.ecolService.ifLogged();
    this.ecolService.ifclosed();
    
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
    

    //
    this.getaccount(this.accnumber);
    this.getproducts(this.accnumber);
    
  }

  getproducts(accnumber) {
    this.ecolService.getproductofferings(accnumber).subscribe(resp => {
      if(resp){
        this.data.product = resp.product;
        this.data.oustbalance = resp.oustbalance,
        this.data.settlementamount = resp.settlementamount,
        this.data.dateofoffering = moment(resp.dateofoffering).format('YYYY-MM-DD'),
        this.data.expecteddate = moment(resp.expecteddate).format('YYYY-MM-DD')
      }
    });
  }

  getaccount(accnumber) {
    this.ecolService.getAccount(accnumber).subscribe(data => {
      this.data.custname = data[0].client_name;
      this.data.rrocode = data[0].rrocode;
      this.data.oustbalance = data[0].oustbalance;
    });
  }

  updatefunc(form) {
    // check if logged in
    this.ecolService.ifLogged();
    this.ecolService.loader();
    const body = {
      custnumber: this.custnumber,
      accnumber: this.accnumber,
      lastupdateby: this.username,
      custname: form.value.custname,
      oustbalance: form.value.oustbalance,
      rrocode: form.value.rrocode,
      product: form.value.product,
      settlementamount: form.value.settlementamount,
      dateofoffering: moment(form.value.dateofoffering).format('YYYY-MM-DD'),
      expecteddate: moment(form.value.expecteddate).format('YYYY-MM-DD')
    };
    this.ecolService.productofferings(body).subscribe(resp => {
      swal('Success!', 'Product updated', 'success');
    }, error => { 
      console.log(error);
      swal('Error!', 'Service currently not available', 'error');
    });
  }

}
