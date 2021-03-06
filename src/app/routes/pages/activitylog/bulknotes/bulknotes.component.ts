import {Component, OnInit, ElementRef} from '@angular/core';
import {SettingsService} from '../../../../core/settings/settings.service';
import {ActivatedRoute} from '@angular/router';
import {EcolService} from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import {saveAs} from 'file-saver';
import {environment} from '../../../../../environments/environment';
import {FileUploader, FileItem, ParsedResponseHeaders} from 'ng2-file-upload';
import {HttpClient, HttpEventType} from '@angular/common/http';
import * as XLSX from 'xlsx';
import {ViewChild} from '@angular/core';
import {DataService} from '../../../../services/data.service';

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
  sys: string;
  willDownload = false;
  outdata = [];
  fileUploadProgress = 0;

  @ViewChild('myInput')
  myInputVariable: ElementRef;

  public uploader: FileUploader = new FileUploader({url: URL});
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
              public dataService: DataService,
              private ecolService: EcolService) {
    //
    //
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('owner', this.username);
      form.append('custnumber', this.custnumber);
      form.append('sys', this.sys);
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // console.log('ImageUpload:uploaded:', item, status, response);
    };
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);

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
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const data = JSON.parse(response); // success server response
    // console.log(data);
    const bulknotes = data.notes;
    const filename = data.files[0].originalname;
    if (data.success === true) {
      if (bulknotes.length < 5000) {
        swal({
          type: 'success',
          title: 'ALL Good',
          text: 'File: ' + filename + ' with ' + bulknotes.length + ' rows has been processed!',
        });
      } else {
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'File has too many rows. Max is 2,000 rows!',
        });
      }

    } else {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong with the file!',
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
      swal('Error!', ' Cannot download template  file!', 'error');
    });
  }







  // xls to json
  onFileChange(ev) {
    const xfile = ev.target.files[0];
    console.log('size', xfile.size);
    console.log('type', xfile.type);

    if (xfile.size > 900000) {
      swal({
        type: 'error',
        title: 'Empty Values',
        text: 'File too large. max is 900kb',
      });
      this.myInputVariable.nativeElement.value = '';
      document.getElementById('output').innerHTML = '';
      return;
    }

    if (xfile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      swal({
        type: 'error',
        title: 'Empty Values',
        text: 'Wrong file format',
      });
      this.myInputVariable.nativeElement.value = '';
      document.getElementById('output').innerHTML = '';
      return;
    }

    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, {type: 'binary'});
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      // console.log('data-total', jsonData.Sheet1.length);

      if (!jsonData.Sheet1) {
        swal({
          type: 'error',
          title: 'Empty Values',
          text: 'Wrong sheet name',
        });
        this.myInputVariable.nativeElement.value = '';
        document.getElementById('output').innerHTML = '';
        return;
      }
      this.outdata = jsonData.Sheet1;

      if (!this.outdata[0].accnumber || !this.outdata[0].notemade) {
        swal({
          type: 'error',
          title: 'Empty Values',
          text: 'Wrong field name',
        });
        this.myInputVariable.nativeElement.value = '';
        document.getElementById('output').innerHTML = '';
        return;
      }


      for (let i = 0; i < jsonData.Sheet1.length; i++) {
        // check for null
        // tslint:disable-next-line:max-line-length
        if (this.outdata[i].accnumber == null || this.outdata[i].notemade == null || typeof this.outdata[i].notemade === 'undefined' || typeof this.outdata[i].accnumber === 'undefined') {
          swal({
            type: 'warning',
            title: 'Empty Values',
            text: 'data in row no: ' + i + ' is empty and will be omitted',
          });

        } else if (this.sys === 'cc') {
          this.outdata[i].owner = this.username;
          this.outdata[i].custnumber = this.outdata[i].accnumber;
          this.outdata[i].notesrc = 'uploaded a note';
        } else {
          this.outdata[i].owner = this.username;
          this.outdata[i].custnumber = (this.outdata[i].accnumber).substring(5, 12);
          this.outdata[i].notesrc = 'uploaded a note';
        }
      }

      const dataString = JSON.stringify(jsonData);
      document.getElementById('output').innerHTML = dataString.slice(0, 500).concat('...');
      // this.setDownload(dataString);

      // post

      swal({
        title: 'Confirmation',
        imageUrl: 'assets/img/user/coop.jpg',
        text: 'Do you want to proceed with the upload of the ' + this.outdata.length + ' rows?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Upload'
      }).then((result) => {
        if (result.value) {
          // proceeed to post
          console.log(this.outdata);
          this.ecolService.loader();
          this.ecolService.bulknotes(this.outdata).subscribe(events => {
            if (events.type === HttpEventType.UploadProgress) {
              this.fileUploadProgress = Math.round(events.loaded / events.total * 100);
              console.log(events.loaded);
              //console.log(this.fileUploadProgress);
            } else if (events.type === HttpEventType.Response) {
              if (this.sys === 'cc' || this.sys === 'watchcc') {
                //
                this.ecolService.bulktotblcardsstatic(this.outdata).subscribe(result => {
                  console.log(result);
                  this.sendNotesData(this.custnumber); // updates the notes counter on view
                  swal({
                    type: 'success',
                    title: 'ALL Good',
                    text: events.body.rowsAffected + ' rows has been processed!',
                  });
                }, error => {
                  console.log('bulknotes error', error);
                });
              } else {
                //
                this.ecolService.bulktotblportfolio(this.outdata).subscribe(result => {
                  console.log(result);
                  this.sendNotesData(this.custnumber); // updates the notes counter on view
                  swal({
                    type: 'success',
                    title: 'ALL Good',
                    text: events.body.rowsAffected + ' rows has been processed!',
                  });
                }, error => {
                  console.log('bulknotes error', error);
                });
              }

            }

          }, error => {
            console.log(error);
            swal({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong with xlxs upload!',
            });
          });
        } else {
          this.myInputVariable.nativeElement.value = '';
          document.getElementById('output').innerHTML = '';
          return;
          swal.close();
        }
      });

    };
    reader.readAsBinaryString(file);

  }


  sendNotesData(custnumber) {
    this.ecolService.totalnotes(custnumber).subscribe(data => {
      this.dataService.pustNotesData(data[0].TOTAL);
    });
  }

}
