import { Injectable } from '@angular/core';
import {FileListResponse, GFile , GoogleApiService, ValueRange} from './google/google-api.service';
import {from, Observable, pipe, of} from 'rxjs';
import {concatMap, flatMap, mergeMap, delay, mapTo, map} from 'rxjs/operators';
import { I18nSelectPipe } from '@angular/common';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public SPREAD_SHEET_NAME = "clipboard-data";
  constructor(private googleApis: GoogleApiService) {

  }


  public getClips(access_token: string): Observable<ClipModel[]> {
    return this.googleApis.getSpreadSheets(access_token)
      .pipe(
          concatMap(file => this.getSpreadSheetId(access_token, file)) , 
          concatMap(id =>this.getSheetContent(id ,access_token)));
  }

  getSheetContent(id: string, access_token: string): Observable<ClipModel[]> {
    return this.googleApis.getSpreadSheetContents(access_token , id )
      .pipe(map(this.convert));
  }

  convert(response: ValueRange): ClipModel[] {
     return response.values.map((item,index) => {
        return {
          value:item[0],
          rowNumber:index+1
        };
     })
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

export interface ClipModel{
  value: string;
  rowNumber:number;
}
