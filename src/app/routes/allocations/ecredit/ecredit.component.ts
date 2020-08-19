import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import swal from 'sweetalert2';
import { EcolService } from '../../../services/ecol.service';
import { ExportInvoiceService } from '../../../services/exportinvoices.service'

@Component({
  selector: 'app-ecredit',
  templateUrl: './ecredit.component.html',
  styleUrls: ['./ecredit.component.scss']
})
export class EcreditComponent implements OnInit {
  
  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
  }

}
