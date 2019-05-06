import {Observable, Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

export class DelayingSubject{
    private subject$ = new Subject<string>();
    private readonly mObservable:Observable<string>;
    private start:number = undefined;

    constructor(){
      this.mObservable = this.subject$.pipe(
        debounceTime(250)
      );

    }

    next(val:string):void {
      this.subject$.next(val);
    }

    observable():Observable<string>{
      return this.mObservable;
    }
}
