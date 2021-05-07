import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {CartItem} from '../models/cart-item';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {NavigationStart, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  private subject = new BehaviorSubject<{mesg:string,type:number}>(null);
  message$: Observable<{mesg:string,type:number}> = this.subject.asObservable();

  constructor(private router: Router) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.subject.next(null);
      }
    });
  }

  alertMessage(message: string ) {
    this.subject.next({mesg:message,type:0});
    // setTimeout(()=>{  this.subject.next(null);}, 300)

  }

  successMessage(message: string ) {
    this.subject.next({mesg:message,type:1});
    // setTimeout(()=>{ this.subject.next(null);}, 300)
  }

  clearMessage() {
    this.subject.next(null);
  }
}
