var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
var EcolService = /** @class */ (function () {
    function EcolService(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
    }
    EcolService.prototype.loader = function () {
        swal({
            title: 'Processing ...',
            // text: 'Please wait',
            showConfirmButton: false,
            onOpen: function () {
                swal.showLoading();
            }
        });
    };
    EcolService.prototype.submitGuarantor = function (body) {
        return this.httpClient.post(environment.api + '/api/guarantordetails', body);
    };
    EcolService.prototype.newmarketer = function (body) {
        return this.httpClient.post(environment.api + '/api/marketor', body);
    };
    EcolService.prototype.newauctioneer = function (body) {
        return this.httpClient.post(environment.api + '/api/auctioneer', body);
    };
    EcolService.prototype.newdebtcollector = function (body) {
        return this.httpClient.post(environment.api + '/api/debtcollector', body);
    };
    EcolService.prototype.newvaluer = function (body) {
        return this.httpClient.post(environment.api + '/api/valuers', body);
    };
    EcolService.prototype.newrepo = function (body) {
        return this.httpClient.post(environment.api + '/api/repossessions', body);
    };
    EcolService.prototype.newinvestigators = function (body) {
        return this.httpClient.post(environment.api + '/api/investigators', body);
    };
    EcolService.prototype.getallnotes = function (filter, cust) {
        //
        var url = environment.api + '/api/notehis/custnotes?custnumber=' + cust;
        if (filter !== '') {
            url = url + '&offset=' + filter.skip + '&next= ' + filter.limit;
        }
        return this.httpClient.get(url);
    };
    EcolService.prototype.getcmdstatus = function () {
        var url = environment.api + '/api/cmdstatus';
        return this.httpClient.get(url);
    };
    EcolService.prototype.getreviewers = function () {
        var url = environment.api + '/api/tblusers?filter[where][role]=Reviewer';
        return this.httpClient.get(url);
    };
    EcolService.prototype.getcollectoraction = function () {
        var url = environment.api + '/api/collectoraction';
        return this.httpClient.get(url);
    };
    EcolService.prototype.getexcuse = function () {
        var url = environment.api + '/api/excuse';
        return this.httpClient.get(url);
    };
    EcolService.prototype.getcure = function () {
        var url = environment.api + '/api/cure';
        return this.httpClient.get(url);
    };
    EcolService.prototype.getparty = function () {
        var url = environment.api + '/api/party';
        return this.httpClient.get(url);
    };
    EcolService.prototype.postactivitylogs = function (body) {
        var url = environment.api + '/api/activitylogs';
        return this.httpClient.post(url, body);
    };
    EcolService.prototype.postnotes = function (body) {
        var url = environment.api + '/api/notehis';
        return this.httpClient.post(url, body);
    };
    EcolService.prototype.putnote = function (body) {
        var url = environment.api + '/api/notehis';
        return this.httpClient.put(url, body);
    };
    EcolService.prototype.getanote = function (id) {
        var url = environment.api + '/api/notehis/' + id;
        return this.httpClient.get(url);
    };
    EcolService.prototype.recordupdate = function (body) {
        var url = environment.api + '/api/activitylogs/action';
        return this.httpClient.post(url, body);
    };
    EcolService.prototype.updateGuarantor = function (id, body) {
        return this.httpClient.put(environment.api + '/api/guarantordetails/' + id, body);
    };
    EcolService.prototype.updateCollateral = function (id, body) {
        return this.httpClient.put(environment.api + '/api/deptcollateral/' + id, body);
    };
    EcolService.prototype.retrieveGuarantors = function (accnumber) {
        return this.httpClient.get(environment.api + '/api/guarantordetails?filter[where][accnumber]=' + accnumber);
    };
    EcolService.prototype.retrieveCollateral = function (custnumber) {
        return this.httpClient.get(environment.api + '/api/deptcollateral?filter[where][custnumber]=' + custnumber);
    };
    EcolService.prototype.submitCollateral = function (body) {
        return this.httpClient.post(environment.api + '/api/deptcollateral', body);
    };
    EcolService.prototype.retrieve_a_Guarantor = function (id) {
        return this.httpClient.get(environment.api + '/api/guarantordetails?filter[where][id]=' + id);
    };
    EcolService.prototype.global = function (body) {
        return this.httpClient.put(environment.api + '/api/global_letter_settings', body);
    };
    EcolService.prototype.getglobal = function () {
        return this.httpClient.get(environment.api + '/api/global_letter_settings');
    };
    EcolService.prototype.updateLetter = function (body) {
        return this.httpClient.put(environment.api + '/api/settings_letters', body);
    };
    EcolService.prototype.login = function (username) {
        return this.httpClient.get(environment.api + '/api/tblusers/' + username);
    };
    EcolService.prototype.notifications = function () {
        return this.httpClient.get(environment.api + '/api/notifications');
    };
    EcolService.prototype.auth = function (body) {
        return this.httpClient.post(environment.auth, body);
    };
    EcolService.prototype.putuser = function (user) {
        return this.httpClient.put(environment.api + '/api/tblusers', user);
    };
    EcolService.prototype.getuser = function (username) {
        return this.httpClient.get(environment.api + '/api/tblusers?filter[where][username]=' + username);
    };
    EcolService.prototype.getpermissions = function (role_id) {
        return this.httpClient.get(environment.api + '/api/permissionsettings?filter[where][role_id]=' + role_id);
    };
    EcolService.prototype.getaccount = function (accnumber) {
        // return this.httpClient.get<any>(environment.api + '/api/tbl_q_all/' + accnumber);
        return this.httpClient.get(environment.api + '/api/qall/' + accnumber);
    };
    EcolService.prototype.getwatch = function (accnumber) {
        return this.httpClient.get(environment.api + '/api/watch_stage/' + accnumber);
    };
    EcolService.prototype.getfileshistory = function (custnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/uploads?filter[where][custnumber]=' + custnumber + '&filter[order]=stagedate desc');
    };
    EcolService.prototype.getsms = function (cust) {
        return this.httpClient.get(environment.api + '/api/sms?filter[where][custnumber]=' + cust + '&filter[order]=stagedate desc');
    };
    EcolService.prototype.getLetter = function (letter) {
        return this.httpClient.get(environment.api + '/api/demandsettings/' + letter);
    };
    EcolService.prototype.getautoLetter = function () {
        return this.httpClient.get(environment.api + '/api/autoletters');
    };
    EcolService.prototype.getmemo = function () {
        return this.httpClient.get(environment.api + '/api/vmemos');
    };
    EcolService.prototype.putautoLetter = function (letter) {
        return this.httpClient.put(environment.api + '/api/autoletters', letter);
    };
    EcolService.prototype.postcheckautoLetter = function (data) {
        return this.httpClient.post(environment.api + '/api/autoletters/checkduplicate', data);
    };
    EcolService.prototype.postautoLetter = function (letter) {
        return this.httpClient.post(environment.api + '/api/autoletters', letter);
    };
    EcolService.prototype.putLetter = function (letter) {
        return this.httpClient.put(environment.api + '/api/demandsettings', letter);
    };
    EcolService.prototype.postsms = function (body) {
        return this.httpClient.post(environment.api + '/api/sms/', body);
    };
    EcolService.prototype.getdemandSettings = function () {
        return this.httpClient.get(environment.api + '/api/demandsettings');
    };
    EcolService.prototype.getdemandSettingsduplicate = function (letterid, daysinarr, onlyto) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/demandsettings?filter[where][letterid]=' + letterid + '&filter[where][daysinarr]=' + daysinarr + '&filter[where][onlyto]=' + onlyto);
    };
    EcolService.prototype.demandSettings = function (body) {
        return this.httpClient.post(environment.api + '/api/demandsettings', body);
    };
    EcolService.prototype.putdemandSettings = function (body) {
        return this.httpClient.put(environment.api + '/api/demandsettings', body);
    };
    EcolService.prototype.getAccount = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        // return this.httpClient.get<any>(environment.api + '/api/tbl_q_all?filter[include]=guarantors&filter[include]=demandsdues&filter[where][accnumber]=' + accnumber);
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/tqall?filter[include]=guarantors&filter[include]=demandsdues&filter[where][accnumber]=' + accnumber);
    };
    EcolService.prototype.getmcoopcashAccount = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/mcoopcash_stage?filter[include]=mcoopcash_static&filter[where][loanaccnumber]=' + accnumber);
    };
    EcolService.prototype.getcustwithAccount = function (custnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/qall?filter[where][custnumber]=' + custnumber);
    };
    EcolService.prototype.getcardAccount = function (cardacct) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/tcards?filter[where][cardacct]=' + cardacct);
    };
    EcolService.prototype.getWatchcardStatic = function (cardacct) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/cards_watch_static?filter[where][cardacct]=' + cardacct);
    };
    EcolService.prototype.getWatchcardAccount = function (cardacct) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/cards_watch_stage?filter[where][cardacct]=' + cardacct);
    };
    EcolService.prototype.getcardwithid = function (nationid) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/cards_stage?filter[where][nationid]=' + nationid);
    };
    EcolService.prototype.getptps = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/ptps?filter[where][accnumber]=' + accnumber);
    };
    EcolService.prototype.otheraccs = function (custnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/tbl_q_all?filter[where][custnumber]=' + custnumber);
    };
    EcolService.prototype.guarantordetails = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/guarantordetails?filter[where][accnumber]=' + accnumber);
    };
    EcolService.prototype.collaterals = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/collaterals?filter[where][accnumber]=' + accnumber);
    };
    EcolService.prototype.directors = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/directors?filter[where][accnumber]=' + accnumber);
    };
    EcolService.prototype.accwithid = function (nationid) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/tbl_q_all?filter[where][nationid]=' + nationid);
    };
    EcolService.prototype.generateLetter = function (data) {
        return this.httpClient.post(environment.letters_api + data.demand + '/download', data);
    };
    EcolService.prototype.generateLettercc = function (data) {
        return this.httpClient.post(environment.letters_api + data.demand + '/download', data);
    };
    EcolService.prototype.postteles = function (data) {
        return this.httpClient.post(environment.api + '/api/teles', data);
    };
    EcolService.prototype.putteles = function (data) {
        return this.httpClient.put(environment.api + '/api/teles/' + data.id, data);
    };
    EcolService.prototype.putcardwatch = function (data) {
        return this.httpClient.put(environment.api + '/api/cards_watch_static/' + data.cardacct, data);
    };
    EcolService.prototype.putwatch = function (data) {
        return this.httpClient.put(environment.api + '/api/watch_static', data);
    };
    EcolService.prototype.putcustomersuspensions = function (data) {
        return this.httpClient.put(environment.api + '/api/customersuspensions', data);
    };
    EcolService.prototype.getcustomersuspensions = function () {
        return this.httpClient.get(environment.api + '/api/customersuspensions');
    };
    EcolService.prototype.getteles = function (custnumber) {
        return this.httpClient.get(environment.api + '/api/teles?filter[where][custnumber]=' + custnumber);
    };
    EcolService.prototype.getallteles = function (custnumber) {
        return this.httpClient.get(environment.api + '/api/teles/alltele?custnumber=' + custnumber);
    };
    EcolService.prototype.existsteles = function (custnumber, tel, email) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/teles?filter[where][custnumber]=' + custnumber + '&filter[where][telephone]=' + tel + '&filter[where][email]=' + email);
    };
    EcolService.prototype.getsmsmessage = function (demand) {
        return this.httpClient.get(environment.api + '/api/demandsettings/' + demand.toLowerCase());
    };
    EcolService.prototype.sendDemandEmail = function (data) {
        return this.httpClient.post(environment.emailapi, data);
    };
    EcolService.prototype.sendsms = function (data) {
        return this.httpClient.post(environment.api + '/api/sms', data);
    };
    EcolService.prototype.demandshistory = function (data) {
        return this.httpClient.post(environment.api + '/api/demandshistory', data);
    };
    EcolService.prototype.uploads = function (data) {
        console.log('upload data...', data);
        return this.httpClient.post(environment.api + '/api/uploads', data);
    };
    EcolService.prototype.getdemandshistory = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/demandshistory?filter[where][accnumber]=' + accnumber + '&filter[order]=datesent desc');
    };
    EcolService.prototype.demand1history = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/demandshistory?filter[where][accnumber]=' + accnumber + '&filter[where][demand]=Demand1&filter[order]=datesent desc');
    };
    EcolService.prototype.getbranches = function () {
        return this.httpClient.get(environment.api + '/api/branches?filter[order]=branchname asc');
    };
    EcolService.prototype.searchbranch = function (searchtext) {
        return this.httpClient.get(environment.api + '/api/branches/search?searchtext=' + searchtext);
    };
    EcolService.prototype.putbranch = function (branch) {
        return this.httpClient.put(environment.api + '/api/branches', branch);
    };
    EcolService.prototype.guarantorletters = function (data) {
        return this.httpClient.post(environment.api + '/api/guarantorletters', data);
    };
    EcolService.prototype.getperm = function (role) {
        return this.httpClient.get(environment.api + '/api/permissionsettings?filter[where][role_id]=' + role);
    };
    EcolService.prototype.postperm = function (perm) {
        return this.httpClient.put(environment.api + '/api/permissionsettings', perm);
    };
    EcolService.prototype.setpermissions = function (perm) {
        return this.httpClient.post(environment.api + '/api/permissionsettings/setpermission', perm);
    };
    EcolService.prototype.gettotalletters = function (column, value, letter) {
        if (column) {
            // tslint:disable-next-line:max-line-length
            return this.httpClient.get(environment.api + '/api/demandsdue/grouptotal?column=' + column + '&value=' + value);
        }
        else {
            return this.httpClient.get(environment.api + '/api/demandsdue/grouptotal?letter=' + letter);
        }
    };
    EcolService.prototype.downloadFile = function (file) {
        var body = { filename: file };
        return this.httpClient.post(environment.uploadurl + '/filesapi/download', body, {
            responseType: 'blob',
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    };
    EcolService.prototype.logout = function () {
        //  remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accountInfo');
        localStorage.removeItem('userpermission');
        localStorage.removeItem('profile');
    };
    EcolService.prototype.getloggedinusers = function () {
        return this.httpClient.get(environment.api + '/api/tblusers?filter[where][loggedin]=Y');
    };
    EcolService.prototype.totalmcoopcashviewall = function () {
        return this.httpClient.get(environment.api + '/api/mcoopcash_stage/totalviewall');
    };
    EcolService.prototype.totalcardswatch = function () {
        return this.httpClient.get(environment.api + '/api/cards_watch_stage/totalcardswatch');
    };
    EcolService.prototype.totalcreditcardsviewall = function () {
        return this.httpClient.get(environment.api + '/api/tcards/totalviewall');
    };
    EcolService.prototype.totalcreditcardsmyallocation = function (username) {
        return this.httpClient.get(environment.api + '/api/tcards/totalmyallocation?colofficer=' + username);
    };
    EcolService.prototype.totalcreditcardstotalmyworklist = function () {
        return this.httpClient.get(environment.api + '/api/tcards/totalmyworklist');
    };
    EcolService.prototype.totalcardsdue = function () {
        return this.httpClient.get(environment.api + '/api/demandsduecc/total');
    };
    EcolService.prototype.totalmcoopcashmyworklist = function (username) {
        return this.httpClient.get(environment.api + '/api/mcoopcash_stage/totalmyworklist?colofficer=' + username);
    };
    EcolService.prototype.totalmcoopcashmyallocations = function (username) {
        return this.httpClient.get(environment.api + '/api/mcoopcash_stage/totalmyallocations?colofficer=' + username);
    };
    EcolService.prototype.totalcardsclosed = function () {
        return this.httpClient.get(environment.api + '/api/tcards/totalclosed');
    };
    EcolService.prototype.totaldemandsdue = function () {
        return this.httpClient.get(environment.api + '/api/demandsdue/total');
    };
    EcolService.prototype.totaltqall = function () {
        return this.httpClient.get(environment.api + '/api/qall/total');
    };
    EcolService.prototype.totalnotes = function (custnumber) {
        return this.httpClient.get(environment.api + '/api/notehis/total?custnumber=' + custnumber);
    };
    EcolService.prototype.totalguarantors = function (custnumber) {
        return this.httpClient.get(environment.api + '/api/guarantordetails/total?custnumber=' + custnumber);
    };
    EcolService.prototype.totalcontacts = function (custnumber) {
        return this.httpClient.get(environment.api + '/api/teles/total?custnumber=' + custnumber);
    };
    EcolService.prototype.totalcollaterals = function (custnumber) {
        return this.httpClient.get(environment.api + '/api/deptcollateral/total?custnumber=' + custnumber);
    };
    EcolService.prototype.ifLogged = function () {
        if (!localStorage.getItem('currentUser')) {
            swal({ title: 'You\'re Not Logged In',
                imageUrl: "assets/img/user/notlogg.png",
                text: 'Kindly, log in to continue!',
                confirmButtonColor: '#7ac142',
                confirmButtonText: 'Okay' });
            this.router.navigate(['/login']);
            return false;
        }
    };
    EcolService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            Router])
    ], EcolService);
    return EcolService;
}());
export { EcolService };
//# sourceMappingURL=ecol.service.js.map