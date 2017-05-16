import { Injectable } from '@angular/core';
import {GlobalUrl} from "../globalUrl";
import { Http, Headers } from "@angular/http";
import { Province } from "./province";
import "rxjs/add/operator/map";

@Injectable()
export class ProvinceService {


  private _url: string = GlobalUrl.url;

  constructor(private _http: Http) { }

  addProvince(province:Province){
    var json = JSON.stringify(province);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this._url +'/province'  , json, {headers: headers})
      .map(res => res.json());
  }

  updateProvince(province:Province){
    var json = JSON.stringify(province);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put(this._url +'/province', json, {headers: headers})
      .map(res=>res.json());
  }

  deleteProvince(id:string){
    console.log(this._url+ '/province/'+id);
    return this._http.delete(this._url+ '/province/'+id)
      .map(res => res.json());
  }

  getProvince(id:string){
    return this._http.get(this._url +'/province/'+id)
      .map(response=>response.json());
  }

  getProvinces(){
    return this._http.get(this._url +'/province')
      .map(response=>response.json());
  }

  getTotalSum(provinceId:string ,  pId:string){

    return this._http.get(this._url +'/province/totalSum/'+provinceId+'/'+pId)
      .map(response=>response.json());
  }

}
