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

  constructor(private ecolService: EcolService) { }

  ngOnInit() {
  }


}
