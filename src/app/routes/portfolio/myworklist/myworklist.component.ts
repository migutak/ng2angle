import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { saveAs} from 'file-saver';

@Component({
  selector: 'app-myworklist',
  templateUrl: './myworklist.component.html',
  styleUrls: ['./myworklist.component.scss']
})
export class MyworklistComponent implements OnInit {

  model: any = {};
  demands: any;
  constructor(private ecolService: EcolService) { }

  ngOnInit() {
  }

  Search(accnumber) {
    this.ecolService.loader();
    this.ecolService.getdemandshistory(accnumber.value).subscribe(data => {
      if (data.length > 0) {
        this.demands = data;
        swal('Successful!', 'Historical letters generated!', 'success');
      } else {
        this.demands = [];
        swal('Warning!', 'No demand Letter was found!', 'warning');
      }
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred letter generation!', 'error');
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
