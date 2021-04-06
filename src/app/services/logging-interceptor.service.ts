import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggingInterceptorService {
  user = {};
  response_body: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser')) || {USERNAME: null};
  constructor(public http: HttpClient,) {
    this.user = localStorage.getItem('currentUser'); // USERNAME
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        'Backend returned code:' + error.status +
        ' Body was:', error);
    }
    
    
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.' + error.message);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    const started_datetime = moment().format();
    let ok: string;
    return next.handle(req).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        //event => ok = event instanceof HttpResponse ? 'succeeded' : '',
        (result: HttpEvent<any>) => {
          //console.log("response intercepted", result);
          ok = 'succeeded';
          this.response_body = result
        },
        // Operation failed; error is an HttpErrorResponse
        //error => ok = 'failed'
        (error: HttpErrorResponse) => {
          //console.error("error response intercepted", error);
          ok = 'failed';
          this.response_body = error
        }
      ),
      catchError(this.handleError),
      // Log when response observable either completes or errors
      finalize(() => {
        const now = Date.now();
        const end_datetime = moment().format();
        const elapsed = now - started;
        const msg = `${req.method} "${req.urlWithParams}"
           ${ok} in ${elapsed} ms.`;
        const esmsg = {
          "endpoint_url": req.urlWithParams,
          "method": req.method,
          "request_body": req,
          "response_body": this.response_body,
          "starttime": started_datetime,
          "endtime": end_datetime,
          "elapsed": elapsed,
          "status": this.response_body.status,
          "statusText": this.response_body.statusText,
          "message": this.response_body.message,
          "ok": this.response_body.ok
        }
        //console.log(msg);
        this.eslogging(esmsg)
      })
    );
  }

  eslogging(entry: any) {

    var headers = new HttpHeaders();
    const date = moment().format();

    let body = {
      "datetime": date,
     // "index": "clientapplication",
      "endpoint_url": entry.endpoint_url,
      "method": entry.method,
      "request_body": entry.request_body,
      "response_body": entry.response_body,
      "start_time": entry.starttime,
      "end_time": entry.endtime,
      "time_elapsed(ms)": entry.elapsed,
      "status_code": entry.status,
      "status_text": entry.statusText,
      "user": this.currentUser.USERNAME,
      "client_ip": 'xx.xx.xx.xx',
      "message": entry.message,
      "ok": entry.ok
    }

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    
    if(!body.endpoint_url.includes('ecollectclientapp')) {
      this.http.post(`${environment.elasticsearch}/ecollectclientapp/_doc`, body).subscribe(resp => {
      })
    }
    // 
  }
}
