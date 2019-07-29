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
var SendLetterccComponent = /** @class */ (function () {
    function SendLetterccComponent(settings, route, toasterService, spinner, ecolService) {
        var _this = this;
        this.settings = settings;
        this.route = route;
        this.toasterService = toasterService;
        this.spinner = spinner;
        this.ecolService = ecolService;
        this.model = {};
        this.emails = [];
        this.postcodes = [];
        this.addresses = [];
        this.letterbody = {};
        this.itemsDemands = ['overduecc', 'prelistingcc', 'suspension', 'PostlistingUnsecuredcc'];
        this.uploader = new FileUploader({
            url: URL
        });
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
            form.append('accnumber', _this.cardacct);
            form.append('owner', _this.username);
            form.append('custnumber', _this.cardacct);
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            // console.log('ImageUpload:uploaded:', item, status);
            // refresh demad history notes
        };
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            // success
            var obj = JSON.parse(response);
            for (var i = 0; i < obj.files.length; i++) {
                var bulk = {
                    'accnumber': _this.cardacct,
                    'custnumber': _this.cardacct,
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
                    _this.getdemandshistory(_this.cardacct);
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
    SendLetterccComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    SendLetterccComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    SendLetterccComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cardacct = this.route.snapshot.queryParamMap.get('cardacct');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.cardacct = queryParams.get('cardacct');
        });
        this.username = this.route.snapshot.queryParamMap.get('username');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.username = queryParams.get('username');
        });
        // get account details
        this.getcardaccount(this.cardacct);
        this.getdemandshistory(this.cardacct);
        this.getteles(this.cardacct);
    };
    SendLetterccComponent.prototype.getteles = function (cust) {
        var _this = this;
        this.ecolService.getteles(cust).subscribe(function (data_teles) {
            _this.teles = data_teles;
            _this.emails = data_teles;
            _this.postcodes = data_teles;
            _this.addresses = data_teles;
        });
    };
    SendLetterccComponent.prototype.popsuccessToast = function (msg) {
        this.toasterService.pop('success', 'Success', msg);
    };
    SendLetterccComponent.prototype.poperrorToast = function (error) {
        this.toasterService.pop('error', 'Error', error);
    };
    SendLetterccComponent.prototype.popinfoToast = function (info) {
        this.toasterService.pop('info', 'Info', info);
    };
    SendLetterccComponent.prototype.openletter = function (letter) {
        var _this = this;
        this.ecolService.loader();
        this.ecolService.getcardAccount(this.cardacct).subscribe(function (carddata) {
            // if cardacct
            if (carddata && carddata.length > 0) {
                _this.letterbody.demand = letter.demand,
                    _this.letterbody.showlogo = letter.showlogo,
                    _this.letterbody.format = letter.format,
                    _this.letterbody.cardacct = _this.cardacct,
                    _this.letterbody.cardnumber = carddata[0].cardnumber,
                    _this.letterbody.cardname = carddata[0].cardname,
                    _this.letterbody.address = letter.addressline1,
                    _this.letterbody.rpcode = letter.postcode,
                    _this.letterbody.city = letter.city,
                    _this.letterbody.exp_pmnt = carddata[0].exppmnt,
                    _this.letterbody.out_balance = carddata[0].outbalance,
                    _this.letterbody.demand1date = new Date();
                // call generate letter api
                _this.ecolService.generateLetter(_this.letterbody).subscribe(function (data) {
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
    SendLetterccComponent.prototype.getcardaccount = function (cardacct) {
        var _this = this;
        this.ecolService.getcardAccount(cardacct).subscribe(function (data) {
            _this.accountdetails = data[0];
            _this.model.accnumber = data[0].cardacct;
            _this.model.custnumber = data[0].cardnumber;
            _this.model.addressline1 = data[0].address + ' ' + data[0].city;
            _this.model.postcode = data[0].rpcode;
            _this.model.emailaddress = data[0].email;
            _this.model.celnumber = data[0].mobile;
            // if guarantors are available
        });
    };
    SendLetterccComponent.prototype.getdemandshistory = function (cardacct) {
        var _this = this;
        this.ecolService.getdemandshistory(cardacct).subscribe(function (data) {
            _this.demands = data;
        });
    };
    SendLetterccComponent.prototype.downloadDemand = function (filepath, filename) {
        this.ecolService.downloadFile(filepath).subscribe(function (data) {
            saveAs(data, filename);
        }, function (error) {
            console.log(error.error);
            swal('Error!', ' Cannot download  file!', 'error');
        });
    };
    SendLetterccComponent.prototype.generate = function () {
        this.ecolService.loader();
        this.processletter(this.model.demand, this.model.accnumber, this.model.emailaddress);
        this.getdemandshistory(this.cardacct);
    };
    SendLetterccComponent.prototype.processletter = function (demand, cardacct, emailaddress) {
        var _this = this;
        this.ecolService.getcardAccount(cardacct).subscribe(function (data) {
            if (data.length > 0) {
                var letter = {
                    demand: demand.toLowerCase(),
                    cardacct: data[0].cardacct,
                    cardnumber: data[0].cardnumber,
                    cardname: data[0].cardname,
                    showlogo: true,
                    format: 'pdf',
                    address: _this.model.addressline1,
                    rpcode: _this.model.postcode,
                    exp_pmnt: data[0].exppmnt,
                    out_balance: data[0].outbalance,
                    manager: 'ROSE KARAMBU'
                };
                var emaildata = {
                    name: data[0].cardname,
                    email: emailaddress,
                    title: demand,
                    branchemail: 'Collection Support <collectionssupport@co-opbank.co.ke>'
                };
                // generate letter
                _this.generateletter(letter, emaildata);
            }
            else {
                swal('None!', cardacct + ' not found!', 'warning');
            }
        }, function (error) {
            console.log(error);
            swal('Error!', 'exception occured!', 'error');
        });
    };
    SendLetterccComponent.prototype.generateletter = function (letter, emaildata) {
        var _this = this;
        swal.close();
        this.popinfoToast('Letter Generation process started');
        this.ecolService.generateLettercc(letter).subscribe(function (dataupload) {
            // sucess
            if (dataupload.result === 'success') {
                // swal('Good!', dataupload.message, 'success');
                _this.popsuccessToast('Letter generated and queued to be sent');
                // save to history
                var bulk = {
                    'accnumber': _this.model.accnumber,
                    'custnumber': _this.model.accnumber,
                    'address': _this.model.addressline1,
                    'email': _this.model.emailaddress,
                    'telnumber': _this.model.telnumber,
                    'filepath': dataupload.message,
                    'filename': dataupload.filename,
                    'datesent': new Date(),
                    'owner': _this.username,
                    'byemail': _this.model.sendemail,
                    'byphysical': _this.model.sendphysical,
                    'bypost': _this.model.sendpostal,
                    'demand': letter.demand,
                    'status': 'queued',
                    'customeremail': _this.model.emailaddress,
                    'reissued': 'N',
                    'guarantorsno': 0,
                    'guarantorsemail': 0,
                    'sendemail': 'Collection Support <collectionssupport@co-opbank.co.ke>'
                };
                _this.demandshistory(bulk);
                _this.getdemandshistory(_this.cardacct);
                // this.downloadDemand(letter.message, dataupload.filename);
            }
            else {
                swal('Error!', 'Error occured during letter generation!', 'error');
            }
            // send email
            // add file full path
            emaildata.file = dataupload.message;
            // use uplaoded fie on email
            if (_this.model.uploadedfile) {
                emaildata.file = _this.uploadedfilepath;
            }
            _this.ecolService.sendDemandEmail(emaildata).subscribe(function (response) {
                // console.log(response);
                /*if (response.result === 'fail') {
                  swal('Error!', 'Letter NOT sent on email!', 'error');
                } else {
                  swal('Success!', 'Letter sent on email!', 'success');
                }*/
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
            // get message
            _this.ecolService.getsmsmessage(letter.demand).subscribe(function (respo) {
                var sms = respo.smstemplate;
                _this.smsMessage = sms.replace('[emailaddressxxx]', 'email address ' + _this.model.emailaddress);
                var smsdata = {
                    'demand': letter.demand,
                    'custnumber': _this.model.accnumber,
                    'telnumber': _this.model.celnumber,
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
    SendLetterccComponent.prototype.sendsms = function (smsdata) {
        this.ecolService.sendsms(smsdata).subscribe(function (result) {
            swal('Successful!', 'Demand letter sent!', 'success');
        }, function (error) {
            console.log(error);
            swal('Error!', 'Error occurred during sending email!', 'error');
        });
    };
    SendLetterccComponent.prototype.getsmsmessage = function (demand) {
        var _this = this;
        this.ecolService.getsmsmessage(demand).subscribe(function (result) {
            _this.smsMessage = result[0].message;
        }, function (error) {
            console.log(error);
        });
    };
    SendLetterccComponent.prototype.demandshistory = function (body) {
        this.ecolService.demandshistory(body).subscribe(function (data) {
            // console.log(data);
        });
    };
    SendLetterccComponent.prototype.guarantorletter = function (body) {
        this.ecolService.guarantorletters(body).subscribe(function (data) { });
    };
    SendLetterccComponent.prototype.sms = function (body) {
        this.ecolService.guarantorletters(body).subscribe(function (data) { });
    };
    SendLetterccComponent.prototype.downloadFile = function (filepath, filename) {
        this.ecolService.downloadFile(filepath).subscribe(function (data) {
            saveAs(data, filename);
        }, function (error) {
            console.log(error.error);
            swal('Error!', ' Cannot download  file!', 'error');
        });
    };
    SendLetterccComponent.prototype.resend = function (datafile) {
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
                var emaildata = {
                    email: datafile.customeremail,
                    branchemail: datafile.sendemail,
                    title: datafile.demand,
                    // guarantor: datafile.guarantors,
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
    SendLetterccComponent.prototype.savecontacts = function (model) {
        var _this = this;
        this.spinner.show();
        // save contact
        this.ecolService.existsteles(this.cardacct, model.celnumber, model.emailaddress).subscribe(function (contact) {
            if (contact.length > 0) {
                swal('Warning!', 'Contact already exists', 'info');
                _this.spinner.hide();
            }
            else {
                // save
                var body = {
                    custnumber: _this.cardacct,
                    telephone: model.celnumber,
                    email: model.emailaddress,
                    active: 'Yes',
                    owner: _this.username,
                    updatedby: _this.username,
                    updatedlast: new Date(),
                    address: model.addressline1,
                    postcode: model.postcode
                };
                _this.ecolService.postteles(body).subscribe(function (teles) {
                    _this.spinner.hide();
                    _this.getteles(_this.cardacct);
                    swal('Good!', 'Contact has been added', 'success');
                });
            }
        }, function (error) {
            console.log('error-existsteles', error);
            swal('Ooops!', 'Something went wrong', 'error');
            _this.spinner.hide();
        });
        /*setTimeout(() => {
            this.spinner.hide();
        }, 5000);*/
    };
    SendLetterccComponent = __decorate([
        Component({
            selector: 'app-sendlettercc',
            templateUrl: './sendlettercc.component.html',
            styleUrls: ['./sendlettercc.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService,
            ActivatedRoute,
            ToasterService,
            NgxSpinnerService,
            EcolService])
    ], SendLetterccComponent);
    return SendLetterccComponent;
}());
export { SendLetterccComponent };
//# sourceMappingURL=sendlettercc.component.js.map