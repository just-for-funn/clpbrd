import { Injectable } from '@angular/core';
import {FileListResponse, GoogleApiService} from './google-api.service';
import {from, Observable, pipe} from 'rxjs';
import {concatMap, flatMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  SPREAD_SHEET_NAME = "clipboard-data";
  constructor(private googleApis: GoogleApiService) {

   }


  public getClips(access_token: string): Observable<any> {
    return this.googleApis.getSpreadSheets(access_token)
      .pipe(flatMap(file => this.createFileIfRequred(access_token, file)));
  }

  private createFileIfRequred(access_token:string , file: FileListResponse) : Observable<string> {
     let foundFile = file.files
       .find( f=>f.name == this.SPREAD_SHEET_NAME);

     if(foundFile)
       return from(foundFile.id);
     else
       return this.googleApis
         .createSpreadSheet(access_token ,this.SPREAD_SHEET_NAME )
         .pipe(concatMap(sheet=> from(sheet.id)));
  }


}

export class ClipModel{
  value: string;
  rowNumber:number;
}
