import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DataService {

  constructor() { }

  public dataSubject = new BehaviorSubject<number>(0);
  public notesSubject = new BehaviorSubject<number>(0);
  public guarantorsSubject = new BehaviorSubject<number>(0);
  public contactsSubject = new BehaviorSubject<number>(0);
  public collateralSubject = new BehaviorSubject<number>(0);

  getTestData(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  getNotesData(): Observable<any> {
    return this.notesSubject.asObservable();
  }

  getCollateral(): Observable<any> {
    return this.collateralSubject.asObservable();
  }

  getContacts(): Observable<any> {
    return this.contactsSubject.asObservable();
  }

  getGuarantors(): Observable<any> {
    return this.guarantorsSubject.asObservable();
  }

  pustPtpData(dataToPush: number): void {
    this.dataSubject.next(dataToPush);
  }

  pustNotesData(dataToPush: number): void {
    this.notesSubject.next(dataToPush);
  }

  pushContacts(dataToPush: number): void {
    this.contactsSubject.next(dataToPush);
  }

  pushGuarantors(dataToPush: number): void {
    this.guarantorsSubject.next(dataToPush);
  }

  pushCollateral(dataToPush: number): void {
    this.collateralSubject.next(dataToPush);
  }
}
