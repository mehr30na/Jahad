/**
 * Created by Zar on 3/30/2017.
 */
import { Injectable } from '@angular/core';
import {GlobalUrl} from "../globalUrl";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class DownloadPdfService {
  private _url: string = GlobalUrl.url;
  private response: string;

  constructor(private _http: Http) { }

  downloadP(id,pid) {
    return this._http.get(this._url +'/province/excel/'+id+'/'+pid)
      .map(response=>response.json());
  }

  downloadT(tid,pid) {
    return this._http.get(this._url +'/townShip/excel/'+tid+'/'+pid)
      .map(response=>response.json());
  }
  downloadS(sid,pid) {
    return this._http.get(this._url +'/serviceCenter/excel/'+sid+'/'+pid)
      .map(response=>response.json());
  }
  downloadE(eid,pid) {
    return this._http.get(this._url +'/expert/excel/'+eid+'/'+pid)
      .map(response=>response.json());
  }

  deleteItem(infieldId){
    console.log("delete");
    return this._http.delete(this._url+ '/infield/'+infieldId)
      .map(res => res.json());
  }

  deleteItemMoshabeh(infieldId){
    console.log("delete");
    return this._http.delete(this._url+ '/infield/duplicate/'+infieldId)
      .map(res => res.json());
  }

}
