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
import { Router } from '@angular/router';
import swal from 'sweetalert2';
var AuthGuard = /** @class */ (function () {
    // Inject Router so we can hand off the user to the Login Page 
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        // return true;
        // if ( sessionStorage.getItem('x-auth') ) {
        if (localStorage.getItem('currentUser')) {
            // Token from the LogIn is avaiable, so the user can pass to the route
            return true;
        }
        else {
            // Token from the LogIn is not avaible because something went wrong or the user wants to go over the url to the site
            // Hands the user to the LogIn page
            swal({ title: 'You\'re Not Logged In',
                imageUrl: "assets/img/user/notlogg.png",
                text: 'Kindly, log in to continue!',
                confirmButtonColor: '#7ac142',
                confirmButtonText: 'Okay' });
            // not logged in so redirect to login page with the return url
            // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            this.router.navigate(['/login']);
            return false;
        }
    };
    AuthGuard = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Router])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map