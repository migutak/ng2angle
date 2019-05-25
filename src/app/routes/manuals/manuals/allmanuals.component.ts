import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
declare var $: any;
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../environments/environment';
import { EcolService } from '../../../services/ecol.service';

@Component({
    selector: 'app-allmanuals',
    templateUrl: './allmanuals.component.html',
    styleUrls: ['./allmanuals.component.scss']
})
export class AllManualsComponent implements OnInit {

    constructor(
        private ecolService: EcolService) {
        //
        };

    ngOnInit() { }

    open(manualpath, filename) {
        this.downloadDemand(environment.manuals_path + manualpath, filename);
    }

    downloadDemand(filepath, filename) {
        this.ecolService.downloadFile(filepath).subscribe(data => {
          saveAs(data, filename);
        }, error => {
          console.log(error);
          swal('Error!', ' Cannot download  file!', 'error');
        });
      }

}
