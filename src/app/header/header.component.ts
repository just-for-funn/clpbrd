import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login/login.service';
import { LocalStorageServiceService } from '../services/local-storage-service.service';
import { GoogleApiService } from "../services/google/google-api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {
  
  isLogined = false;
  name: string;
  profile: string;
  constructor(private loginService:LoginService ,private localStorage: LocalStorageServiceService ,private googleApis:GoogleApiService) {
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
    window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogined&client_id=90057650760-ldp1ef1a9mkhedqeotgsfa4o32jocsit.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/drive.file%20https://www.googleapis.com/auth/userinfo.profile";
  }
}
