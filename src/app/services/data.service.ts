import { Injectable } from '@angular/core';  
import { Subject } from 'rxjs';  
import { Observable } from 'rxjs'; 

@Injectable()
export class DataService {

    private subject = new Subject<any>();  
    constructor() { }  
    
    sendProductID(message: string) {  
      this.subject.next({ text: message });  
    }  
    
    getProductID(): Observable<any> {  
      return this.subject.asObservable();  
    }

}
