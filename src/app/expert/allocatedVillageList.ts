import {Component, OnInit} from "@angular/core";
import {ExpertService} from "./expert.service";
import {Expert} from "./expert";
import {Village} from "../village/village";
import {ProvinceService} from "../province/province.service";
import {Province} from "../province/province";
import {TownShip} from "../town-ship/TownShip";
import {ServiceCenter} from "../service-center/serviceCenter";
import {TownShipService} from "../town-ship/town-ship.service";
import {ServiceCenterService} from "../service-center/service-center.service";
@Component({
  templateUrl:'./allocatedVillageList.html'

})

export class AllocatedVillageList implements OnInit{

  private provinces:Array<Province>;
  private townShips:Array<TownShip>;
  private serviceCenters:Array<ServiceCenter>;
  private experts:Array<Expert>;
  private expert:Expert;
  private expertId:string;
  private villages:Array<Village>;
  private province:Province;
  private serviceCenterId:string;
  private townShip:TownShip;
  private serviceCenter:ServiceCenter;

  constructor(private provinceService:ProvinceService,
              private townShipService:TownShipService,
              private serviceCenterService:ServiceCenterService,
              private expertService:ExpertService,
  ) {
  }

  ngOnInit(){
    this.provinceService.getProvinces().subscribe(res=> {
      this.provinces = res;
      this.townShips = this.provinces[0].townShipList;
      this.serviceCenters=this.townShips[0].serviceCenterList;
      this.experts=this.serviceCenters[0].expertList;
      this.expertId=this.experts[0].nationalCode;
      this.villages=this.experts[0].villageList;
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
      if(this.serviceCenters[0].expertList.length>0) {
        this.experts = this.serviceCenters[0].expertList;
        this.expertId=this.experts[0].nationalCode;
        this.villages = this.experts[0].villageList;
      }
    });
  }

  getAllServiceCenters(event) {
    this.townShipService.getTownShip(event).subscribe(res=> {
      this.townShip = res;
      this.serviceCenters=[];
      this.serviceCenters = this.townShip.serviceCenterList;
      this.serviceCenterId = this.serviceCenters[0].id;
      this.experts=this.serviceCenters[0].expertList;
      this.expertId=this.experts[0].nationalCode;
      this.villages = this.experts[0].villageList;
    });
  }

  getAllExperts(event) {
    this.serviceCenterId = event;
    this.serviceCenterService.getServiceCenter(this.serviceCenterId).subscribe(res=> {
      this.serviceCenter = res;
      this.experts=this.serviceCenter.expertList;
      this.expertId=this.experts[0].nationalCode;
      this.villages = this.experts[0].villageList;
    });
  }

  setExpert(value){
    console.log(value);
    this.expertId=value;
    this.expertService.getExpert(this.expertId).subscribe(res=>{
      this.expert=res;
      console.log(this.expert);
      this.villages=this.expert.villageList;
    });
  }

  deleteVillage(id){
    if(confirm('آیا از حذف اطمینان دارید؟')) {
      this.expertService.deleteVillage(id).subscribe(res=> {
        this.villages=null;
        this.expert= res;
        this.villages=this.expert.villageList;
      });
    }

  }


}
