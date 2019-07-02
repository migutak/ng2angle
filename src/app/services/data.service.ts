import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DataService {

  constructor() { }

  public ptpsSubject = new BehaviorSubject<number>(0);
  public notesSubject = new BehaviorSubject<number>(0);
  public guarantorsSubject = new BehaviorSubject<number>(0);
  public contactsSubject = new BehaviorSubject<number>(0);
  public collateralSubject = new BehaviorSubject<number>(0);
  public filesSubject = new BehaviorSubject<number>(0);

  

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

  getFiles(): Observable<any> {
    return this.filesSubject.asObservable();
  }
  getPtpsData(): Observable<any> {
    return this.ptpsSubject.asObservable();
  }

  pustPtpsData(dataToPush: number): void {
    this.ptpsSubject.next(dataToPush);
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

  pushFile(totalFiles: number): void {
    this.filesSubject.next(totalFiles);
  }


  pushPtpsData(ptps: number): void {
    this.ptpsSubject.next(ptps);
  }

  // getPtpsData(): Observable<any> {
  //   return this.ptpsSubject.asObservable();
  // }
}
