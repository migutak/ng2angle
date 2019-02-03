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

  getAccount(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>( environment.api + '/api/tbl_q_all?filter[include]=guarantors&filter[include]=demandsdues&filter[where][accnumber]=' + accnumber);
  }

  generateLetter(data) {
    return this.httpClient.post<any>( environment.letters_api + '/api/letters_post/demand1', data);
  }

  sendDemandEmail(data) {
    return this.httpClient.post<any>( environment.api + '/api/Email-models/send', data);
  }

  demandshistory(data) {
    return this.httpClient.post<any>( environment.api + '/api/demandshistory', data);
  }

  getdemandshistory(accnumber) {
    return this.httpClient.get<any>( environment.api + '/api/demandshistory?filter[where][accnumber]=' + accnumber);
  }

  guarantorletters(data) {
    return this.httpClient.post<any>( environment.api + '/api/guarantorletters', data);
  }

  downloadFile(file: string) {
    const body = {filename: file};

    return this.httpClient.post(environment.uploadurl + '/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }

  logout() {
      //  remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      localStorage.removeItem('accountInfo');
  }

}
