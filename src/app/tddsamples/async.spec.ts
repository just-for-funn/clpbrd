import {from, Observable, of} from "rxjs";
import {delay} from "rxjs/operators";


class AsyncOperations{
  getName():Observable<string>{
    return of("davut").pipe(delay(100));
  }
}

describe('Async testing samples' , ()=> {

  let asyncOperaions = new AsyncOperations();

  it("This test fails to test async method" , ()=>{
      asyncOperaions.getName().subscribe(name => {
        expect(name).toBe("invalid value");
      });
  });


  it("will fail is done not called" , done=>{
      asyncOperaions.getName().subscribe(name => {
        expect(name).toBe("davut");
      })
  });


  it("Correct test" , done=>{
      asyncOperaions.getName().subscribe(name => {
        expect(name).toBe("davut");
        done();
      })
  });
});
