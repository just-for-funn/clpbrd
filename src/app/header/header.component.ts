import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login/login.service';
import { LocalStorageServiceService } from '../services/local-storage-service.service';
import { GoogleApiService } from "../services/google/google-api.service";
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {
  
  isLogined = false;
  name: string;
  profile: string;
  constructor(private loginService:LoginService ,private localStorage: LocalStorageServiceService ,
    private googleApis:GoogleApiService, private configService: ConfigService ) {
    loginService.loginObservable$
    .subscribe(login=>{
       this.reloadProfile();
    });
  }
  
  ngOnDestroy(): void {
    //throw new Error("Method not implemented.");
  }
  ngOnInit() 
  {
     console.log("OnInit of header");
     this.reloadProfile();
  }

  private reloadProfile(){
    let oatuhResponse = this.localStorage.getOauthResponse();
    if (oatuhResponse.access_token) {
      this.googleApis.getUserInfo(oatuhResponse.access_token).subscribe(profile => {
        this.profile = profile.picture;
        this.isLogined = true;
        this.name = profile.name;
      });
    }
  }
  
  public loginClicked():void{
    window.location.href = this.configService.getLoginUrl();
  }
}
