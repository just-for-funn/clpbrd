import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { 

  }

  getLoginUrl():string{
    let host = environment.host;
    let encodedHost = encodeURI(host);
    return `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&redirect_uri=${encodedHost}%2Flogined&client_id=90057650760-ldp1ef1a9mkhedqeotgsfa4o32jocsit.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/drive.file%20https://www.googleapis.com/auth/userinfo.profile`
  }
}
