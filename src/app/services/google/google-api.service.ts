import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { concatMap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {
  
  appendToSpeadSheet(spreadsheetId: string, rowValue: string, accessToken: string, row: number): Observable<ValueRange> {
    let range = `'clpbrd-sheet0'!A${row+1}`;
    let url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append`;
    let values:ValueRange = {
        majorDimension:"ROWS",
        range:range,
        values:[[rowValue]]
    };
    let requestOptions = {
        params:{
          valueInputOption:"RAW",
          includeValuesInResponse:"true",
          access_token:accessToken
        }
    };
    return this.http.post<UpdatedValueRange>(url ,values ,requestOptions).pipe( map(resp=>resp.updates.updatedData));
  }

  URL_LIST_FILES = "https://content.googleapis.com/drive/v3/files?q=mimeType%3D%27application%2Fvnd.google-apps.spreadsheet%27";


  constructor(private http: HttpClient) 
  {

  }


  public getUserInfo(accessToken:string ):Observable<Profile>{
    let url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+accessToken;
    let options = {
        headers: {
          Authentication: "Bearer " + accessToken
        }
      
    };
    return this.http.get<Profile>(url);
  }


  public getSpreadSheets(access_token:string ):Observable<FileListResponse>{
    let url = this.URL_LIST_FILES + "&access_token="+access_token;
    return this.http.get<FileListResponse>(url);
  }

  public createSpreadSheet(accessToken: string , fileName:string):Observable<SpreadSheet>{
    let url = `https://sheets.googleapis.com/v4/spreadsheets?access_token=${accessToken}`;
    let body: SpreadSheet = {
       properties: {
          title: fileName
       },
       sheets:[
          {
              properties:{
                title: "clpbrd-sheet0"
              }
          }
       ]
    };
    return this.http.post<SpreadSheet>(url ,body );
  }


  public getSpreadSheetContents(accessToken:string , spreadSheetId:string):Observable<ValueRange>{
    let url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}/values/A1:A9999?access_token=${accessToken}&majorDimension=ROWS&valueRenderOption=UNFORMATTED_VALUE`;
    return this.http.get<ValueRange>(url);
  }

  public deleteRow(access_token:string , rowNumber:number , spreadSheetId:string , sheetId:string):Observable<ValueRange>{
    let url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}:batchUpdate`;
    let body = {
      includeSpreadsheetInResponse: false,
      "requests": [
        {
          "deleteDimension": {
            "range": {
              "sheetId": sheetId,
              "dimension": "ROWS",
              "startIndex": rowNumber-1,
              "endIndex": rowNumber
            }
          }
        }
      ],
    }
    let requestOptions = {
      params:{
        access_token:access_token
      }
  };
    return this.http.post<BatchUpdateResponse>(url ,body,requestOptions ).
        pipe(concatMap(arg=>this.getSpreadSheetContents(access_token , spreadSheetId )));
  }

  getSpreadSheet(access_token: string, spreadsheetId: string): Observable<SpreadSheet> {
    let url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?access_token=${access_token}`;
    return this.http.get<SpreadSheet>(url);
  }

}

export interface ValueRange{
    range: string,
    majorDimension: string,
    values: Array<Array<string>>;
}

export interface FileListResponse{
    kind:string,
    incompleteSearch: boolean,
    files:GFile [];
};

export interface GFile{
  kind:string,
  id:string,
  name:string,
  mimeType:string
};

export interface SpreadSheet{
  spreadsheetId?: string;
  properties?:any;
  sheets?:any;
  namedRanges?:any;
  spreadSheetUrl?:any;
  developerMetadata?:any;
}

export interface Profile{
  id:string;
  name: string;
  given_name:string;
  family_name:string;
  link:string;
  picture:string;
  locale:string;
};

export interface UpdateValuesResponse{
  spreadsheetId: string,
  updatedRange: string,
  updatedRows: number,
  updatedColumns: number,
  updatedCells: number,
  updatedData: ValueRange,
};

export interface UpdatedValueRange {
  spreadsheetId: string;
  updates: UpdateValuesResponse;
};

export interface BatchUpdateResponse{
  spreadsheetId: string,
  totalUpdatedRows: number,
  totalUpdatedColumns: number,
  totalUpdatedCells: number,
  totalUpdatedSheets: number,
  responses:UpdateValuesResponse[]
}


