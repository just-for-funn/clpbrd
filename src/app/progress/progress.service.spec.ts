import { ProgressService } from "./progress.service";


describe('progress service test' , ()=>{
  let progressService: ProgressService;

  beforeEach(()=>{
    progressService = new ProgressService();
  });

  it('canary test' , ()=>{
    expect(true).toBeTruthy();
  });

  it('should should notify progress started' , done=>{
      progressService.progress$.subscribe(isBusy=>{
        expect(isBusy).toBeTruthy();
        done();
      });
      progressService.notifyBusy();
  });

  it('should notify progress completed' , done=>{
      progressService.notifyBusy();
      progressService.progress$.subscribe(isBusy=>{
        expect(isBusy).toBeFalsy();
        done();
      });
      progressService.notifyProgressCompleted();
  });

  it('if sequential busy notified then should wait for all finish' , done=>{
    progressService.notifyBusy();
    progressService.notifyBusy();
    progressService.notifyBusy();
    let counter = 0;
    progressService.progress$.subscribe(arg =>{
      expect(arg).toBeFalsy();
      done(); 
    });
    progressService.notifyProgressCompleted();
    progressService.notifyProgressCompleted();
    progressService.notifyProgressCompleted();
     
  });
});
