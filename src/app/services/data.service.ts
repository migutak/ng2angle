import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataShareService {
 
  shareDataSubject = new Subject<any>(); //Decalring new RxJs Subject

   sendDataToOtherComponent(somedata){
    this.shareDataSubject.next(somedata);
}
}
