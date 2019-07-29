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
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { NgxSpinnerService } from 'ngx-spinner';
var URL = environment.valor;
var DemandLettersComponent = /** @class */ (function () {
    function DemandLettersComponent(settings, route, ecolService, spinner) {
        var _this = this;
        this.settings = settings;
        this.route = route;
        this.ecolService = ecolService;
        this.spinner = spinner;
        this.clipText = '';
        this.teles = [];
        this.emails = [];
        this.addresses = [];
        this.postcodes = [];
        this.model = {};
        this.bodyletter = {};
        this.letterbody = {};
        // tslint:disable-next-line:max-line-length
        this.itemsDemands = ['overduecc', 'prelistingcc', 'suspension', 'Demand1', 'Demand2', 'Prelisting', 'PostlistingSecured', 'PostlistingUnsecured', 'PostlistingUnsecuredcc', 'Day90', 'Day40', 'Day30', 'prelistingremedial'];
        this.uploader = new FileUploader({ url: URL });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        //
        this.uploader.onBuildItemForm = function (item, form) {
            form.append('demand', _this.model.demand);
            form.append('accnumber', _this.accnumber);
            form.append('owner', _this.username);
            form.append('custnumber', _this.custnumber);
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            //
        };
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            // success
            var obj = JSON.parse(response);
            for (var i = 0; i < obj.files.length; i++) {
                var bulk = {
                    'accnumber': _this.accnumber,
                    'custnumber': _this.custnumber,
                    'address': 'none',
                    'email': 'none',
                    'telnumber': 'none',
                    'filepath': obj.files[i].path,
                    'filename': obj.files[i].originalname,
                    'datesent': new Date(),
                    'owner': _this.username,
                    'byemail': false,
                    'byphysical': true,
                    'bypost': true,
                    'demand': _this.model.demand
                };
                _this.ecolService.demandshistory(bulk).subscribe(function (resp) {
                    _this.getdemandshistory(_this.accnumber);
                    swal('Good!', 'Demand letter uploaded successfully!', 'success');
                }, function (error) {
                    swal('Oooops!', 'Demand letter uploaded but unable to add to demands history!', 'warning');
                });
            }
        };
        this.uploader.onErrorItem = function (item, response, status, headers) {
            // error server response
        };
    }
    DemandLettersComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    DemandLettersComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    DemandLettersComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.accnumber = queryParams.get('accnumber');
        });
        /*this.username = this.route.snapshot.queryParamMap.get('username');
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
        // get account details
        if (this.sys === 'cc') {
            this.getcard(this.accnumber);
        }
        else {
            this.getaccount(this.accnumber);
        }
        this.getdemandshistory(this.accnumber);
        this.getteles(this.custnumber);
    };
    DemandLettersComponent.prototype.getteles = function (cust) {
        var _this = this;
        this.ecolService.getteles(cust).subscribe(function (data_teles) {
            _this.teles = data_teles;
            _this.emails = data_teles;
            _this.postcodes = data_teles;
            _this.addresses = data_teles;
        });
    };
    DemandLettersComponent.prototype.getaccount = function (accnumber) {
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
    DemandLettersComponent.prototype.getcard = function (cardacct) {
        var _this = this;
        this.ecolService.getcardAccount(cardacct).subscribe(function (data) {
            _this.accountdetails = data[0];
            _this.model.accnumber = data[0].cardacct;
            _this.model.custnumber = data[0].cardacct;
            _this.model.addressline1 = data[0].address;
            _this.model.postcode = data[0].rpcode;
            _this.model.emailaddress = data[0].email;
            _this.model.celnumber = data[0].mobile;
        });
    };
    DemandLettersComponent.prototype.getdemandshistory = function (accnumber) {
        var _this = this;
        // console.log('getdemandshistory called ...');
        this.ecolService.getdemandshistory(accnumber).subscribe(function (data) {
            _this.demands = data;
        });
    };
    DemandLettersComponent.prototype.generate_choose = function () {
        if (this.sys === 'cc') {
            this.generatecc();
        }
        else {
            this.generate();
        }
    };
    DemandLettersComponent.prototype.generate = function () {
        this.ecolService.loader();
        this.processletter(this.model, this.model.accnumber, this.model.emailaddress);
        this.getdemandshistory(this.accnumber);
    };
    DemandLettersComponent.prototype.generatecc = function () {
        this.ecolService.loader();
        this.processlettercc(this.model.demand, this.model.accnumber, this.model.emailaddress);
        this.getdemandshistory(this.accnumber);
    };
    DemandLettersComponent.prototype.openletter_choose = function (inletter) {
        if (this.sys === 'cc') {
            this.openlettercc(inletter);
        }
        else {
            this.openletter(inletter);
        }
    };
    DemandLettersComponent.prototype.openletter = function (letter) {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.ecolService.loader();
        this.ecolService.getAccount(this.accnumber).subscribe(function (data) {
            // if account is there
            if (data && data.length > 0) {
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
    DemandLettersComponent.prototype.openlettercc = function (letter) {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.ecolService.loader();
        this.ecolService.getcardAccount(this.accnumber).subscribe(function (carddata) {
            // if cardacct
            if (carddata && carddata.length > 0) {
                _this.letterbody.demand = letter.demand,
                    _this.letterbody.showlogo = letter.showlogo,
                    _this.letterbody.format = letter.format,
                    _this.letterbody.cardacct = _this.accnumber,
                    _this.letterbody.cardnumber = carddata[0].cardnumber,
                    _this.letterbody.cardname = carddata[0].cardname,
                    _this.letterbody.address = letter.addressline1,
                    _this.letterbody.rpcode = letter.postcode,
                    _this.letterbody.city = letter.city,
                    _this.letterbody.EXP_PMNT = carddata[0].exppmnt,
                    _this.letterbody.OUT_BALANCE = carddata[0].outbalance,
                    _this.letterbody.demand1date = new Date();
                // console.log(body);
                // call generate letter api
                _this.ecolService.generateLetter(_this.letterbody).subscribe(function (data) {
                    // sucess
                    if (data.result === 'success') {
                        swal('Good!', data.message, 'success');
                        _this.downloadDemand(data.message, data.filename);
                    }
                    else {
                        swal('Error!', 'Error occured during letter generation!', 'error');
                    }
                    //
                }, function (error) {
                    console.log('error==>', error);
                    swal('Error!', 'Error occured during letter generation!', 'error');
                });
            }
            else {
                swal('None!', letter.accnumber + ' not found!', 'warning');
            }
        }, function (error) {
            //
            console.log(error);
            swal('Error!', 'account info missing!', 'error');
        });
    };
    DemandLettersComponent.prototype.processletter = function (letter, accnumber, emailaddress) {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
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
                    // console.log(this.bodyletter);
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
    DemandLettersComponent.prototype.generateletter = function (letter, emaildata) {
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
    DemandLettersComponent.prototype.processlettercc = function (demand, cardacct, emailaddress) {
        var _this = this;
        this.ecolService.getcardAccount(cardacct).subscribe(function (data) {
            if (data.length > 0) {
                var letter = {
                    demand: demand.toLowerCase(),
                    cardacct: data[0].cardacct,
                    cardname: data[0].cardname,
                    showlogo: true,
                    format: 'pdf',
                    address: _this.model.addressline1,
                    postcode: _this.model.postcode,
                    exp_pmnt: data[0].exppmnt,
                    out_balance: data[0].exppmnt,
                    manager: 'ROSE KARAMBU'
                };
                var emaildata = {
                    name: data[0].cardname,
                    email: emailaddress,
                    title: demand,
                    branchemail: 'Contact Centre Team <ContactCentreTeam@co-opbank.co.ke>'
                };
                // generate letter
                _this.generatelettercc(letter, emaildata);
            }
            else {
                swal('None!', cardacct + ' not found!', 'warning');
            }
        }, function (error) {
            console.log(error);
            swal('Error!', 'exception occured!', 'error');
        });
    };
    DemandLettersComponent.prototype.generatelettercc = function (letter, emaildata) {
        var _this = this;
        this.ecolService.generateLettercc(letter).subscribe(function (dataupload) {
            // sucess
            if (dataupload.result === 'success') {
                swal('Good!', dataupload.message, 'success');
                // save to history
                var bulk = {
                    'accnumber': _this.model.accnumber,
                    'custnumber': _this.model.accnumber,
                    'address': _this.model.addressline1,
                    'email': _this.model.email,
                    'telnumber': _this.model.telnumber,
                    'filepath': dataupload.message,
                    'filename': dataupload.filename,
                    'datesent': new Date(),
                    'owner': _this.username,
                    'byemail': _this.model.emailaddress,
                    'byphysical': _this.model.sendphysical,
                    'bypost': _this.model.sendpostal,
                    'demand': letter.demand
                };
                _this.demandshistory(bulk);
                _this.getdemandshistory(_this.accnumber);
                // this.downloadDemand(letter.message, dataupload.filename);
            }
            else {
                swal('Error!', 'Error occured during letter generation!', 'error');
            }
            // send email
            // add file full path
            emaildata.file = dataupload.message;
            _this.ecolService.sendDemandEmail(emaildata).subscribe(function (response) {
                // console.log(response);
                if (response.result === 'fail') {
                    swal('Error!', 'Letter NOT sent on email!', 'error');
                }
                else {
                    swal('Success!', 'Letter sent on email!', 'success');
                }
            });
            // send sms
            // get message
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
                    'custnumber': _this.model.accnumber,
                    'telnumber': _this.model.telnumber,
                    'owner': _this.username,
                    'message': _this.smsMessage,
                };
                _this.sendsms(smsdata);
            }, function (error) {
                console.log(error);
            });
        }, function (error) {
            console.log(error);
            swal('Error!', 'Error sending to email!', 'error');
        });
    };
    DemandLettersComponent.prototype.sendsms = function (smsdata) {
        console.log('sendsms==data==', smsdata);
        this.ecolService.sendsms(smsdata).subscribe(function (result) {
            swal('Successful!', 'Demand letter SMS sent!', 'success');
        }, function (error) {
            console.log(error);
            swal('Error!', 'Error occurred during sending email!', 'error');
        });
    };
    DemandLettersComponent.prototype.demandshistory = function (body) {
        var _this = this;
        console.log('demandshistory', body);
        this.ecolService.demandshistory(body).subscribe(function (data) {
            console.log('saved demandshistory==', data);
            _this.getdemandshistory(_this.accnumber);
        });
    };
    DemandLettersComponent.prototype.guarantorletter = function (body) {
        this.ecolService.guarantorletters(body).subscribe(function (data) { });
    };
    DemandLettersComponent.prototype.sms = function (body) {
        this.ecolService.guarantorletters(body).subscribe(function (data) { });
    };
    DemandLettersComponent.prototype.downloadFile = function (filepath, filename) {
        this.ecolService.downloadFile(filepath).subscribe(function (data) {
            saveAs(data, filename);
        }, function (error) {
            console.log(error.error);
            swal('Error!', ' Cannot download  file!', 'error');
        });
    };
    DemandLettersComponent.prototype.downloadDemand = function (filepath, filename) {
        this.ecolService.downloadFile(filepath).subscribe(function (data) {
            saveAs(data, filename);
        }, function (error) {
            console.log(error.error);
            swal('Error!', ' Cannot download  file!', 'error');
        });
    };
    DemandLettersComponent.prototype.resend = function (filepath) {
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
    DemandLettersComponent.prototype.savecontacts = function (model) {
        var _this = this;
        this.spinner.show();
        // save contact
        this.ecolService.existsteles(this.custnumber, model.celnumber, model.emailaddress).subscribe(function (contact) {
            if (contact.length > 0) {
                swal('Warning!', 'Contact already exists', 'info');
                _this.spinner.hide();
            }
            else {
                // save
                var telesbody = {
                    custnumber: _this.custnumber,
                    telephone: model.celnumber,
                    email: model.emailaddress,
                    active: 'Yes',
                    owner: _this.username,
                    updatedby: _this.username,
                    updatedlast: new Date(),
                    address: model.addressline1,
                    postcode: model.postcode
                };
                _this.ecolService.postteles(telesbody).subscribe(function (teles) {
                    _this.spinner.hide();
                    _this.getteles(_this.custnumber);
                    swal('Good!', 'Contact has been added', 'success');
                });
            }
        }, function (error) {
            console.log('error-existsteles', error);
            _this.spinner.hide();
            swal('Ooops!', 'Something went wrong', 'error');
        });
    };
    DemandLettersComponent = __decorate([
        Component({
            selector: 'app-demandletters',
            templateUrl: './demandletters.component.html',
            styleUrls: ['./demandletters.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService,
            ActivatedRoute,
            EcolService,
            NgxSpinnerService])
    ], DemandLettersComponent);
    return DemandLettersComponent;
}());
export { DemandLettersComponent };
//# sourceMappingURL=demandletters.component.js.map