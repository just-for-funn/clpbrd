import {GoogleApiService} from './google-api.service';
import {ClipService} from './clip-service.service';
import {from, Observable} from 'rxjs';

describe('ClipServiceService', () => {
  let googleApiService;
  let clipService;
  beforeEach(() => {
       googleApiService = new GoogleApiService(undefined);
       clipService = new ClipService(googleApiService);
  });

  function emptyFileResponse() {
    let response =  {
      files:[]
    };
    return from( [response]);
  }

  it('should be run' , () => {
    expect(true).toBeTruthy();
  });


   function newSpreadSheetCreated() {
    let sheet = {
      id: "0"
    }
    return from([sheet]);
  }

  it('should create file if not exists' , done => {
    spyOn<GoogleApiService>( googleApiService , "getSpreadSheets" ).and.returnValue( emptyFileResponse());
    spyOn(googleApiService , "createSpreadSheet")
      .and
      .returnValue( newSpreadSheetCreated());


    clipService.getClips("myaccesstoken").subscribe(val =>done());

    expect(googleApiService.createSpreadSheet)
      .toHaveBeenCalledWith("myaccesstoken" , "clipboard-data");

  });
});