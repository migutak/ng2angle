import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../../environments/environment';
import { FileUploader, FileItem , ParsedResponseHeaders} from 'ng2-file-upload';

const URL = environment.xlsuploadapi;

@Component({
  selector: 'app-bulknotes',
  templateUrl: './bulknotes.component.html',
  styleUrls: ['./bulknotes.component.scss']
})
export class BulknotesComponent implements OnInit {

  custnumber;
  accnumber;
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
    //
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('owner', this.username);
      form.append('custnumber', this.custnumber);
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // console.log('ImageUpload:uploaded:', item, status, response);
    };
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);

  }

  ngOnInit() {
    // check if logged in
    this.ecolService.ifLogged().subscribe(resp => {
      this.username = resp;
    });
    
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

    // get account details
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const data = JSON.parse(response); // success server response
    // console.log(data)
    if (data.success === false) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    } else {
      this.ecolService.postnotes(data.notes).subscribe(resp => {
        swal({
          type: 'success',
          title: 'All Good!',
          text: 'Excel bulk notes upload is a success',
        });
      }, error => {
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });

    }
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const error = JSON.parse(response); // error server response
    console.log('error', error);
    swal({
      type: 'error',
      title: 'Oops...',
      text: 'Something went wrong with xlxs upload!',
    });
  }

  downloadFile() {
    const template = environment.xlstemplate;
    this.ecolService.downloadFile(template).subscribe(data => {
      saveAs(data, 'ECollect_bulk_notes_upload_template.xlsx');
    }, error => {
      console.log(error);
      swal('Error!', ' Cannot upload template  file!', 'error');
    });
  }

}
