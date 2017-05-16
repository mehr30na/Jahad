import { Injectable } from '@angular/core';
import {GlobalUrl} from "../globalUrl";
import {Http, Headers} from "@angular/http";
import {Product} from "./product";

@Injectable()
export class ProductService {

  private _url: string = GlobalUrl.url;

  constructor(private _http: Http) { }

  addProduct(product:Array<Product>){
    var json = JSON.stringify(product);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this._url +'/product'  , json, {headers: headers})
      .map(res => res.json());
  }

  updateProduct(Product:Product){
    var json = JSON.stringify(Product);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put(this._url +'/product', json, {headers: headers})
      .map(res=>res.json());
  }

  deleteProduct(id:string){
    return this._http.delete(this._url+ '/product/'+id)
      .map(res => res.json());
  }

  getProduct(id:string){
    return this._http.get(this._url +'/product/'+id)
      .map(response=>response.json());
  }

  getProducts(){
    return this._http.get(this._url +'/product')
      .map(response=>response.json());
  }

  getAllocatedProducts(expertId){
    return this._http.get(this._url +'/product/parent/'+expertId)
      .map(response=>response.json());
  }


}
