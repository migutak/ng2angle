import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';

const URL = environment.valor;

@Component({
  selector: 'app-collaterals',
  templateUrl: './collaterals.component.html',
  styleUrls: ['./collaterals.component.scss']
})
export class CollateralsComponent implements OnInit {

  custnumber: string;
  accnumber: string;
  username: string;
  model: any = {};
  collaterals: any = [];
  edit = false;
  //
  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService) {
    //
  }

  ngOnInit() {
    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.accnumber = queryParams.get('accnumber');
      this.model.accnumber = queryParams.get('accnumber');
    });

    this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.custnumber = queryParams.get('custnumber');
      this.model.custnumber = queryParams.get('custnumber');
    });

    // get guarantors history
    this.getCollateral(this.custnumber);
  }

  onSubmit(form) {
    // Loading indictor
    this.ecolService.loader();
    //
   const body = {
      regowner: form.value.regowner,
      collateralname: form.value.collateralname,
      accnumber: this.model.accnumber,
      custnumber: this.model.custnumber,
      colofficer: this.username,
      forcedsale: form.value.forcedsale,
      insurancevalue: form.value.insurancevalue,
      marketvalue: form.value.marketvalue,
      tenure: form.value.tenure,
      valuationdate: form.value.valuationdate,
      valuer: form.value.valuer
    };
    this.ecolService.submitCollateral(body).subscribe(data => {
      swal('Successful!', 'saved successfully!', 'success');
      this.getCollateral(this.accnumber);
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during processing!', 'error');
    });
  }

  getCollateral(custnumber) {
    this.ecolService.retrieveCollateral(custnumber).subscribe(data => {
      this.collaterals = data;
    }, error => {
      console.log(error);
    });
  }

  reset() {
    this.model.regowner = '';
    this.model.collateralname = '';
    this.model.forcedsale = '';
    this.model.insurancevalue = '';
    this.model.marketvalue = '';
    this.model.tenure = '';
    this.model.valuationdate = '';
    this.model.valuer = '';
  }

  cancel() {
    this.edit = false;
    this.reset();
  }

  updatecollateral(form) {
    // save to db
    this.ecolService.updateCollateral(this.model.id, form).subscribe(response => {
      swal(
        'Good!',
        'Collateral updated!',
        'success'
      );
      this.getCollateral(this.custnumber);
    }, error => {
      console.log(error);
      swal(
        'Ooops!',
        'Contact Not updated!',
        'error'
      );
    });
  }

  editcollateral(collateral) {
    this.model.id = collateral.id;
    this.model.regowner = collateral.regowner;
    this.model.collateralname = collateral.collateralname;
    this.model.accnumber = collateral.accnumber;
    this.model.custnumber = collateral.custnumber;
    this.model.forcedsale = collateral.forcedsale;
    this.model.insurancevalue = collateral.insurancevalue;
    this.model.marketvalue = collateral.marketvalue;
    this.model.tenure = collateral.tenure;
    this.model.valuationdate = collateral.valuationdate;
    this.model.valuer = collateral.valuer;
    //
    this.edit = true;
  }

}

