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
  private showLoader: boolean;

  constructor(private _route:ActivatedRoute,
              private townShipService:TownShipService,
              private provinceService:ProvinceService,
              private serviceCenterService:ServiceCenterService,
  ) { }

  ngOnInit() {
    this.showLoader = true;
    this.provinceService.getProvinces().subscribe(res=> {
      this.provinces = res;
      this.provinceId = this.provinces[0].id;
      this.townShipService.getTownShips(this.provinceId).subscribe(res2 => {
        this.townShips = res2;
        this.townShipId = this.townShips[0].id;
        this.getAllServiceCenters(this.townShipId);
      });
      // this.townShips = this.provinces[0].townShipList;
    });
  }

  getAllTownShips(event){
    this.showLoader = true;
    this.townShipService.getTownShips(event).subscribe(res=> {
      this.townShips = res;
      this.townShipId = this.townShips[0].id;
      if(this.townShipId){
        this.getAllServiceCenters(this.townShipId);
        this.showLoader = false;
      }
    });
  }
  getAllServiceCenters(event){
    this.showLoader = true;
    this.serviceCenterService.getServiceCenters(event).subscribe(res=>{
      this.serviceCenters = res;
      this.showLoader = false;
    });

    // this.townShipService.getTownShip(event).subscribe(res=> {
    //   this.townShip = res;
    //   this.serviceCenters = this.townShip.serviceCenterList;
    // });
  }

  deleteCenter(id:string){
    this.showLoader = true;
    if(confirm('آیا از حذف اطمینان دارید؟')) {
      this.serviceCenterService.deleteServiceCenter(id).subscribe(res=> {
        this.serviceCenters = null;
        this.townShip = res;
        this.serviceCenters = this.townShip.serviceCenterList;
        this.showLoader = false;
      });
    }
  }


}
