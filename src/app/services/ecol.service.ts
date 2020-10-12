import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcolService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

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

  sptypes(body) {
    return this.httpClient.post(environment.api + '/api/sptypes', body);
  }

  relegate(body) {
    return this.httpClient.put(environment.api + '/api/pmt_holder', body);
  }

  relegationbyid(id) {
    return this.httpClient.get(environment.nodeapi + '/tbl-relegations/' + id);
  }

  custview_stage(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/custview_stage?filter[where][custnumber]=' + custnumber);
  }

  customer_stage(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/customer_stage/' + custnumber);
  }

  approverelegate(body){
    return this.httpClient.patch(environment.nodeapi + '/tbl-relegations/' + body.casenumber, body);
  }

  relegation(body) {
    return this.httpClient.post(environment.nodeapi + '/tbl-relegations', body);
  }

  newmarketer(body) {
    return this.httpClient.post(environment.api + '/api/tblmarketors', body);
  }

  newvaluation(body) {
    return this.httpClient.post(environment.api + '/api/tblvaluers', body);
  }

  patchvaluation(body) {
    return this.httpClient.patch(environment.api + '/api/tblvaluers/' + body.id, body);
  }

  patchmarketer(body) {
    return this.httpClient.patch(environment.api + '/api/tblmarketors/' + body.id, body);
  }

  patchdebtcollectors(body) {
    return this.httpClient.patch(environment.api + '/api/tbldebtcollectors/' + body.id, body);
  }

  patchinvoices(body) {
    return this.httpClient.patch(environment.api + '/api/tblinvoices/' + body.id, body);
  }

  post_tbl_allocations_memogroups(body) {
    return this.httpClient.post(environment.nodeapi + '/tbl_allocations_memogroups', body);
  }

  patch_tbl_allocations_memogroups(body) {
    return this.httpClient.patch(environment.nodeapi + '/tbl_allocations_memogroups/' + body.memogroup, body);
  }

  checkinmarketer(accnumber) {
    return this.httpClient.get<any>(environment.api + '/api/tblmarketors?filter[where][accnumber]='+accnumber+'&filter[where][newstatus][nin]=unassigned&filter[where][newstatus][nin]=Completed');
  }

  checkindebtcollector(accnumber) {
    return this.httpClient.get<any>(environment.api + '/api/tbldebtcollectors?filter[where][accnumber]='+accnumber+'&filter[where][newstatus][nin]=Cancelled&filter[where][newstatus][nin]=Completed');
  }

  checkinvaluation(accnumber) {
    return this.httpClient.get<any>(environment.api + '/api/tblvaluers?filter[where][accnumber]='+accnumber+'&filter[where][newstatus][nin]=Cancelled&filter[where][newstatus][nin]=Completed');
  }

  newauctioneer(body) {
    return this.httpClient.post(environment.api + '/api/auctioneer', body);
  }

  newinvoice(body) {
    return this.httpClient.post(environment.api + '/api/tblinvoices', body);
  }

  newdebtcollector(body) {
    return this.httpClient.post(environment.api + '/api/tbldebtcollectors', body);
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
    let url = environment.nodeapi + '/notehis/custnotes?custnumber=' + cust ;

    if (filter !== '') {
      url = url + '&offset=' + filter.skip + '&next= ' + filter.limit;
    }
    return this.httpClient.get<any>(url);
  }

  getbulknotes(cust) {
    // tslint:disable-next-line:max-line-length
    const response = this.httpClient.get<any>(environment.nodeapi + '/vallnotes?filter[where][custnumber]=' + cust + '&filter[where][notesrc]=uploaded a note' ); //+ '&filter[order]=notedate DESC'
    return forkJoin([response]);
  }

  getflaggednotes(cust) {
    // tslint:disable-next-line:max-line-length
    const response = this.httpClient.get<any>(environment.nodeapi + '/vallnotes?filter[where][custnumber]=' + cust + '&filter[where][noteimp]=Y' ); //+ '&filter[order]=notedate DESC'
    return forkJoin([response]);
  }

  getcmdstatus() {
    const url = environment.api + '/api/cmdstatus';
    return this.httpClient.get(url);
  }

  getreviewers() {
    const url = environment.api + '/api/tblusers?filter[where][role]=teamleader';
    return this.httpClient.get(url);
  }

  getcollectoraction() {
    const url = environment.api + '/api/collectoraction';
    return this.httpClient.get(url);
  }

  getplanmemos() {
    const url = environment.api + '/api/tbl_s_planmemos';
    return this.httpClient.get(url);
  }

  excuse() {
    const url = environment.api + '/api/excuse?filter[order]=excuse ASC';
    return <any>this.httpClient.get(url);
  }

  getexcuse() {
    const url = environment.api + '/api/tblexcuse?filter[order]=excuse ASC';
    return <any>this.httpClient.get(url);
  }
  getexcuseid(excuse) {
    const url = environment.api + '/api/tblexcuse?filter[where][excuse]='+excuse;
    return <any>this.httpClient.get(url);
  }
  getexcusedetails(excuse) {
    const url = environment.api + '/api/tblexcuse_details?filter[where][excuse]='+excuse;
    return <any>this.httpClient.get(url);
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
    const url = environment.nodeapi + '/activitylogs';
    return this.httpClient.post(url, body);
  }

  bulktotblportfolio(body) {
    const url = environment.api + '/api/tbl_portfolio_static/actiondate';
    return this.httpClient.post(url, body);
  }

  bulktotblcardsstatic(body) {
    const url = environment.api + '/api/TBLCARD_STATIC/actiondate';
    return this.httpClient.post(url, body);
  }

  getallsptype() {
    const url = environment.api + '/api/sptypes';
    return this.httpClient.get<any>(url);
  }

  getsptype(type) {
    const url = environment.api + '/api/sptypes?filter[where][spcode]=' + type;
    return this.httpClient.get<any>(url);
  }

  sptype(body) {
    const url = environment.api + '/api/sptypes';
    return this.httpClient.post(url, body);
  }

  putsptype(body) {
    const url = environment.api + '/api/sptypes';
    return this.httpClient.put(url, body);
  }

  patchtblexcuse(body) {
    const url = environment.api + '/api/tblexcuse/' + body.id;
    return this.httpClient.patch(url, body);
  }

  posttblexcuse(body) {
    const url = environment.api + '/api/tblexcuse';
    return this.httpClient.post(url, body);
  }

  postnotes(body) {
    const url = environment.api + '/api/notehis';
    return this.httpClient.post<any>(url, body);
  }

  bulknotes(body) {
    //const url = environment.nodeapi + '/xlsuploads/uploadbulk-test';
    const url = environment.api + '/api/notehis';
    return this.httpClient.post<any>(url, body, {
      reportProgress: true,
      observe: 'events' 
    });
  }

  insertbulknotes(body) {
    const url = environment.nodeapi + '/notes/bulknotes';
    return this.httpClient.post(url, body);
  }

  putnote(body) {
    const url = environment.api + '/api/notehis';
    return this.httpClient.put(url, body);
  }

  updatenote(body) {
    const url = environment.api + '/api/notehis/updatenote';
    return this.httpClient.post(url, body);
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
    return this.httpClient.get<any>(environment.nodeapi + '/tblusers/login/' + username);
  }

  notifications() {
    return this.httpClient.get<any>(environment.api + '/api/notifications');
  }

  auth(body: object) {
    return this.httpClient.post<any>(environment.auth, body);
  }

  putuser(user: any) {
    return this.httpClient.put<any>(environment.nodeapi + '/tblusers/' + user.username, user);

  }

  getuser(username: string) {
    return this.httpClient.get<any>(environment.nodeapi + '/tblusers/search?username=' + username);
  }

  getcmdacc(custnumber: string) {
    return this.httpClient.get<any>(environment.api + '/api/tqall/cmdacc?custnumber=' + custnumber);
  }

  getpermissions(role_id: string) {
    return this.httpClient.get<any>(environment.nodeapi + '/permissionsettings?filter[where][role_id]=' + role_id);
  }

  s_account_plans(accnumber, planid) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_account_plans?filter[where][accnumber]=' + accnumber + '&filter[where][planid]=' + planid);
  }

  s_check_account_plans(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_accounts?filter[where][accnumber]=' + accnumber);
  }

  saveaccountplan(body) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<any>(environment.api + '/api/tbl_s_account_plans', body);
  }

  putaccountplan(body) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put<any>(environment.api + '/api/tbl_s_account_plans/' + body.id, body);
  }

  put_s_accounts(body) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put<any>(environment.api + '/api/tbl_s_accounts', body);
  }

  getaccount(accnumber) {
    // return this.httpClient.get<any>(environment.api + '/api/tbl_q_all/' + accnumber);
    return this.httpClient.get<any>(environment.nodeapi + '/tqall/' + accnumber);
  }

  getStaticLoans(accnumber) {
    return this.httpClient.get<any>(environment.api + '/api/tbl_portfolio_static?filter[where][accnumber]=' + accnumber);
  }

  getthisptp(id) {
    return this.httpClient.get<any>(environment.api + '/api/ptps/' + id);
  }

  getwatch(accnumber) {
    return this.httpClient.get<any>(environment.api + '/api/watch_stage/' + accnumber);
  }

  accounts(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/watch_stage?filter[where][custnumber]=' + custnumber);
  }

  account(accnumber) {
    return this.httpClient.get<any>(environment.api + '/api/watch_stage/' + accnumber);
  }

  getfileshistory(custnumber) {
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
    return this.httpClient.get<any>(environment.nodeapi + '/loans/memos');
  }

  allteles(custnumber) {
    return this.httpClient.get<any>(environment.nodeapi + '/teles/all?custnumber=' + custnumber);
  }

  demandstatus(body) {
    return this.httpClient.post<any>(environment.nodeapi + '/demandstatus/demandstatus', body);
  }

  putautoLetter(letter) {
    return this.httpClient.put<any>(environment.api + '/api/autoletters', letter);
  }

  postcheckautoLetter(data) {
    return this.httpClient.post<any>(environment.api + '/api/autoletters/checkduplicate', data);
  }

  postautoLetter(letter) {
    return this.httpClient.post<any>(environment.api + '/api/autoletters', letter);
  }

  putLetter(letter) {
    return this.httpClient.put<any>(environment.api + '/api/demandsettings', letter);
  }

  postsms(body) {
    return this.httpClient.post<any>(environment.api + '/api/sms/', body);
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

  getddAccount(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/demandsdues&filter[where][accnumber]=' + accnumber);
  }

  getmcoopcashAccount(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/mcoopcash_stage?filter[include]=mcoopcash_static&filter[where][loanaccnumber]=' + accnumber);
  }

  getcustwithAccount(custnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tqall?filter[where][custnumber]=' + custnumber);
  }

  getcardAccount(cardacct) {
    // tslint:disable-next-line:max-line-length/qall
    return this.httpClient.get<any>(environment.api + '/api/tcards?filter[where][cardacct]=' + cardacct);
  }

  getWatchcardStatic(cardacct) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/cards_watch_static?filter[where][cardacct]=' + cardacct);
  }

  all_s_plans() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_plans');
  }

  single_s_plans(planid) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_plans/' + planid);
  }

  getplanactions(planid) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_plan_actions?filter[where][planid]=' + planid);
  }

  getWatchcardAccount(cardacct) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/cards_watch_stage?filter[where][cardacct]=' + cardacct);
  }

  getanaction(actionid) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_actions/' + actionid);
  }

  getcardwithid(nationid) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/cards_stage?filter[where][nationid]=' + nationid);
  }

  ptps(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/ptps?filter[where][accnumber]=' + accnumber);
  }

  tbl_s_plans() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_plans');
  }

  post_s_plan(body) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<any>(environment.api + '/api/tbl_s_plans', body);
  }

  post_s_plan_actions(body) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<any>(environment.api + '/api/tbl_s_plan_actions', body);
  }

  s_actions() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_actions');
  }

  post_s_actions(action) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<any>(environment.api + '/api/tbl_s_actions', action);
  }

  postptps(ptps) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<any>(environment.api + '/api/ptps', ptps);
  }

  otheraccs(custnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.nodeapi + '/otheraccs/all?custnumber=' + custnumber);
  }

  guarantordetails(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/guarantordetails?filter[where][accnumber]=' + accnumber);
  }

  collaterals(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.nodeapi + '/collaterals?accnumber=' + accnumber);
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

  planmemo(planid) {
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_plans/' + planid);
  }

  postplanmemo(data) {
    return this.httpClient.post<any>(environment.api + '/api/tbl_s_planmemos/memoadd', data);
  }

  putteles(data) {
    return this.httpClient.put<any>(environment.api + '/api/teles', data);
  }

  reviewptp(data) {
    return this.httpClient.post<any>(environment.nodeapi + '/brokenptps/review', data);
  }

  put_s_actions(data) {
    return this.httpClient.put<any>(environment.api + '/api/tbl_s_actions/' + data.actionid, data);
  }

  put_s_plan_actions(data) {
    return this.httpClient.put<any>(environment.api + '/api/tbl_s_plan_actions' + data.planid, data);
  }

  s_plan_actions(planid) {
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_plan_actions?filter[where][planid]=' + planid);
  }

  delete_s_plan_actions(id) {
    return this.httpClient.delete<any>(environment.api + '/api/tbl_s_plan_actions/' + id);
  }

  delete_s_planmemos(id) {
    return this.httpClient.delete<any>(environment.api + '/api/tbl_s_planmemos/' + id);
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
    // return this.httpClient.get<any>(environment.api + '/api/teles/alltele?custnumber=' + custnumber);
    return this.httpClient.get<any>(environment.nodeapi + '/teles/all?custnumber=' + custnumber);
  }

  buckets() {
    return this.httpClient.get<any>(environment.nodeapi + '/loans/buckets');
  }

  arocodes() {
    return this.httpClient.get<any>(environment.nodeapi + '/loans/arocodes');
  }

  activeptps(accnumber) {
    return this.httpClient.get<any>(environment.nodeapi + '/activeptps/active?accnumber=' + accnumber);
  }

  getallplans() {
    // return this.httpClient.get<any>(environment.api + '/api/teles/alltele?custnumber=' + custnumber);
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_plans');
  }

  existsteles(custnumber, tel, email) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/teles?filter[where][custnumber]=' + custnumber + '&filter[where][telephone]=' + tel + '&filter[where][email]=' + email);
  }

  getsmsmessage(demand) {
    return this.httpClient.get<any>(environment.api + '/api/demandsettings/' + demand.toLowerCase());
  }

  getptps(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.nodeapi + '/ptps?filter[where][accnumber]=' + accnumber ); //+ '&filter[order]=actiondate DESC'
  }

  sendDemandEmail(data) {
    return this.httpClient.post<any>(environment.emailapi, data);
  }

  sendDemandsms(data) {
    return this.httpClient.post<any>(environment.demandsmsapi, data);
  }

  sendsms(data) {
    return this.httpClient.post<any>(environment.api + '/api/sms', data);
  }

  ammendptp(data) {
    return this.httpClient.post<any>(environment.nodeapi + '/ptpsammend/ammendptp', data);
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
  
  woffstory(data) {
    return this.httpClient.put<any>(environment.api + '/api/writeoffstory', data);
  }

  productofferings(data) {
    return this.httpClient.put<any>(environment.api + '/api/tbl_productofferings', data);
  }

  getproductofferings(accnumber) {
    return this.httpClient.get<any>(environment.api + '/api/tbl_productofferings/' + accnumber);
  }

  searchwoffstory(accnumber) {
    return this.httpClient.get<any>(environment.api + '/api/writeoffstory?filter[where][accnumber]=' + accnumber);
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
      return this.httpClient.get<any>(environment.api + '/api/demandsdue/grouptotal?column=' + column + '&value=' + value);
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

  demanddownload(file: string) {
    const body = { filename: file };

    return this.httpClient.post(environment.demanddownload + '/filesapi/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  demanddownload2(file: string) {
    const body = { filename: environment.letters_path + file };

    return this.httpClient.post(environment.demanddownload + '/filesapi/download', body, {
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

    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('accountInfo');
    sessionStorage.removeItem('userpermission');
    sessionStorage.removeItem('profile');
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

  searchtotalcardswatch(searchstring) {
    return this.httpClient.get<any>(environment.api + '/api/cards_watch_stage/searchtotalcardswatch?searchstring=' + searchstring);
  }

  totaldemandsduewithsearch(searchstring) {
    return this.httpClient.get<any>(environment.api + '/api/demandsdue/totaldemandsduewithsearch?searchtext=' + searchstring);
  }

  totalcreditcardsviewall() {
    return this.httpClient.get<any>(environment.api + '/api/tcards/totalviewall');
  }

  totalcreditcardsearch(searchstring) {
    return this.httpClient.get<any>(environment.api + '/api/tcards/totalcreditcardsearch?searchstring=' + searchstring);
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
    return this.httpClient.get<any>(environment.api + '/api/tqall/total');
  }

  totalnotes(custnumber) {
    return this.httpClient.get<any>(environment.nodeapi + '/notehis/total?custnumber=' + custnumber);
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

  getbrokenptps() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.nodeapi + '/loans/brokenptps');
  }

  totalcarddue() {
    const url = environment.nodeapi + '/loans/demandlettersccdue/';
    return this.httpClient.get(url);
    // return this.httpClient.get<any>(environment.nodeapi + '/loans/demandlettersccdue/');
  }

  lettersdue() {
    const url = environment.nodeapi + '/loans/demandlettersdue';
    return this.httpClient.get(url);
    // return this.httpClient.get<any>(environment.nodeapi + '/loans/demandlettersccdue/');
  }

  postinsurance(data) {
    return this.httpClient.post<any>(environment.nodeapi + '/insurance/insert', data);
  }

  post_pmt_insurance(data) {
    return this.httpClient.post<any>(environment.api + '/api/pmt_insurance', data);
  }

  post_insurance(data) {
    return this.httpClient.post<any>(environment.api + '/api/insurance', data);
  }

  put_insurance(data) {
    return this.httpClient.put<any>(environment.api + '/api/insurance', data);
  }

  put_pmt_insurance(data) {
    return this.httpClient.put<any>(environment.api + '/api/pmt_insurance', data);
  }

  patch_pmt_insurance(data) {
    return this.httpClient.patch<any>(environment.api + '/api/pmt_insurance/' + data.id, data);
  }

  userlastlogin(user) {
    return this.httpClient.patch<any>(environment.nodeapi + '/tblusers/' + user.username, user);
  }

  updateinsurance(data) {
    return this.httpClient.post<any>(environment.nodeapi + '/insurance/update', data);
  }

  deleteinsurance(id) {
    return this.httpClient.post<any>(environment.nodeapi + '/insurance/delete', id);
  }


  ifLogged() {
    if (!localStorage.getItem('currentUser')) {
      /*swal({
        title: 'You\'re Not Logged In',
        imageUrl: 'assets/img/user/notlogg.png',
        text: 'Kindly, log in to continue!',

        confirmButtonColor: '#7ac142',
        confirmButtonText: 'Okay'
      });*/
      this.router.navigate(['/login']);
      return false;
    }
  }

  ifclosed() {
    if (!sessionStorage.getItem('currentUser')) {
      /*swal({
        title: 'You\'re Not Logged In',
        imageUrl: 'assets/img/user/notlogg.png',
        text: 'Kindly, log in to continue!',

        confirmButtonColor: '#7ac142',
        confirmButtonText: 'Okay'
      });*/
      this.router.navigate(['/login']);
      return false;
    }
  }

  downloadXlsFile(data, filename = 'data') {
    let csvData = this.ConvertToCSV(data, ['id', 'accnumber', 'custnumber', 'notemade', 'owner', 'noteimp', 'notesrc', 'notedate']);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }

}
