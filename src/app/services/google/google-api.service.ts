import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

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
    throw "Not Implemented";
  }

  
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
  spreadsheetId: string;
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
