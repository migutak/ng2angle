import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EcolService {

  constructor(private httpClient: HttpClient) { }

  loader() {

    swal({
      title: 'Processing ...',
      text: 'Please wait',
      showConfirmButton: false,
      /*onOpen: function () {
        swal.showLoading();
      }*/
    });
  }

  submitGuarantor(body) {
    return this.httpClient.post(environment.api + '/api/guarantors', body);
  }

  updateGuarantor(id, body) {
    return this.httpClient.put(environment.api + '/api/guarantors/' + id, body);
  }

  retrieveGuarantors(accnumber) {
    return this.httpClient.get(environment.api + '/api/guarantors?filter[where][accnumber]=' + accnumber);
  }

  retrieve_a_Guarantor(id) {
    return this.httpClient.get(environment.api + '/api/guarantors?filter[where][id]=' + id);
  }

  updateLetter(body) {
    return this.httpClient.put(environment.api + '/api/settings_letters', body);
  }

    login(username: string, password: string) {
      return this.httpClient.get<any>( environment.api + '/api/tblusers/' + username);

  }

  getLetter(letter) {
    return this.httpClient.get<any>( environment.api + '/api/settings_letters/' + letter);
  }

  logout() {
      //  remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      localStorage.removeItem('accountInfo');
  }

}
