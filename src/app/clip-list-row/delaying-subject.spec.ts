import {DelayingSubject} from './delaying-subject';


describe('delaying subject tests' , ()=>{

  let delayingSubject:DelayingSubject;
  beforeEach(()=>{
    delayingSubject = new DelayingSubject();
  });


  it('should send single value after some delay' , done=>{
    delayingSubject.observable().subscribe(arg =>{
      expect(arg).toEqual("test");
      done();
    });

    delayingSubject.next("test");
  });

  it('should invoke only once on serial requests' , done =>{
    delayingSubject.observable().subscribe(val =>{
      expect(val).toEqual("abcd");
      done();
    })
    delayingSubject.next("a");
    delayingSubject.next("ab");
    delayingSubject.next("abc");
    delayingSubject.next("abcd");
  });
});
