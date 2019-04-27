import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from "./services/google/google-api.service";
import { LocalStorageServiceService } from './services/local-storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'clipboard';

  constructor(private googleApis: GoogleApiService , private localStorage: LocalStorageServiceService){

  }
  
  ngOnInit(){
      this.getProfiles();
  }



  private getProfiles() {
    let oatuhResponse = this.localStorage.getOauthResponse();
    if (oatuhResponse.access_token) {
      this.googleApis.getUserInfo(oatuhResponse.access_token)
      .subscribe(profile => {
      } , error=>{
          if(error.status === 401)
          {
            window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogined&client_id=90057650760-ldp1ef1a9mkhedqeotgsfa4o32jocsit.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/drive.file%20https://www.googleapis.com/auth/userinfo.profile";
          }
      });
    }
  }
}
