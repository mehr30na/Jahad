import { Injectable } from '@angular/core';
import {GlobalUrl} from "../globalUrl";
import {Http, Headers} from "@angular/http";
import {TownShip} from "./TownShip";

@Injectable()
export class TownShipService {

  private _url: string = GlobalUrl.url;


  constructor(private _http: Http) { }

  addTownShip(townShip:Array<TownShip>, provinceId:string){
    var json = JSON.stringify(townShip);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this._url +'/townShip/'+provinceId  , json, {headers: headers})
      .map(res => res.json());
  }

  updateTownShip(townShip:TownShip, provinceId:string){
    var json = JSON.stringify(townShip);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put(this._url +'/townShip', json, {headers: headers})
      .map(res=>res.json());
  }

  deleteTownShip(townShipId:string){
    return this._http.delete(this._url+'/townShip/'+townShipId)
      .map(res => res.json());
  }

  getTownShip(townShipId:string){
    console.log(townShipId);
    return this._http.get(this._url +'/townShip/'+townShipId)
      .map(response=>response.json());
  }

  getTownShips(provinceId:string){
    return this._http.get(this._url +'/townShip/'+'parent/'+provinceId)
      .map(response=>response.json());
  }

  getTotalSum(townShipId:string ,  pId:string){

    return this._http.get(this._url +'/townShip/totalSum/'+townShipId+'/'+pId)
      .map(response=>response.json());
  }

}
