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
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { NgxSpinnerService } from 'ngx-spinner';
var URL = environment.valor;
var SendLetterComponent = /** @class */ (function () {
    function SendLetterComponent(settings, toasterService, route, spinner, ecolService) {
        var _this = this;
        this.settings = settings;
        this.toasterService = toasterService;
        this.route = route;
        this.spinner = spinner;
        this.ecolService = ecolService;
        this.guarantors = [];
        this.teles = [];
        this.emails = [];
        this.addresses = [];
        this.postcodes = [];
        this.guarantoremails = '';
        this.model = {};
        this.bodyletter = {};
        this.emaildata = {};
        // tslint:disable-next-line:max-line-length
        this.itemsDemands = ['Demand1', 'Demand2', 'Prelisting', 'PostlistingSecured', 'PostlistingUnsecured', 'Day90', 'Day40', 'Day30', 'prelistingremedial'];
        this.uploader = new FileUploader({ url: URL });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        this.config = new ToasterConfig({
            showCloseButton: true,
            tapToDismiss: false,
            positionClass: 'toast-top-right',
            animation: 'fade'
        });
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
                // use file on email
                _this.uploadedfilepath = obj.files[i].path;
                _this.ecolService.demandshistory(bulk).subscribe(function (datar) {
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
    SendLetterComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    SendLetterComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    SendLetterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.accnumber = queryParams.get('accnumber');
        });
        this.username = this.route.snapshot.queryParamMap.get('username');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.username = queryParams.get('username');
        });
        this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.custnumber = queryParams.get('custnumber');
        });
        // get account details
        this.getaccount(this.accnumber);
        this.getdemandshistory(this.accnumber);
        this.getteles(this.custnumber);
    };
    SendLetterComponent.prototype.getteles = function (cust) {
        var _this = this;
        this.ecolService.getteles(cust).subscribe(function (data_teles) {
            _this.teles = data_teles;
            _this.emails = data_teles;
            _this.postcodes = data_teles;
            _this.addresses = data_teles;
        });
    };
    SendLetterComponent.prototype.getaccount = function (accnumber) {
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
            _this.section = data[0].section;
            if (_this.guarantors || _this.guarantors.length > 0) {
                // loop
                for (var i = 0; i < _this.guarantors.length; i++) {
                    _this.guarantoremails += _this.guarantors[i].email + ',';
                }
            }
        });
    };
    SendLetterComponent.prototype.getdemandshistory = function (accnumber) {
        var _this = this;
        this.ecolService.getdemandshistory(accnumber).subscribe(function (data) {
            _this.demands = data;
        });
    };
    SendLetterComponent.prototype.generate = function () {
        this.ecolService.loader();
        this.processletter(this.model, this.model.accnumber, this.model.emailaddress);
        this.getdemandshistory(this.accnumber);
    };
    SendLetterComponent.prototype.popsuccessToast = function (msg) {
        this.toasterService.pop('success', 'Success', msg);
    };
    SendLetterComponent.prototype.poperrorToast = function (error) {
        this.toasterService.pop('error', 'Error', error);
    };
    SendLetterComponent.prototype.popinfoToast = function (info) {
        this.toasterService.pop('info', 'Info', info);
    };
    SendLetterComponent.prototype.openletter = function (letter) {
        var _this = this;
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
                _this.bodyletter.guarantors = data[0].guarantors || [];
                _this.bodyletter.settleaccno = data[0].settleaccno || '00000000000000';
                _this.bodyletter.section = _this.section;
                _this.bodyletter.kbbr = data[0].kbbr;
                _this.bodyletter.instamount = data[0].instamount;
                _this.bodyletter.oustbalance = data[0].oustbalance;
                _this.bodyletter.currency = data[0].currency;
                //
                _this.ecolService.getcustwithAccount(data[0].custnumber).subscribe(function (inaccounts) {
                    // console.log(inaccounts);
                    _this.bodyletter.accounts = inaccounts;
                    // get demand1 date
                    console.log(_this.bodyletter);
                    _this.ecolService.demand1history(_this.accnumber).subscribe(function (dd1date) {
                        if (dd1date && dd1date.length > 0) {
                            _this.bodyletter.demand1date = dd1date[0].datesent;
                        }
                        // call generate letter api
                        _this.ecolService.generateLetter(_this.bodyletter).subscribe(function (generateletterdata) {
                            // sucess
                            if (generateletterdata.result === 'success') {
                                // swal('Good!', generateletterdata.message, 'success');
                                swal.close();
                                _this.popsuccessToast('Letter ready for preview');
                                _this.downloadDemand(generateletterdata.message, generateletterdata.filename);
                            }
                            else {
                                swal.close();
                                // swal('Error!', 'Error occured during letter generation!', 'error');
                                _this.poperrorToast('Error occured during letter generation!');
                            }
                            //
                        }, function (error) {
                            console.log('error==>', error);
                            swal.close();
                            _this.poperrorToast('Error occured during letter generation!');
                        });
                    }, function (error) {
                        console.log('demand1history==>', error);
                        swal.close();
                        _this.poperrorToast('Error generating previous demand date!');
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
    SendLetterComponent.prototype.processletter = function (letter, accnumber, emailaddress) {
        var _this = this;
        this.ecolService.getAccount(accnumber).subscribe(function (data) {
            if (data && data.length > 0) {
                _this.bodyletter.demand = letter.demand;
                _this.bodyletter.showlogo = true;
                _this.bodyletter.format = 'pdf';
                _this.bodyletter.cust = data[0].custnumber;
                _this.bodyletter.acc = data[0].accnumber;
                _this.bodyletter.custname = data[0].client_name;
                _this.bodyletter.address = letter.addressline1;
                _this.bodyletter.postcode = letter.postcode;
                _this.bodyletter.arocode = data[0].arocode;
                _this.bodyletter.branchname = data[0].branchname;
                _this.bodyletter.branchcode = data[0].branchcode;
                _this.bodyletter.manager = data[0].manager;
                _this.bodyletter.branchemail = data[0].branchemail || 'Collection Support <collectionssupport@co-opbank.co.ke>';
                _this.bodyletter.ccy = data[0].currency;
                _this.bodyletter.demand1date = new Date();
                _this.bodyletter.guarantors = data[0].guarantors;
                _this.bodyletter.settleaccno = data[0].settleaccno || '00000000000000';
                _this.bodyletter.section = _this.section;
                _this.bodyletter.kbbr = data[0].kbbr;
                _this.bodyletter.instamount = data[0].instamount;
                _this.bodyletter.oustbalance = data[0].oustbalance;
                _this.bodyletter.currency = data[0].currency;
                // Get all cust accounts
                _this.ecolService.getcustwithAccount(data[0].custnumber).subscribe(function (accounts) {
                    _this.bodyletter.accounts = accounts;
                    _this.emaildata = {
                        name: data[0].client_name,
                        email: emailaddress,
                        branchemail: _this.bodyletter.branchemail || 'Collection Support <collectionssupport@co-opbank.co.ke>',
                        title: letter.demand,
                        guarantor: _this.bodyletter.guarantors || 0
                    };
                    // console.log('emaildata...', this.emaildata);
                    // generate letter
                    _this.generateletter(_this.bodyletter);
                }, function (error) {
                    console.log('getcustwithAccount error==>', error);
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
    SendLetterComponent.prototype.generateletter = function (letter) {
        var _this = this;
        swal.close();
        this.popinfoToast('Letter Queued to be sent');
        this.ecolService.generateLetter(letter).subscribe(function (uploaddata) {
            if (uploaddata.result === 'success') {
                //
                // swal('Success!', 'Letter generated!', 'success');
                _this.popsuccessToast('Letter generated and queued to be sent');
                // save to history
                var bulk = {
                    'accnumber': _this.model.accnumber,
                    'custnumber': _this.model.custnumber,
                    'address': _this.model.addressline1,
                    'email': _this.model.emailaddress,
                    'telnumber': _this.model.telnumber,
                    'filepath': uploaddata.message,
                    'filename': uploaddata.filename,
                    'datesent': new Date(),
                    'owner': _this.username,
                    'byemail': _this.model.sendemail,
                    'byphysical': _this.model.sendphysical,
                    'bypost': _this.model.sendpostal,
                    'demand': letter.demand,
                    'customeremail': _this.model.emailaddress,
                    'status': 'queued',
                    'reissued': 'N',
                    'guarantorsno': _this.guarantors.length || [],
                    'guarantorsemail': _this.guarantoremails,
                    'sendemail': letter.branchemail || 'Collection Support <collectionssupport@co-opbank.co.ke>'
                };
                //
                _this.demandshistory(bulk);
                _this.getdemandshistory(_this.accnumber);
                _this.emaildata.file = uploaddata.message;
                // use uploaded fie on email
                if (_this.model.uploadedfile) {
                    _this.emaildata.file = _this.uploadedfilepath;
                }
                _this.ecolService.sendDemandEmail(_this.emaildata).subscribe(function (response) {
                    if (response.result === 'fail') {
                        swal.close();
                        _this.poperrorToast('Letter NOT sent on email!');
                    }
                    else {
                        swal.close();
                        _this.popsuccessToast('Letter sent on email!');
                    }
                });
                // send sms
                _this.ecolService.getsmsmessage(letter.demand).subscribe(function (respo) {
                    var sms = respo.smstemplate;
                    _this.smsMessage = sms.replace('[emailaddressxxx]', 'email address ' + _this.model.emailaddress);
                    var smsdata = {
                        'demand': letter.demand,
                        'custnumber': _this.model.custnumber,
                        'telnumber': _this.model.celnumber,
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
    SendLetterComponent.prototype.sendsms = function (smsdata) {
        var _this = this;
        this.ecolService.sendsms(smsdata).subscribe(function (result) {
            // swal('Successful!', 'Demand letter SMS sent!', 'success');
            _this.popsuccessToast('Demand letter SMS sent!');
        }, function (error) {
            console.log(error);
            // swal('Error!', 'Error occurred during sending email!', 'error');
            _this.poperrorToast('Error occurred during sending email!');
        });
    };
    SendLetterComponent.prototype.demandshistory = function (body) {
        var _this = this;
        this.ecolService.demandshistory(body).subscribe(function (data) {
            _this.getdemandshistory(_this.accnumber);
        });
    };
    SendLetterComponent.prototype.guarantorletter = function (body) {
        this.ecolService.guarantorletters(body).subscribe(function (data) { });
    };
    SendLetterComponent.prototype.sms = function (body) {
        this.ecolService.guarantorletters(body).subscribe(function (data) { });
    };
    SendLetterComponent.prototype.downloadFile = function (filepath, filename) {
        this.ecolService.downloadFile(filepath).subscribe(function (data) {
            saveAs(data, filename);
        }, function (error) {
            console.log(error.error);
            swal('Error!', ' Cannot download  file!', 'error');
        });
    };
    SendLetterComponent.prototype.downloadDemand = function (filepath, filename) {
        this.ecolService.downloadFile(filepath).subscribe(function (data) {
            saveAs(data, filename);
        }, function (error) {
            console.log(error.error);
            swal('Error!', ' Cannot download  file!', 'error');
        });
    };
    SendLetterComponent.prototype.resend = function (datafile) {
        var _this = this;
        swal({
            title: 'confirm re-send',
            text: JSON.stringify(datafile),
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Send Email',
            showLoaderOnConfirm: true,
            preConfirm: function (email) { },
            allowOutsideClick: function () { return !swal.isLoading(); }
        }).then(function (result) {
            if (result.value) {
                // resend letter
                //
                var emaildata = {
                    email: datafile.customeremail,
                    branchemail: datafile.sendemail,
                    title: datafile.demand,
                    guarantor: datafile.guarantors,
                    file: datafile.filepath
                };
                var bulk = {
                    'accnumber': datafile.accnumber,
                    'custnumber': datafile.custnumber,
                    'address': datafile.address,
                    'email': datafile.customeremail,
                    'telnumber': datafile.telnumber,
                    'filepath': datafile.filepath,
                    'filename': datafile.filename,
                    'datesent': new Date(),
                    'owner': _this.username,
                    'byemail': 'Y',
                    'byphysical': 'N',
                    'bypost': 'N',
                    'demand': datafile.demand,
                    'customeremail': datafile.customeremail,
                    'status': 'queued',
                    'reissued': 'Y',
                    'guarantorsno': datafile.guarantorsno,
                    'guarantorsemail': datafile.guarantorsemail,
                    'sendemail': datafile.sendemail
                };
                //
                _this.demandshistory(bulk);
                _this.getdemandshistory(datafile.accnumber);
                _this.ecolService.sendDemandEmail(emaildata).subscribe(function (response) {
                    if (response.result === 'fail') {
                        swal.close();
                        _this.poperrorToast('Letter NOT sent on email!');
                    }
                    else {
                        swal.close();
                        _this.popsuccessToast('Letter sent on email!');
                    }
                });
                // send sms
                _this.ecolService.getsmsmessage(datafile.demand).subscribe(function (respo) {
                    var sms = respo.smstemplate;
                    _this.smsMessage = sms.replace('[emailaddressxxx]', 'email address ' + _this.model.emailaddress);
                    /*if (respo && respo.length > 0) {
                      this.smsMessage = respo.smstemplate;
                    } else {
                      // tslint:disable-next-line:max-line-length
                      this.smsMessage = 'Dear Customer, We have sent a Demand  Notice to your address. To enquire call  0711049000';
                    }*/
                    var smsdata = {
                        'demand': datafile.demand,
                        'custnumber': datafile.custnumber,
                        'telnumber': datafile.celnumber,
                        'owner': _this.username,
                        'message': _this.smsMessage,
                    };
                    _this.sendsms(smsdata);
                }, function (error) {
                    console.log(error);
                });
                swal('Sent!', 'Email has been sent', 'success');
            }
        });
    };
    SendLetterComponent.prototype.savecontacts = function (model) {
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
    SendLetterComponent = __decorate([
        Component({
            selector: 'app-sendletter',
            templateUrl: './sendletter.component.html',
            styleUrls: ['./sendletter.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService,
            ToasterService,
            ActivatedRoute,
            NgxSpinnerService,
            EcolService])
    ], SendLetterComponent);
    return SendLetterComponent;
}());
export { SendLetterComponent };
//# sourceMappingURL=sendletter.component.js.map