import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Login } from './login.info';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  private loginResource = new Subject<Login>();

  loginObservable$ = this.loginResource.asObservable();

  public isLogined(): boolean {
      return false;
  }

  public notifyLoginChanged():void{
    this.loginResource.next(null); //yeah srry 
  }
}
