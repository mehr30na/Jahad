import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {GlobalUrl} from "../globalUrl";
import {User} from "./user";

@Injectable()
export class LoginService {
  private _url: string = GlobalUrl.url;


  constructor(private _http: Http) { }

  loginService(user:User){
    var json = JSON.stringify(user);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this._url +'/login'  , json, {headers: headers})
      .map(res => res.json());
  }

}
