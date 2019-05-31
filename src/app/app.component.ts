import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from "./services/google/google-api.service";
import { LocalStorageServiceService } from './services/local-storage-service.service';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'clipboard';

  constructor(private googleApis: GoogleApiService , private localStorage: LocalStorageServiceService , private configurationService:ConfigService){

  }
  
  ngOnInit(){
    setTimeout(()=>this.getProfiles() , 1000);
  }



  private getProfiles() {
    let oatuhResponse = this.localStorage.getOauthResponse();
    if (oatuhResponse.access_token) {
      this.googleApis.getUserInfo(oatuhResponse.access_token)
      .subscribe(profile => {
      } , error=>{
          if(error.status === 401)
          {
            window.location.href = this.configurationService.getLoginUrl();
          }
      });
    }
  }
}
