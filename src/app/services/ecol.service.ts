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
    return this.httpClient.post(environment.api + '/api/guarantordetails', body);
  }

  getallnotes(filter, cust) {
    //
    let url = environment.api + '/api/notehis?filter[where][custnumber]=' + cust;

    if (filter !== '') {
      url = url + '&filter[order]=notedate DESC' + '&filter[skip]=' + filter.skip + '&filter[limit]= ' + filter.limit;
    }
    return this.httpClient.get(url);
  }

  getcmdstatus() {
    const url = environment.api + '/api/cmdstatus';
    return this.httpClient.get(url);
  }

  getbranchstatus() {
    const url = environment.api + '/api/cmdstatus';
    return this.httpClient.get(url);
  }


  postactivitylogs(body) {
    const url = environment.api + '/api/activitylogs';
    return this.httpClient.post(url, body);
  }

  postnotes(body) {
    const url = environment.api + '/api/notehis';
    return this.httpClient.post(url, body);
  }

  recordupdate(body) {
    const url = environment.api + '/api/activitylogs/action';
    return this.httpClient.post(url, body);
  }

  updateGuarantor(id, body) {
    return this.httpClient.put(environment.api + '/api/guarantordetails/' + id, body);
  }

  retrieveGuarantors(accnumber) {
    return this.httpClient.get(environment.api + '/api/guarantordetails?filter[where][accnumber]=' + accnumber);
  }

  retrieve_a_Guarantor(id) {
    return this.httpClient.get(environment.api + '/api/guarantordetails?filter[where][id]=' + id);
  }

  global(body) {
    return this.httpClient.put(environment.api + '/api/global_letter_settings', body);
  }

  getglobal() {
    return this.httpClient.get(environment.api + '/api/global_letter_settings');
  }

  updateLetter(body) {
    return this.httpClient.put(environment.api + '/api/settings_letters', body);
  }

  login(username: string) {
    return this.httpClient.get<any>(environment.api + '/api/tblusers/' + username);
  }

  auth(username: string, password: string) {
    return this.httpClient.get<any>(environment.auth + '?username=' + username + '&password=' + password);
  }

  putuser(user: object) {
    return this.httpClient.put<any>(environment.api + '/api/tblusers', user);

  }

  getuser(username: string) {
    return this.httpClient.get<any>(environment.api + '/api/tblusers?filter[where][username]=' + username);
  }

  getpermissions(role_id: string) {
    return this.httpClient.get<any>(environment.api + '/api/permissionsettings?filter[where][role_id]=' + role_id);
  }

  getaccount (accnumber) {
    return this.httpClient.get<any>(environment.api + '/api/tbl_q_all/' + accnumber);
  }

  getfileshistory (custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/uploads?filter[where][custnumber]=' + custnumber);
  }

  getsms(cust) {
    return this.httpClient.get<any>(environment.api + '/api/sms?filter[where][custnumber]=' + cust + '&filter[order]=datesent desc');
  }

  getLetter(letter) {
    return this.httpClient.get<any>(environment.api + '/api/demandsettings/' + letter);
  }

  getautoLetter() {
    return this.httpClient.get<any>(environment.api + '/api/autoletters');
  }

  putautoLetter(letter) {
    return this.httpClient.put<any>(environment.api + '/api/autoletters' , letter);
  }

  postcheckautoLetter(data) {
    return this.httpClient.post<any>(environment.api + '/api/autoletters/checkduplicate' , data);
  }

  postautoLetter(letter) {
    return this.httpClient.post<any>(environment.api + '/api/autoletters' , letter);
  }

  putLetter(letter) {
    return this.httpClient.put<any>(environment.api + '/api/demandsettings' , letter);
  }

  postsms (body) {
    return this.httpClient.post(environment.api + '/api/sms/', body);
  }

  getdemandSettings() {
    return this.httpClient.get<any>(environment.api + '/api/demandsettings');
  }

  getdemandSettingsduplicate(letterid, daysinarr, onlyto) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/demandsettings?filter[where][letterid]=' + letterid + '&filter[where][daysinarr]=' + daysinarr + '&filter[where][onlyto]=' + onlyto);
  }

  demandSettings(body) {
    return this.httpClient.post<any>(environment.api + '/api/demandsettings', body);
  }

  putdemandSettings(body) {
    return this.httpClient.put<any>(environment.api + '/api/demandsettings', body);
  }

  getAccount(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_q_all?filter[include]=guarantors&filter[include]=demandsdues&filter[where][accnumber]=' + accnumber);
  }

  getcustwithAccount(custnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_q_all?filter[where][custnumber]=' + custnumber);
  }

  getcardAccount(cardacct) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/cards_stage?filter[where][cardacct]=' + cardacct);
  }

  getcardwithid(nationid) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/cards_stage?filter[where][nationid]=' + nationid);
  }

  ptps(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/ptps?filter[where][accnumber]=' + accnumber);
  }

  otheraccs(custnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_q_all?filter[where][custnumber]=' + custnumber);
  }

  guarantordetails(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/guarantordetails?filter[where][accnumber]=' + accnumber);
  }

  collaterals(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/collaterals?filter[where][accnumber]=' + accnumber);
  }

  directors(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/directors?filter[where][accnumber]=' + accnumber);
  }

  accwithid(nationid) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_q_all?filter[where][nationid]=' + nationid);
  }


  generateLetter(data) {
    console.log('data received', data);
    return this.httpClient.post<any>(environment.letters_api + data.demand + '/download', data);
  }

  generateLettercc(data) {
    return this.httpClient.post<any>(environment.letters_api + data.demand + '/download', data);
  }

  postteles(data) {
    return this.httpClient.post<any>(environment.api + '/api/teles', data);
  }

  putteles(data) {
    return this.httpClient.put<any>(environment.api + '/api/teles/' + data.id, data);
  }

  getteles(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/teles?filter[where][custnumber]=' + custnumber);
  }

  existsteles(custnumber, tel, email) {
    return this.httpClient.get<any>(environment.api + '/api/teles?filter[where][custnumber]=' + custnumber + '&filter[where][telephone]=' + tel + '&filter[where][email]='+ email);
  }

  getsmsmessage(demand) {
    return this.httpClient.get<any>(environment.api + '/api/tbl_smstemplate?filter[where][title]=' + demand);
  }

  sendDemandEmail(data) {
    return this.httpClient.post<any>(environment.emailapi, data);
  }

  sendsms(data) {
    return this.httpClient.post<any>(environment.api + '/api/sms', data);
  }

  demandshistory(data) {
    return this.httpClient.post<any>(environment.api + '/api/demandshistory', data);
  }

  uploads(data) {
    return this.httpClient.post<any>(environment.api + '/api/uploads', data);
  }

  getdemandshistory(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/demandshistory?filter[where][accnumber]=' + accnumber + '&filter[order]=datesent desc');
  }

  demand1history(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/demandshistory?filter[where][accnumber]=' + accnumber + '&filter[where][demand]=Demand1&filter[order]=datesent desc');
  }

  getbranches() {
    return this.httpClient.get<any>(environment.api + '/api/branches');
  }

  putbranch(branch: object) {
    return this.httpClient.put<any>(environment.api + '/api/branches', branch);
  }

  guarantorletters(data) {
    return this.httpClient.post<any>(environment.api + '/api/guarantorletters', data);
  }

  getperm(role: string) {
    return this.httpClient.get<any>(environment.api + '/api/permissionsettings?filter[where][role_id]=' + role);
  }

  postperm(perm: object) {
    return this.httpClient.put<any>(environment.api + '/api/permissionsettings', perm);
  }

  setpermissions(perm: object) {
    return this.httpClient.post<any>(environment.api + '/api/permissionsettings/setpermission', perm);
  }

  gettotalletters(column, value, letter) {
    if (column) {
      // tslint:disable-next-line:max-line-length
      return this.httpClient.get<any>(environment.api + '/api/demandsdue/grouptotal?column=' + column + '&value=' + value );
    } else {
      return this.httpClient.get<any>(environment.api + '/api/demandsdue/grouptotal?letter=' + letter);
    }
  }

  downloadFile(file: string) {
    const body = { filename: file };

    return this.httpClient.post(environment.uploadurl + '/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  logout() {
    //  remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accountInfo');
    localStorage.removeItem('userpermission');
    localStorage.removeItem('profile');
  }

}
