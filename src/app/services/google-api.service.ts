import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  public createSpreadSheet(accessToken: string , fileName:string):Observable<any>{
    throw "Not Implemented";
  }

}

export interface FileListResponse{
    kind:string,
    incompleteSearch: boolean,
    files: {
      kind:string,
      id:string,
      name:string,
      mimeType:string
    }[];
}



export interface Profile{
  id:string;
  name: string;
  given_name:string;
  family_name:string;
  link:string;
  picture:string;
  locale:string;
}
