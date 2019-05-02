import { Injectable } from '@angular/core';
import {FileListResponse, GFile , GoogleApiService, ValueRange} from './google/google-api.service';
import {from, Observable, pipe, of} from 'rxjs';
import {concatMap, flatMap, mergeMap, delay, mapTo, map, tap} from 'rxjs/operators';
import { I18nSelectPipe } from '@angular/common';
import { isNgTemplate } from '@angular/compiler';
import { LocalStorageServiceService } from './local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  append(value: string, accessToken: string , row:number):Observable<ClipModel> {
     
    return this.getSpreadSheet(accessToken)
      .pipe(
        concatMap(sheet => this.googleApis.appendToSpeadSheet(sheet.id , value , accessToken , row)) , 
        map(valRange=>{
          return {
            value:valRange.values[0][0],
            rowNumber:row+1
          };
        })
      );
  }
 
 

  public SPREAD_SHEET_NAME = "clipboard-data";
  private spreadSheet: GFile = undefined;

  constructor(private googleApis: GoogleApiService) {

  }


  public getClips(access_token: string): Observable<ClipModel[]> {
    return this.googleApis.getSpreadSheets(access_token)
      .pipe(
          concatMap(file => this.getSpreadSheet(access_token)) ,
          map(sheet => {
            return sheet.id;
          }), 
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
  
  getSpreadSheet(access_token: string):Observable<GFile> {
    if(this.spreadSheet)
      return of(this.spreadSheet);
    return this.googleApis.getSpreadSheets(access_token)
      .pipe(
        concatMap(files => this.getOrCreateSpreadSheet(access_token, files)) , 
        tap(file => this.saveState(file))
      );
  }
  saveState(file: GFile): void {
    this.spreadSheet = Object.assign({} , file);
  }

  getOrCreateSpreadSheet(access_token: string, files: FileListResponse): Observable<GFile> {
    let foundFile = files.files
      .find(f => f.name == this.SPREAD_SHEET_NAME);

    if (foundFile) {
      return of(foundFile);
    } else {
      return this.googleApis
        .createSpreadSheet(access_token, this.SPREAD_SHEET_NAME)
        .pipe(map(spreadSheet => {
          return {
            name: spreadSheet.properties.title, 
            id: spreadSheet.spreadsheetId,
            kind: "",
            mimeType: ""
          };
        }));
    }

  }

}

export interface ClipModel{
  value: string;
  rowNumber:number;
}
