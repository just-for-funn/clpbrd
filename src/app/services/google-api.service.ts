import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(private http: HttpClient) { }


  public getUserInfo(accessToken:string ):Observable<Profile>{
    let url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+accessToken;
    let options = {
        headers: {
          Authentication: "Bearer " + accessToken
        }
      
    };
    return this.http.get<Profile>(url);
  }
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
