import { Injectable } from '@angular/core';
import {FileListResponse, GFile , GoogleApiService} from './google/google-api.service';
import {from, Observable, pipe, of} from 'rxjs';
import {concatMap, flatMap, mergeMap, delay, mapTo} from 'rxjs/operators';
import { I18nSelectPipe } from '@angular/common';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  SPREAD_SHEET_NAME = "clipboard-data";
  constructor(private googleApis: GoogleApiService) {

  }


  public getClips(access_token: string): Observable<any> {
    return this.googleApis.getSpreadSheets(access_token)
      .pipe(concatMap(file => this.getSpreadSheetId(access_token, file)));
  }

  private getSpreadSheetId(access_token:string , file: FileListResponse) : Observable<string> {
     let foundFile = file.files
       .find( f=>f.name == this.SPREAD_SHEET_NAME);

     if(foundFile)
       return of(foundFile.id);
     else
       return this.googleApis
         .createSpreadSheet(access_token ,this.SPREAD_SHEET_NAME )
         .pipe(concatMap(sheet=> of(sheet.spreadsheetId)));
  }

}

export class ClipModel{
  value: string;
  rowNumber:number;
}
