import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DataService {

  constructor() { }

  public dataSubject = new BehaviorSubject<number>(0);
  public notesSubject = new BehaviorSubject<number>(0);
  public woffstorySubject = new BehaviorSubject<number>(0);
  public guarantorsSubject = new BehaviorSubject<number>(0);
  public contactsSubject = new BehaviorSubject<number>(0);
  public collateralSubject = new BehaviorSubject<number>(0);
  public filesSubject = new BehaviorSubject<number>(0);
  public telesSubject = new BehaviorSubject<number>(0);
  public ptpsSubject = new BehaviorSubject<number>(0);

  getTestData(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  getNotesData(): Observable<any> {
    return this.notesSubject.asObservable();
  }

  getWoffstoryData(): Observable<any> {
    return this.woffstorySubject.asObservable();
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

  getTeles(): Observable<any> {
    return this.telesSubject.asObservable();
  }

  getPtps(): Observable<any> {
    return this.ptpsSubject.asObservable();
  }

  pustPtpData(dataToPush: number): void {
    this.dataSubject.next(dataToPush);
  }

  pustNotesData(dataToPush: number): void {
    this.notesSubject.next(dataToPush);
  }

  pushWoffstoryData(dataToPush: number): void {
    this.woffstorySubject.next(dataToPush);
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

  pushTeles(totalTeles: number): void {
    this.telesSubject.next(totalTeles);
  }

  pushPtps(totalPtps: number): void {
    this.ptpsSubject.next(totalPtps);
  }
}
