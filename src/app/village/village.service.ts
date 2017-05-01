import { Injectable } from '@angular/core';
import {GlobalUrl} from "../globalUrl";
import {Http} from "@angular/http";

@Injectable()
export class VillageService {

  private _url: string = GlobalUrl.url;


  constructor(private _http: Http) { }

  getVillage(villageId:string){
    return this._http.get(this._url +'/village/'+villageId)
      .map(response=>response.json());
  }

  deleteInField(id:string){
    return this._http.get(this._url +'/infield/'+id)
      .map(response=>response.json());
  }

}
