var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import { DataService } from '../../../services/data.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
var URL = environment.valor;
var ActivityLogComponent = /** @class */ (function () {
    function ActivityLogComponent(settings, route, ecolService, dataService) {
        var _this = this;
        this.settings = settings;
        this.route = route;
        this.ecolService = ecolService;
        this.dataService = dataService;
        this.model = {};
        this.bodyletter = {};
        this.date = new Date();
        this.collateralmenu = true;
        this.guarantorsmenu = true;
        this.demandlettersmenu = true;
        this.files = [];
        this.ptps = [];
        // itemsDemands: Array<string> = ['Demand1', 'Demand2', 'Prelisting', 'PostlistingSecured', 'PostlistingUnsecured', 'Day90', 'Day40'];
        this.uploader = new FileUploader({ url: URL });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        // test service
        dataService.getPtpsData().subscribe(function (data) {
            _this.ptp = data;
        });
        dataService.getNotesData().subscribe(function (data) {
            _this.notes = data;
        });
        dataService.getCollateral().subscribe(function (data) {
            _this.totalcollaterals = data;
        });
        dataService.getContacts().subscribe(function (data) {
            _this.totalcontacts = data;
        });
        dataService.getGuarantors().subscribe(function (data) {
            _this.totalguarantors = data;
        });
        dataService.getFiles().subscribe(function (data) {
            _this.totalfiles = data;
        });
        //
        this.uploader.onBuildItemForm = function (item, form) {
            form.append('demand', _this.model.demand);
            form.append('accnumber', _this.accnumber);
            form.append('owner', _this.username);
            form.append('custnumber', _this.custnumber);
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            // console.log('ImageUpload:uploaded:', item, status);
            // refresh demad history notes
            _this.getdemandshistory(_this.accnumber);
        };
    }
    ActivityLogComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    ActivityLogComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    ActivityLogComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.accnumber = queryParams.get('accnumber');
        });
        /* this.username = this.route.snapshot.queryParamMap.get('username');
        this.route.queryParamMap.subscribe(queryParams => {
          this.username = queryParams.get('username');
        });*/
        this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.custnumber = queryParams.get('custnumber');
        });
        this.sys = this.route.snapshot.queryParamMap.get('sys');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.sys = queryParams.get('sys');
        });
        // this.data.currentMessage.subscribe(message => this.message = message)
        // get account details
        if (this.sys === 'cc') {
            this.getcard(this.accnumber);
            this.collateralmenu = false;
            this.guarantorsmenu = false;
        }
        else if (this.sys === 'watchcc') {
            this.getwatchcard(this.accnumber);
            this.collateralmenu = false;
            this.guarantorsmenu = false;
            this.demandlettersmenu = false;
        }
        else if (this.sys === 'mcoopcash') {
            this.getmcoopcashaccount(this.accnumber);
            this.collateralmenu = false;
            this.guarantorsmenu = false;
            this.demandlettersmenu = false;
        }
        else if (this.sys === 'watch') {
            this.getwatch(this.accnumber);
            this.collateralmenu = false;
            this.guarantorsmenu = true;
            this.demandlettersmenu = false;
        }
        else {
            this.getaccount(this.accnumber);
        }
        this.getdemandshistory(this.accnumber);
        // get files
        this.getfileshistory(this.custnumber);
        //pts
        this.getPtps(this.custnumber);
        // notes
        this.getNotes(this.custnumber);
        // notes
        this.getCollateral(this.custnumber);
        // notes
        this.getContacts(this.custnumber);
        // notes
        this.getGuarantors(this.custnumber);
    };
    // getPtps(custnumber) {
    //   this.ecolService.ptps(custnumber).subscribe(data =>
    //   throw new Error("Method not implemented."});
    // }
    ActivityLogComponent.prototype.getPtps = function (custnumber) {
        var _this = this;
        this.ecolService.getptps(custnumber).subscribe(function (data) {
            _this.ptp = data;
            _this.ptp = data.length;
        });
    };
    ActivityLogComponent.prototype.getcard = function (cardacct) {
        var _this = this;
        this.ecolService.getcardAccount(cardacct).subscribe(function (data) {
            _this.accountdetails = data[0];
            _this.model.accnumber = data[0].cardacct;
            _this.model.custnumber = data[0].cardacct;
            _this.model.addressline1 = data[0].address;
            _this.model.postcode = data[0].rpcode;
            _this.model.emailaddress = data[0].emailaddress;
            _this.model.celnumber = data[0].celnumber;
        });
    };
    //copy
    ActivityLogComponent.prototype.copyToClipboard = function (element) {
        element.select();
        document.execCommand('copy');
    };
    //end of copy
    ActivityLogComponent.prototype.getwatchcard = function (cardacct) {
        var _this = this;
        this.ecolService.getWatchcardAccount(cardacct).subscribe(function (data) {
            _this.accountdetails = data[0];
            _this.model.accnumber = data[0].cardacct;
            _this.model.custnumber = data[0].cardacct;
            _this.model.addressline1 = data[0].address;
            _this.model.postcode = data[0].rpcode;
            _this.model.emailaddress = data[0].emailaddress;
            _this.model.celnumber = data[0].celnumber;
        }, function (error) {
            //
        });
    };
    ActivityLogComponent.prototype.getNotes = function (custnumber) {
        var _this = this;
        this.ecolService.totalnotes(custnumber).subscribe(function (data) {
            _this.notes = data[0].TOTAL;
        });
    };
    ActivityLogComponent.prototype.getfileshistory = function (custnumber) {
        var _this = this;
        this.ecolService.getfileshistory(custnumber).subscribe(function (data) {
            _this.files = data;
            _this.ptps = data.length;
        });
    };
    ActivityLogComponent.prototype.getGuarantors = function (custnumber) {
        var _this = this;
        this.ecolService.totalguarantors(custnumber).subscribe(function (data) {
            _this.totalguarantors = data[0].TOTAL;
        });
    };
    ActivityLogComponent.prototype.getContacts = function (custnumber) {
        var _this = this;
        this.ecolService.totalcontacts(custnumber).subscribe(function (data) {
            _this.totalcontacts = data[0].TOTAL;
        });
    };
    ActivityLogComponent.prototype.getCollateral = function (custnumber) {
        var _this = this;
        this.ecolService.totalcollaterals(custnumber).subscribe(function (data) {
            _this.totalcollaterals = data[0].TOTAL;
        });
    };
    ActivityLogComponent.prototype.getaccount = function (accnumber) {
        var _this = this;
        this.ecolService.getAccount(accnumber).subscribe(function (data) {
            _this.accountdetails = data[0];
            _this.guarantors = data[0].guarantors;
            _this.model.accnumber = data[0].accnumber;
            _this.model.custnumber = data[0].custnumber;
            _this.model.addressline1 = data[0].addressline1;
            _this.model.postcode = data[0].postcode;
            _this.model.emailaddress = data[0].emailaddress;
            _this.model.celnumber = data[0].celnumber;
        });
    };
    ActivityLogComponent.prototype.getmcoopcashaccount = function (accnumber) {
        var _this = this;
        this.ecolService.getmcoopcashAccount(accnumber).subscribe(function (data) {
            _this.accountdetails = data[0];
            _this.model.accnumber = data[0].loanaccnumber;
            _this.model.custnumber = data[0].loanaccnumber;
            _this.model.addressline1 = data[0].address;
            _this.model.postcode = data[0].postcode;
            _this.model.celnumber = data[0].phonenumber;
        });
    };
    ActivityLogComponent.prototype.getwatch = function (accnumber) {
        var _this = this;
        this.ecolService.getwatch(accnumber).subscribe(function (data) {
            _this.accountdetails = data;
            _this.guarantors = data.guarantors;
            _this.model.accnumber = data.accnumber;
            _this.model.custnumber = data.custnumber;
            _this.model.addressline1 = data.addressline1;
            _this.model.postcode = data.postcode;
            _this.model.emailaddress = data.emailaddress;
            _this.model.celnumber = data.celnumber;
        });
    };
    ActivityLogComponent.prototype.getdemandshistory = function (accnumber) {
        var _this = this;
        this.ecolService.getdemandshistory(accnumber).subscribe(function (data) {
            _this.demands = data;
        });
    };
    ActivityLogComponent.prototype.generate = function () {
        this.ecolService.loader();
        this.processletter(this.model, this.model.accnumber, this.model.emailaddress);
        this.getdemandshistory(this.accnumber);
    };
    ActivityLogComponent.prototype.openletter = function (letter) {
        var _this = this;
        // console.log('letter==>', letter);
        this.ecolService.loader();
        this.ecolService.getAccount(this.accnumber).subscribe(function (data) {
            // if account is there
            if (data && data.length > 0) {
                // console.log('getAccount=>', data);
                _this.bodyletter.demand = letter.demand;
                _this.bodyletter.showlogo = letter.showlogo;
                _this.bodyletter.format = letter.format;
                _this.bodyletter.cust = data[0].custnumber;
                _this.bodyletter.acc = data[0].accnumber;
                _this.bodyletter.custname = data[0].client_name;
                _this.bodyletter.address = letter.addressline1;
                _this.bodyletter.postcode = letter.postcode;
                _this.bodyletter.arocode = data[0].arocode;
                _this.bodyletter.branchname = data[0].branchname;
                _this.bodyletter.branchcode = data[0].branchcode;
                _this.bodyletter.manager = data[0].manager;
                _this.bodyletter.ccy = data[0].currency;
                _this.bodyletter.demand1date = null;
                _this.bodyletter.guarantors = data[0].guarantors;
                // Get all cust accounts
                _this.ecolService.getcustwithAccount(data[0].custnumber).subscribe(function (accounts) {
                    // add accounts to the array
                    // console.log('accounts=>', accounts);
                    _this.bodyletter.accounts = accounts;
                    // get demand1 date
                    _this.ecolService.demand1history(_this.accnumber).subscribe(function (dd1date) {
                        if (dd1date && dd1date.length > 0) {
                            _this.bodyletter.demand1date = dd1date[0].datesent;
                        }
                        // call generate letter api
                        _this.ecolService.generateLetter(_this.bodyletter).subscribe(function (generateletterdata) {
                            // sucess
                            if (generateletterdata.result === 'success') {
                                swal('Good!', generateletterdata.message, 'success');
                                _this.downloadDemand(generateletterdata.message, generateletterdata.filename);
                            }
                            else {
                                swal('Error!', 'Error occured during letter generation!', 'error');
                            }
                            //
                        }, function (error) {
                            console.log('error==>', error);
                            swal('Error!', 'Error occured during letter generation!', 'error');
                        });
                    }, function (error) {
                        console.log('demand1history==>', error);
                        swal('Error!', 'Error generating previous demand date!', 'error');
                    });
                }, function (error) {
                    console.log('error==>', error);
                    swal('Error!', 'unable to retrieve customer accounts!', 'error');
                });
            }
            else {
                swal('None!', letter.accnumber + ' not found!', 'warning');
            }
        }, function (error) {
            console.log('error==>', error);
            swal('Error!', 'account info missing!', 'error');
        });
    };
    ActivityLogComponent.prototype.processletter = function (letter, accnumber, emailaddress) {
        var _this = this;
        this.ecolService.getAccount(accnumber).subscribe(function (data) {
            if (data && data.length > 0) {
                // console.log('getAccount=>', data);
                _this.bodyletter.demand = letter.demand;
                _this.bodyletter.showlogo = letter.showlogo;
                _this.bodyletter.format = letter.format;
                _this.bodyletter.cust = data[0].custnumber;
                _this.bodyletter.acc = data[0].accnumber;
                _this.bodyletter.custname = data[0].client_name;
                _this.bodyletter.address = letter.addressline1;
                _this.bodyletter.postcode = letter.postcode;
                _this.bodyletter.arocode = data[0].arocode;
                _this.bodyletter.branchname = data[0].branchname;
                _this.bodyletter.branchcode = data[0].branchcode;
                _this.bodyletter.manager = data[0].manager;
                _this.bodyletter.ccy = data[0].currency;
                _this.bodyletter.demand1date = new Date();
                _this.bodyletter.guarantors = data[0].guarantors;
                // Get all cust accounts
                _this.ecolService.getcustwithAccount(data[0].custnumber).subscribe(function (accounts) {
                    // add accounts to the array
                    _this.bodyletter.accounts = accounts;
                    var emaildata = {
                        name: data[0].client_name,
                        email: emailaddress,
                        title: letter.demand
                    };
                    // generate letter
                    _this.generateletter(_this.bodyletter, emaildata);
                }, function (error) {
                    console.log('error==>', error);
                    swal('Error!', 'unable to retrieve customer accounts!', 'error');
                });
            }
            else {
                swal('None!', letter.accnumber + ' not found!', 'warning');
            }
        }, function (error) {
            console.log(error);
            swal('Error!', 'exception occured!', 'error');
        });
    };
    ActivityLogComponent.prototype.generateletter = function (letter, emaildata) {
        var _this = this;
        this.ecolService.generateLetter(letter).subscribe(function (uploaddata) {
            if (uploaddata.result === 'success') {
                //
                swal('Success!', 'Letter generated!', 'success');
                // save to history
                var bulk = {
                    'accnumber': _this.model.accnumber,
                    'custnumber': _this.model.custnumber,
                    'address': _this.model.addressline1,
                    'email': _this.model.email,
                    'telnumber': _this.model.telnumber,
                    'filepath': uploaddata.message,
                    'filename': uploaddata.filename,
                    'datesent': new Date(),
                    'owner': _this.username,
                    'byemail': _this.model.sendemail,
                    'byphysical': _this.model.sendphysical,
                    'bypost': _this.model.sendpostal,
                    'demand': letter.demand
                };
                //
                _this.demandshistory(bulk);
                // send email
                // add file full path
                emaildata.file = uploaddata.filepath;
                // send sms
                _this.ecolService.getsmsmessage(letter.demand).subscribe(function (result) {
                    if (result && result.length > 0) {
                        _this.smsMessage = result[0].message;
                    }
                    else {
                        // tslint:disable-next-line:max-line-length
                        _this.smsMessage = 'Dear Customer, We have sent a Loan Repayment  Demand  Notice to your address. To enquire call  0711049000';
                    }
                    var smsdata = {
                        'demand': letter.demand,
                        'custnumber': _this.model.custnumber,
                        'telnumber': _this.model.telnumber,
                        'owner': _this.username,
                        'message': _this.smsMessage,
                    };
                    _this.sendsms(smsdata);
                }, function (error) {
                    console.log(error);
                });
            }
            else {
                // error in letter generation
                swal('Error!', 'Error generating letter!', 'error');
            }
        }, function (error) {
            console.log(error);
            swal('Error!', 'Cannot generate letter!', 'error');
        });
    }; // end generateletter
    /*sendemail(emaildata) {
      this.ecolService.sendDemandEmail(emaildata).subscribe(data => {
        if (data.result === 'success') {
          swal('Successful!', 'Letter sent on email!', 'success');
        } else {
          swal('Error!', 'Error occurred during sending email!', 'error');
        }
      }, error => {
        console.log(error);
        swal('Error!', 'Error occurred during sending email!', 'error');
      });
    }*/
    ActivityLogComponent.prototype.sendsms = function (smsdata) {
        this.ecolService.sendsms(smsdata).subscribe(function (result) {
            swal('Successful!', 'Demand letter SMS sent!', 'success');
        }, function (error) {
            console.log(error);
            swal('Error!', 'Error occurred during sending email!', 'error');
        });
    };
    ActivityLogComponent.prototype.demandshistory = function (body) {
        var _this = this;
        this.ecolService.demandshistory(body).subscribe(function (data) {
            _this.getdemandshistory(_this.accnumber);
        });
    };
    ActivityLogComponent.prototype.guarantorletter = function (body) {
        this.ecolService.guarantorletters(body).subscribe(function (data) { });
    };
    ActivityLogComponent.prototype.sms = function (body) {
        this.ecolService.guarantorletters(body).subscribe(function (data) { });
    };
    ActivityLogComponent.prototype.downloadFile = function (filepath) {
        this.ecolService.downloadFile(filepath).subscribe(function (data) {
            saveAs(data, 'filename');
        }, function (error) {
            console.log(error.error);
            swal('Error!', ' Cannot download  file!', 'error');
        });
    };
    ActivityLogComponent.prototype.downloadDemand = function (filepath, filename) {
        this.ecolService.downloadFile(filepath).subscribe(function (data) {
            saveAs(data, filename);
        }, function (error) {
            console.log(error.error);
            swal('Error!', ' Cannot download  file!', 'error');
        });
    };
    ActivityLogComponent.prototype.resend = function (filepath) {
        swal({
            title: 'confirm email address',
            input: 'text',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Send Email',
            showLoaderOnConfirm: true,
            preConfirm: function (email) { },
            allowOutsideClick: function () { return !swal.isLoading(); }
        }).then(function (result) {
            if (result.value) {
                swal('Sent!', 'Email has been sent', 'success');
            }
        });
    };
    ActivityLogComponent = __decorate([
        Component({
            selector: 'app-activitylog',
            templateUrl: './activitylog.component.html',
            styleUrls: ['./activitylog.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService,
            ActivatedRoute,
            EcolService,
            DataService])
    ], ActivityLogComponent);
    return ActivityLogComponent;
}());
export { ActivityLogComponent };
//# sourceMappingURL=activitylog.component.js.map