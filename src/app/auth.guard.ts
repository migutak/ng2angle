import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // Inject Router so we can hand off the user to the Login Page
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    // if ( sessionStorage.getItem('x-auth') ) {
    if (localStorage.getItem('currentUser')) {
      // Token from the LogIn is avaiable, so the user can pass to the route
      return true;
    } else  {
      // Token from the LogIn is not avaible because something went wrong or the user wants to go over the url to the site
      // Hands the user to the LogIn page
      /* alert('You are currently not logged in, please provide Login!');
      // not logged in so redirect to login page with the return url
      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      this.router.navigate( ['/login'] );
      return false; */

      /*swal({title: 'You\'re Not Logged In',
      imageUrl: 'assets/img/user/notlogg.png',
      text: 'Kindly, log in to continue!',

      confirmButtonColor: '#7ac142',
      confirmButtonText: 'Okay'});
      this.router.navigate( ['/login'] );*/
      return false;

    }

  }
}
