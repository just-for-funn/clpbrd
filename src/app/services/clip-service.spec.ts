import { GoogleApiService, FileListResponse, GFile, ValueRange } from "./google/google-api.service";
import {ClipService} from './clip-service';
import {from, Observable, of} from 'rxjs';

describe('ClipServiceService', () => {
  let googleApiService : GoogleApiService;
  let clipService : ClipService;
  beforeEach(() => {
       googleApiService = new GoogleApiService(undefined);
       clipService = new ClipService(googleApiService);

       spyOn<GoogleApiService>(googleApiService, "getSpreadSheetContents")
      .and
      .returnValue(contentResponse("row 1" , "row 2" ,"row 3"));
  });

  function emptyFileResponse() {
    let response =  {
      files:[]
    };
    return from( [response]);
  }

  function fileResponse(file: GFile):Observable<FileListResponse>{
    let response = {
      files:[file]
    };
    return of(response as FileListResponse);
  }

   function newSpreadSheetCreated() {
    let sheet = {
      id: "0"
    }
    return from([sheet]);
  }

  function contentResponse(...rows: string[]): Observable<ValueRange> {
      let resp = {
        range:"A1:A3",
        majorDimension:"ROWS",
        values: rows.map(item => [item])
      };
      return of(resp);
  }

  it('should create file if not exists' , done => {
    spyOn<GoogleApiService>( googleApiService , "getSpreadSheets" ).and.returnValue( emptyFileResponse());
    spyOn(googleApiService , "createSpreadSheet")
      .and
      .returnValue( newSpreadSheetCreated());

    clipService.getClips("myaccesstoken").subscribe(val =>{
      expect(googleApiService.createSpreadSheet)
        .toHaveBeenCalledWith("myaccesstoken" , "clipboard-data");
      done();
    });

   

  });

  it('should read contents if file exists', done => {
    spyOn<GoogleApiService>(googleApiService, "getSpreadSheets")
      .and
      .returnValue(fileResponse({ id: "123abc", name: "clipboard-data" } as GFile));

      clipService.getClips("myaccess_token").subscribe(data =>{
        expect(data[0].rowNumber).toEqual(1);
        expect(data[0].value).toEqual("row 1");
        expect(data[1].rowNumber).toEqual(2);
        expect(data[1].value).toEqual("row 2");
        expect(data[2].rowNumber).toEqual(3);
        expect(data[2].value).toEqual("row 3");
        done();
      });
     
  });
});
