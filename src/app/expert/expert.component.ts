import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TownShipService} from "../town-ship/town-ship.service";
import {ProvinceService} from "../province/province.service";
import {ServiceCenterService} from "../service-center/service-center.service";
import {Province} from "../province/province";
import {TownShip} from "../town-ship/TownShip";
import {ServiceCenter} from "../service-center/serviceCenter";
import {ExpertService} from "./expert.service";
import {Expert} from "./expert";

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css']
})
export class ExpertComponent implements OnInit {

  provinces:Array<Province>;
  province:Province;
  townShips:Array<TownShip>;
  townShip:TownShip;
  serviceCenterId:string;
  serviceCenter:ServiceCenter;
  serviceCenters:Array<ServiceCenter> = [];
  response:string;
  provinceId:string;
  townShipId:string;
  expert:Expert;
  experts:Array<Expert>;

  constructor(private _route:ActivatedRoute,
              private townShipService:TownShipService,
              private provinceService:ProvinceService,
              private serviceCenterService:ServiceCenterService,
              private expertService:ExpertService) {
  }

  ngOnInit() {
    this.provinceService.getProvinces().subscribe(res=> {
      this.provinces = res;
      this.provinceId = this.provinces[0].id;
      this.townShips = this.provinces[0].townShipList;
      // this.townShipId = this.townShips[0].id;
      this.serviceCenters=this.townShips[0].serviceCenterList;
      this.experts=this.serviceCenters[0].expertList;
      this.serviceCenterId=this.serviceCenters[0].id;
    });
  }

  getAllTownShips(event) {
    this.provinceService.getProvince(event).subscribe(res=> {
      this.province = res;
      this.townShips=[];
      this.serviceCenters=[];
      if(this.province.townShipList.length>0)
        this.townShips = this.province.townShipList;
      if(this.townShips[0].serviceCenterList.length>0) {
        this.serviceCenters = this.townShips[0].serviceCenterList;
        this.serviceCenterId = this.serviceCenters[0].id;
      }
      if(this.serviceCenters[0].expertList.length>0)
        this.experts=this.serviceCenters[0].expertList;

    });
  }

  getAllServiceCenters(event) {
    this.townShipService.getTownShip(event).subscribe(res=> {
      this.townShip = res;
      this.serviceCenters=[];
      this.serviceCenters = this.townShip.serviceCenterList;
      this.serviceCenterId = this.serviceCenters[0].id;
      this.experts=this.serviceCenters[0].expertList;
    });
}

  getAllExperts(event) {
    this.serviceCenterId = event;
    this.serviceCenterService.getServiceCenter(this.serviceCenterId).subscribe(res=> {
      this.serviceCenter = res;
      this.experts=this.serviceCenter.expertList;
    });
  }

  deleteExpert(id:string) {
    if(confirm('آیا از حذف اطمینان دارید؟')) {
      this.expertService.deleteExpert(id).subscribe(res=> {
        this.experts=null;
        this.serviceCenter = res;
        this.experts=this.serviceCenter.expertList;
      });
    }
  }

  getOneExpert(id) {
    this.expertService.getExpert(id).subscribe(res=> {
      this.expert = res;
    });
  }

}
