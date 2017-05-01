import { Injectable } from '@angular/core';
import {GlobalUrl} from "../globalUrl";
import {Http, Headers} from "@angular/http";
import {ServiceCenter} from "./serviceCenter";

@Injectable()
export class ServiceCenterService {

  private _url: string = GlobalUrl.url;


  constructor(private _http: Http) { }

  addServiceCenter(serviceCenter:Array<ServiceCenter>,townShipId:string){
    var json = JSON.stringify(serviceCenter);
    console.log(json);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this._url+'/serviceCenter/'+townShipId  , json, {headers: headers})
      .map(res => res.json());
  }

  updateServiceCenter(serviceCenter:ServiceCenter){
    var json = JSON.stringify(serviceCenter);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put(this._url +'/serviceCenter', json, {headers: headers})
      .map(res=>res.json());
  }

  deleteServiceCenter(id:string){
    return this._http.delete(this._url+ '/serviceCenter/'+id)
      .map(res => res.json());
  }

  getServiceCenters(){
    return this._http.get(this._url +'/serviceCenter')
      .map(response=>response.json());
  }

  getServiceCenter(serviceCenterId:string){
    return this._http.get(this._url +'/serviceCenter/'+serviceCenterId)
      .map(response=>response.json());
  }

}
