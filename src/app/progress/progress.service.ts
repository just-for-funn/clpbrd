import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { count } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
 
  private count = 0;

  progress$ = new Subject<boolean>();

  constructor() { }

  public notifyBusy() {
    this.count = this.count+1;
    this.progress$.next(true);
  }

  public notifyProgressCompleted() {
    this.count = this.count -1;
    if(this.count < 0)
      this.count = 0;
    if(this.count == 0)
      this.progress$.next(false);
  }


}
