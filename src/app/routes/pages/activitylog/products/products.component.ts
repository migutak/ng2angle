import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../../../../environments/environment';
const uploadAPI = environment.filesapi;

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
  users: any = [];
  fileInfos: any = [];
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

  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });
  filename: string;
  filepath: string;

  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService) {
    //
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            
        };
        this.uploader.onErrorItem = (item: any, response: string, status: number, headers: any): any => {
            swal('Oooops!', 'unable to upload file!', 'error');
        };

        this.uploader.onSuccessItem = (item: any, response: any, status: number, headers: any): any => {
            //console.log('FileUpload:uploaded successfully:', item, status, response);
            swal('OK','Your file has been uploaded successfully','success');
            var obj = JSON.parse(response);
            if(obj.success) {
              for (let i = 0; i < obj.files.length; i++) {
                const bulk = {
                  'accnumber': this.accnumber,
                  'custnumber': this.custnumber,
                  'destpath': obj.files[i].path,
                  'filesize': obj.files[i].size,
                  'filetype': obj.files[i].mimetype,
                  'filepath': obj.files[i].path,
                  'filename': obj.files[i].originalname,
                  'doctype': obj.files[i].originalname,
                  'docdesc': 'Product approval',
                  'colofficer': this.username,
                };
                this.ecolService.uploads(bulk).subscribe(resp => {
                  this.getfileshistory(this.custnumber);
                  swal('Good!', 'File uploaded successfully!', 'success');
                }, error => {
                  swal('Oooops!', 'File uploaded but unable to add to files history!', 'warning');
                });
              }
            } else {
              swal('Oooops!', 'unable to upload file!', 'error');
            }
        }
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
    this.getusers();

    // get files
    this.getfileshistory(this.custnumber);
    
  }

  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  getfileshistory(custnumber) {
    this.ecolService.getfilesProducts(custnumber).subscribe(data => {
      this.fileInfos = data;
    });
  }

  getusers() {
    this.ecolService.getremedialusers().subscribe(data => {
      this.users = data;
    });
  }
  
  getproducts(accnumber) {
    this.ecolService.getproductofferings(accnumber).subscribe(resp => {
      if(resp){
        this.data.product = resp.product;
        this.data.oustbalance = resp.oustbalance,
        this.data.settlementamount = resp.settlementamount,
        this.data.productstatus = resp.productstatus,
        this.data.additionaldetails = resp.additionaldetails,
        this.data.dateofoffering = moment(resp.dateofoffering).format('YYYY-MM-DD'),
        this.data.expecteddate = moment(resp.expecteddate).format('YYYY-MM-DD'),
        this.data.settlementdate = moment(resp.settlementdate).format('YYYY-MM-DD'),
        this.data.collector = resp.collector,
        this.data.remedialunit = resp.remedialunit
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

  downloadFile(filepath, filename) {
    this.ecolService.downloadFile(filepath).subscribe(data => {
      saveAs(data, filename);
    }, error => {
      console.log(error.error);
      swal('Error!', ' Cannot download  file!', 'error');
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
      expecteddate: moment(form.value.expecteddate).format('YYYY-MM-DD'),
      additionaldetails: form.value.additionaldetails,
      productstatus: form.value.productstatus,
      settlementdate: moment(form.value.settlementdate).format('YYYY-MM-DD'),
      collector: form.value.collector,
      remedialunit: form.value.remedialunit
    };
    this.ecolService.productofferings(body).subscribe(resp => {
      swal('Success!', 'Product updated', 'success');
    }, error => { 
      console.log(error);
      swal('Error!', 'Service currently not available', 'error');
    });
  }

}
