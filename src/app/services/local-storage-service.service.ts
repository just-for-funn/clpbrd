import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor() { }

  public save(result : OauthResult):void{
    console.log("response" , result);
    window.localStorage["oauthResponse"] = JSON.stringify(result);
  }

  public getOauthResponse():OauthResult{
    let rawJson =  window.localStorage["oauthResponse"];
    if (!rawJson) {
      return {
        access_token: "",
        token_type: "",
        expires_in: 0,
        scope: ""
      };
    }
    return JSON.parse(rawJson);
  }

  public getAccessToken(): string {
    return this.getOauthResponse().access_token;
  }
}


 export interface OauthResult { 
  access_token: string;
  token_type:string;
  expires_in:number;
  scope:string;
};