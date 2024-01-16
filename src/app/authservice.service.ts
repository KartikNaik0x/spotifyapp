import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private location:Location) { 
    this.location.subscribe(()=>{
      if(this.location.path() == '/registration'){
        this.setLoginButtonVisibility(true)
      }
      if(this.location.path() == '/login'){
        this.setLoginButtonVisibility(false);
      }

    })
  }

  private isLoginButtonVisibleSubject = new BehaviorSubject<boolean>(true);
  isLoginButtonVisible$: Observable<boolean> = this.isLoginButtonVisibleSubject.asObservable();
  setLoginButtonVisibility(isVisible: boolean): void {
    this.isLoginButtonVisibleSubject.next(isVisible);
  }
}
