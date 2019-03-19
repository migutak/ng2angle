import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';

const URL = environment.valor;

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  accnumber: string;
  custnumber: string;
  
  model: any = {};
  demands: any;
  files: any = [];
  username: string;

  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService) {
    //
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('docdesc', this.model.docdesc);
      form.append('accnumber', this.accnumber);
      form.append('owner', this.username);
      form.append('custnumber', this.custnumber);
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // refresh demad history notes
      this.getfileshistory(this.custnumber);
    };
  }

  ngOnInit() {
    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.accnumber = queryParams.get('accnumber');
    });

    this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.custnumber = queryParams.get('custnumber');
    });

    // get files
    this.getfileshistory(this.custnumber);
  }

  getfileshistory(custnumber) {
    this.ecolService.getfileshistory(custnumber).subscribe(data => {
      this.files = data;
    });
  }

  downloadFile(filepath) {
    this.ecolService.downloadFile(filepath).subscribe(data => {
      saveAs(data, 'filename');
    }, error => {
      console.log(error.error);
      swal('Error!', ' Cannot download  file!', 'error');
    });
  }
}
