import { Injectable } from '@angular/core';
import {GlobalUrl} from "../globalUrl";
import {Http, Headers} from "@angular/http";
import {Expert} from "./expert";
import {Village} from "../village/village";
import {AllocatedProduct} from "../allocated-product/allocatedProduct";

@Injectable()
export class ExpertService {

  private _url: string = GlobalUrl.url;

  constructor(private _http: Http) { }

  addExpert(expert:Expert, serviceCenterId:string){
    var json = JSON.stringify(expert);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this._url +'/expert/'+serviceCenterId  , json, {headers: headers})
      .map(res => res.json());
  }

  updateExpert(expert:Expert){
    var json = JSON.stringify(expert);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put(this._url +'/expert', json, {headers: headers})
      .map(res=>res.json());
  }

  deleteExpert(nationlCode:string){
    return this._http.delete(this._url+ '/expert/'+nationlCode)
      .map(res => res.json());
  }

  getExpert(expertId:string){
    return this._http.get(this._url +'/expert/'+expertId)
      .map(response=>response.json());
  }

  getExperts(){
    return this._http.get(this._url +'/expert')
      .map(response=>response.json());
  }

  addVillages(villages:Array<Village>, expertId:string){
    var json = JSON.stringify(villages);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this._url +'/village/'+expertId  , json, {headers: headers})
      .map(res => res.json());
  }
  addAllocated(allocated:AllocatedProduct, expertId:string){
    var json = JSON.stringify(allocated);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this._url +'/allocatedProduct/'+expertId  , json, {headers: headers})
      .map(res => res.json());
  }
  deleteVillage(villageId:string){
    return this._http.delete(this._url+ '/village/'+villageId)
      .map(res => res.json());
  }

  deleteAllocatedProduct(alProId:string){
    return this._http.delete(this._url+ '/allocatedProduct/'+alProId)
      .map(res => res.json());
  }

}
