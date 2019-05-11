import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DataService {
 
  constructor() { }

  public dataSubject = new BehaviorSubject<number>(0);
  public notesSubject = new BehaviorSubject<number>(0);

  getTestData(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  getNotesData(): Observable<any> {
    return this.notesSubject.asObservable();
  }

  pustPtpData(dataToPush: number): void {
    this.dataSubject.next(dataToPush);
  }

  pustNotesData(dataToPush: number): void {
    this.notesSubject.next(dataToPush);
  }
}
