import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import swal from 'sweetalert2';
import { EcolService } from '../../../services/ecol.service';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from '@ag-grid-community/all-modules';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-colofficer',
  templateUrl: './colofficers.component.html',
  styleUrls: ['./colofficers.component.scss']
})
export class ColofficerComponent implements OnInit {

  resizeEvent = 'resize.ag-grid';
  $win = $(window);

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  username: string;
  data: any = {};
  model: any = {};
  modalOptions: NgbModalOptions;
  deptcodes: any = [];
  template: string;
  gridOptions: GridOptions;
  modules = AllModules;

  columnDefs = [
    {
      headerName: 'memogroup',
      field: 'memogroup',
      width: 150
    }, {
      headerName: 'colofficer',
      field: 'colofficer'
    }];
  rowData1: any;
  new = true;

  constructor(
    private http: HttpClient,
    private ecolService: EcolService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
  ) {

  // Basic example
  this.gridOptions = <GridOptions>{
    headerHeight: 40,
    columnDefs: this.columnDefs,
    rowData: null,
    enableFilter: true,
    rowSelection: 'single'
  };

  this.getData();
  }

  term: string;
  users: any = [];
  arocodeData: any = [];

  onRowClicked(event: any) {
    this.new = false;
    this.model = event.node.data;
    this.model.lastupdateby = this.username;
    this.model.lastupdate = new Date();
    // this.model.active = (event.node.data.active).toLowerCase() === 'true' ? true : false;
  }

  onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.getusers();
    this.getarocodes();

  }

  gridReady(params) {
    params.api.sizeColumnsToFit();
    this.$win.on(this.resizeEvent, () => {
      setTimeout(() => { params.api.sizeColumnsToFit(); });
    });
  }

  shownew() {
    this.new = true;
    this.model = {};
  }

  updateBranch(branch) {
    swal({
      title: 'Confirm',
      imageUrl: 'assets/img/user/coop.jpg',
      text: 'Confirm update',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update!'
    }).then((result) => {
      if (result.value) {
        this.http.patch(
          environment.nodeapi + '/tbl-allocations-regions/' + branch.branchcode, this.model
        ).subscribe(data => {
          swal('Success', 'Successfully updated!', 'success');
        }, error => {
          console.log(error);
          swal('Error', 'Error occured while update!', 'error');
        });
      } else {

      }
    });
  }

  getusers() {
    this.http
      .get(
        environment.api + '/api/tblusers?filter[where][team]=REMEDIAL CREDIT'
      )
      .subscribe(data => {
        this.users = data;
      }, error => {
        console.log(error)
      });
  }

  getarocodes() {
    this.http
      .get(
        environment.nodeapi + '/tblarocodes'
      )
      .subscribe(data => {
        this.arocodeData = data;
      }, error => {
        console.log(error)
      });
  }

  search(entry) {
    this.http.get(
      environment.nodeapi + '/tbl-allocations-regions/' + entry
    ).subscribe(data => {
      this.model = data;
      swal('Success', 'Successfully retrieved!', 'success');
    }, error => {
      console.log(error);
      swal('Warning', entry + 'was not found', 'warning');
    });
  }

  searchEmployer(entry) {
    if (entry != null && entry != "") {
      this.http.get(
        environment.nodeapi + '/tbl-allocations-deptcodes?filter[where][deptcode]=' + entry
      ).subscribe(data => {
        this.deptcodes = data;
        swal('Success', 'Successfully retrieved!', 'success');
      }, error => {
        console.log(error);
        swal('Warning', entry + '[employer] was not found', 'warning');
      });
    }
  }

  updateArocode(r) {
    swal({
      title: 'Confirm',
      imageUrl: 'assets/img/user/coop.jpg',
      text: 'Confirm update of arocode ' + r.arocode,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update!'
    }).then((result) => {
      if (result.value) {
        this.http.patch(
          environment.nodeapi + '/tblarocodes/' + r.arocode, r
        ).subscribe(data => {
          swal('Success', 'Successfully updated!', 'success');
          this.getarocodes();
        }, error => {
          console.log(error);
          swal('Error', 'Error occured during update!', 'error');
        });
      } else {

      }
    });
  }

  open(content) {
    this.modalService.open(content, { centered: true }).result.then((result) => {

    }, (reason) => {
      // refresh grid
      //this.refreshfunc();
    });
  }

  newarocode(arocode) {
    this.http.post(
      environment.nodeapi + '/tblarocodes', arocode
    ).subscribe(data => {
      swal('Success', 'Successfully added!', 'success');
      this.getarocodes();
    }, error => {
      console.log(error);
      alert(' Error!');
    });
  }

  deletearocode(r) {
    swal({
      title: 'Confirm',
      imageUrl: 'assets/img/user/coop.jpg',
      text: 'Confirm delete of arocode ' + r.arocode,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update!'
    }).then((result) => {
      if (result.value) {
        this.http.delete(
          environment.nodeapi + '/tblarocodes/' + r.arocode
        ).subscribe(data => {
          swal('Success', 'Successfully deleted!', 'success');
          this.getarocodes();
        }, error => {
          console.log(error);
          swal('Error', 'Error occured during delete!', 'error');
        });
      } else {

      }
    });
  }

  openModal(targetModal, r) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.data = r;
  }

  downloadFile(file) {
    if(file == 'account') {
      this.template = environment.accountallocationtemplate;
    } else {
      this.template = environment.employerallocationtemplate;
    }
    this.ecolService.downloadFile(this.template).subscribe(data => {
      saveAs(data, file + '.xlsx');
    }, error => {
      console.log(error);
      swal('Error!', ' Cannot download template  file!', 'error');
    });
  }

  updatememo(form) {
    const body = {
      'memogroup': form.mmemogroup,
      'colofficer': form.mcolofficer
    };
    swal({
      title: 'Are you sure?',
      text: 'You want to allocate memo group?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Add!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.http.put(environment.api + '/api/tbl_colofficer_memogroups', body).subscribe(resp => {
          swal('Success!', 'Successfully added!', 'success');
          this.getData();
          this.spinner.hide();
        }, error => {
          console.log(error);
          swal('Error!', 'Update was not completed!', 'error');
          this.spinner.hide();
        });
      }
    });
  }

  getData() {
    this.http.get<any>(environment.api + '/api/tbl_colofficer_memogroups').subscribe(resp => {
      this.rowData1 = resp;
    });
  }


}
