import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EcolService {


  SERVER_URL: string = "http://localhost/upload";
  constructor(
    private httpClient: HttpClient,
    private router: Router
    ) { }

    public uploadFile(data) {
      let uploadURL = `${this.SERVER_URL}/import_excel.php`;
  
      return this.httpClient.post<any>(uploadURL, data);
    }

  loader() {

    swal({
      title: 'Processing ...',
      // text: 'Please wait',
      showConfirmButton: false,
      onOpen: function () {
        swal.showLoading();
      }
    });
  }

  submitGuarantor(body) {
    return this.httpClient.post(environment.api + '/api/guarantordetails', body);
  }

  newmarketer(body) {
    return this.httpClient.post(environment.api + '/api/marketor', body);
  }

  newauctioneer(body) {
    return this.httpClient.post(environment.api + '/api/auctioneer', body);
  }

  newdebtcollector(body) {
    return this.httpClient.post(environment.api + '/api/debtcollector', body);
  }

  newvaluer(body) {
    return this.httpClient.post(environment.api + '/api/valuers', body);
  }

  newrepo(body) {
    return this.httpClient.post(environment.api + '/api/repossessions', body);
  }

  newinvestigators(body) {
    return this.httpClient.post(environment.api + '/api/investigators', body);
  }

  getallnotes(filter, cust) {
    //
    let url = environment.api + '/api/notehis/custnotes?custnumber=' + cust;

    if (filter !== '') {
      url = url + '&offset=' + filter.skip + '&next= ' + filter.limit;
    }
    return this.httpClient.get<any>(url);
  }

  getcmdstatus() {
    const url = environment.api + '/api/cmdstatus';
    return this.httpClient.get(url);
  }

  getreviewers() {
    const url = environment.api + '/api/tblusers?filter[where][role]=Reviewer';
    return this.httpClient.get(url);
  }

  getcollectoraction() {
    const url = environment.api + '/api/collectoraction';
    return this.httpClient.get(url);
  }
  getexcuse() {
    const url = environment.api + '/api/excuse';
    return this.httpClient.get(url);
  }
  getcure() {
    const url = environment.api + '/api/cure';
    return this.httpClient.get(url);
  }
  getparty() {
    const url = environment.api + '/api/party';
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

  putnote(body) {
    const url = environment.api + '/api/notehis';
    return this.httpClient.put(url, body);
  }

  getanote(id) {
    const url = environment.api + '/api/notehis/' + id;
    return this.httpClient.get(url);
  }

  recordupdate(body) {
    const url = environment.api + '/api/activitylogs/action';
    return this.httpClient.post(url, body);
  }

  updateGuarantor(id, body) {
    return this.httpClient.put(environment.api + '/api/guarantordetails/' + id, body);
  }

  updateCollateral(id, body) {
    return this.httpClient.put(environment.api + '/api/deptcollateral/' + id, body);
  }

  retrieveGuarantors(accnumber) {
    return this.httpClient.get(environment.api + '/api/guarantordetails?filter[where][accnumber]=' + accnumber);
  }

  retrieveCollateral(custnumber) {
    return this.httpClient.get(environment.api + '/api/deptcollateral?filter[where][custnumber]=' + custnumber);
  }

  submitCollateral(body) {
    return this.httpClient.post(environment.api + '/api/deptcollateral', body);
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

  notifications() {
    return this.httpClient.get<any>(environment.api + '/api/notifications');
  }

  auth(body: object) {
    return this.httpClient.post<any>(environment.auth,  body);
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
    // return this.httpClient.get<any>(environment.api + '/api/tbl_q_all/' + accnumber);
    return this.httpClient.get<any>(environment.api + '/api/qall/' + accnumber);
  }

  getwatch (accnumber) {
    return this.httpClient.get<any>(environment.api + '/api/watch_stage/' + accnumber);
  }

  getfileshistory (custnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/uploads?filter[where][custnumber]=' + custnumber + '&filter[order]=stagedate desc');
  }

  getsms(cust) {
    return this.httpClient.get<any>(environment.api + '/api/sms?filter[where][custnumber]=' + cust + '&filter[order]=stagedate desc');
  }

  getLetter(letter) {
    return this.httpClient.get<any>(environment.api + '/api/demandsettings/' + letter);
  }

  getautoLetter() {
    return this.httpClient.get<any>(environment.api + '/api/autoletters');
  }

  getmemo() {
    return this.httpClient.get<any>(environment.api + '/api/vmemos');
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
    // return this.httpClient.get<any>(environment.api + '/api/tbl_q_all?filter[include]=guarantors&filter[include]=demandsdues&filter[where][accnumber]=' + accnumber);
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tqall?filter[include]=guarantors&filter[include]=demandsdues&filter[where][accnumber]=' + accnumber);
  }

  getmcoopcashAccount(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/mcoopcash_stage?filter[include]=mcoopcash_static&filter[where][loanaccnumber]=' + accnumber);
  }

  getcustwithAccount(custnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/qall?filter[where][custnumber]=' + custnumber);
  }

  getcardAccount(cardacct) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tcards?filter[where][cardacct]=' + cardacct);
  }

  getWatchcardStatic(cardacct) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/cards_watch_static?filter[where][cardacct]=' + cardacct);
  }

  getWatchcardAccount(cardacct) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/cards_watch_stage?filter[where][cardacct]=' + cardacct);
  }

  getcardwithid(nationid) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/cards_stage?filter[where][nationid]=' + nationid);
  }

  getptps(accnumber) {
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

  putcardwatch(data) {
    return this.httpClient.put<any>(environment.api + '/api/cards_watch_static/' + data.cardacct, data);
  }

  putwatch(data) {
    return this.httpClient.put<any>(environment.api + '/api/watch_static', data);
  }

  putcustomersuspensions(data) {
    return this.httpClient.put<any>(environment.api + '/api/customersuspensions', data);
  }

  getcustomersuspensions() {
    return this.httpClient.get<any>(environment.api + '/api/customersuspensions');
  }

  getteles(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/teles?filter[where][custnumber]=' + custnumber);
  }

  getallteles(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/teles/alltele?custnumber=' + custnumber);
  }

  existsteles(custnumber, tel, email) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/teles?filter[where][custnumber]=' + custnumber + '&filter[where][telephone]=' + tel + '&filter[where][email]=' + email);
  }

  getsmsmessage(demand) {
    return this.httpClient.get<any>(environment.api + '/api/demandsettings/' + demand.toLowerCase());
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
    console.log('upload data...', data);
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
    return this.httpClient.get<any>(environment.api + '/api/branches?filter[order]=branchname asc');
  }

  searchbranch(searchtext) {
    return this.httpClient.get<any>(environment.api + '/api/branches/search?searchtext=' + searchtext);
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

    return this.httpClient.post(environment.uploadurl + '/filesapi/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  logout() {
    //  remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('accountInfo');
    sessionStorage.removeItem('userpermission');
    sessionStorage.removeItem('profile');

    localStorage.removeItem('currentUser');
    localStorage.removeItem('accountInfo');
    localStorage.removeItem('userpermission');
    localStorage.removeItem('profile');
  }

  getloggedinusers() {
    return this.httpClient.get<any>(environment.api + '/api/tblusers?filter[where][loggedin]=Y');
  }

  totalmcoopcashviewall() {
    return this.httpClient.get<any>(environment.api + '/api/mcoopcash_stage/totalviewall');
  }

  totalcardswatch() {
    return this.httpClient.get<any>(environment.api + '/api/cards_watch_stage/totalcardswatch');
  }

  totalcreditcardsviewall() {
    return this.httpClient.get<any>(environment.api + '/api/tcards/totalviewall');
  }

  totalcreditcardsmyallocation(username) {
    return this.httpClient.get<any>(environment.api + '/api/tcards/totalmyallocation?colofficer=' + username);
  }

  totalcreditcardstotalmyworklist() {
    return this.httpClient.get<any>(environment.api + '/api/tcards/totalmyworklist');
  }

  totalcardsdue() {
    return this.httpClient.get<any>(environment.api + '/api/demandsduecc/total');
  }

  totalmcoopcashmyworklist(username) {
    return this.httpClient.get<any>(environment.api + '/api/mcoopcash_stage/totalmyworklist?colofficer=' + username);
  }

  totalmcoopcashmyallocations(username) {
    return this.httpClient.get<any>(environment.api + '/api/mcoopcash_stage/totalmyallocations?colofficer=' + username);
  }

  totalcardsclosed() {
    return this.httpClient.get<any>(environment.api + '/api/tcards/totalclosed');
  }

  totaldemandsdue() {
    return this.httpClient.get<any>(environment.api + '/api/demandsdue/total');
  }

  totaltqall() {
    return this.httpClient.get<any>(environment.api + '/api/qall/total');
  }

  totalnotes(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/notehis/total?custnumber=' + custnumber);
  }

  totalguarantors(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/guarantordetails/total?custnumber=' + custnumber);
  }

  totalcontacts(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/teles/total?custnumber=' + custnumber);
  }

  totalcollaterals(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/deptcollateral/total?custnumber=' + custnumber);
  }

  ifLogged() {
    if (!sessionStorage.getItem('currentUser')) {
      swal({title: 'You\'re Not Logged In',
      imageUrl: "assets/img/user/notlogg.png",
      text: 'Kindly, log in to continue!',
      
      confirmButtonColor: '#7ac142',
      confirmButtonText: 'Okay'});
      this.router.navigate( ['/login'] );
      return false;
    }
  }

  ifClosed() {
    if (!localStorage.getItem('currentUser')) {
      swal({title: 'You\'re Not Logged In',
      imageUrl: "assets/img/user/notlogg.png",
      text: 'Kindly, log in to continue!',
      
      confirmButtonColor: '#7ac142',
      confirmButtonText: 'Okay'});
      this.router.navigate( ['/login'] );
      return false;
    }
  }
}
