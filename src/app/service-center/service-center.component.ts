import { Component, OnInit } from '@angular/core';
import {TownShip} from "../town-ship/TownShip";
import {Province} from "../province/province";
import {ActivatedRoute} from "@angular/router";
import {ProvinceService} from "../province/province.service";
import {ServiceCenter} from "./serviceCenter";
import {ServiceCenterService} from "./service-center.service";
import {TownShipService} from "../town-ship/town-ship.service";
import {Expert} from "../expert/expert";

@Component({
  selector: 'app-service-center',
  templateUrl: './service-center.component.html',
  styleUrls: ['./service-center.component.css']
})
export class ServiceCenterComponent implements OnInit {
  provinces:Array<Province>;
  province: Province;
  townShips:Array<TownShip>;
  townShip:TownShip;
  serviceCenters:Array<ServiceCenter>=[];
  newCenters:Array<ServiceCenter>=[];
  response:string;
  provinceId: string;
  townShipId:string;
  expert:Expert;
  experts:Array<Expert>;

  constructor(private _route:ActivatedRoute,
              private townShipService:TownShipService,
              private provinceService:ProvinceService,
              private serviceCenterService:ServiceCenterService,
  ) { }

  ngOnInit() {
    this.provinceService.getProvinces().subscribe(res=>{
      this.provinces = res;
      this.provinceId = this.provinces[0].id;
      this.townShips = this.provinces[0].townShipList;
      this.townShipId = this.townShips[0].id;
      this.getAllServiceCenters(this.townShipId);
    });
  }

  getAllTownShips(event){
    this.provinceService.getProvince(event).subscribe(res=> {
      this.province = res;
      this.townShips = this.province.townShipList;
      this.townShipId = this.townShips[0].id;
      if(this.townShipId){
        this.getAllServiceCenters(this.townShipId);
      }
    });
  }
  getAllServiceCenters(event){
    this.townShipId=event;
    this.townShipService.getTownShip(event).subscribe(res=> {
      this.townShip = res;
      this.serviceCenters = this.townShip.serviceCenterList;
    });
  }

  deleteCenter(id:string){
    if(confirm('آیا از حذف اطمینان دارید؟')) {
      this.serviceCenterService.deleteServiceCenter(id).subscribe(res=> {
        this.serviceCenters = null;
        this.townShip = res;
        this.serviceCenters = this.townShip.serviceCenterList;
      });
    }
  }


}
