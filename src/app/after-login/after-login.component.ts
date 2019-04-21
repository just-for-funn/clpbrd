import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageServiceService } from '../services/local-storage-service.service';
import { LoginService } from '../login/login.service';
import { timeout } from 'q';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.css']
})
export class AfterLoginComponent implements OnInit {

  constructor(private router:Router , 
    private localStorage: LocalStorageServiceService , private loginService:LoginService) { }

  ngOnInit(){
    
    

    let url = window.location.href;

    let paramsOnly = url.slice(url.indexOf("#")+1);
    let arraysOfParams = paramsOnly.split("&");
    let map =  arraysOfParams.reduce((map,value)=>{
        let index = value.indexOf("=");
        map[value.slice(0,index)] = value.slice(index+1);
        return map;
    } , new Map());
    console.log("map" , map);


    window.localStorage["rawOauthResponse"]=JSON.stringify(map);
    let response = {
      access_token:map['access_token'],
      token_type:map['token_type'],
      expires_in:map['expires_in'],
      scope:map['scope'],
    };
    this.localStorage.save(response);
    this.loginService.notifyLoginChanged();
    this.router.navigate(['/']);
  }

}