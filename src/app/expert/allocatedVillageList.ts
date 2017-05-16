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
import {VillageService} from "../village/village.service";
@Component({
  templateUrl: './allocatedVillageList.html'

})

export class AllocatedVillageList implements OnInit {

  private provinces: Array<Province>;
  private townShips: Array<TownShip>;
  private serviceCenters: Array<ServiceCenter>;
  private experts: Array<Expert>;
  private expert: Expert;
  private expertId: string;
  private villages: Array<Village>;
  private province: Province;
  private serviceCenterId: string;
  private townShip: TownShip;
  private townShipId: string;
  private serviceCenter: ServiceCenter;
  private provinceId: string;
  private showLoader: boolean;

  constructor(private provinceService: ProvinceService,
              private townShipService: TownShipService,
              private serviceCenterService: ServiceCenterService,
              private expertService: ExpertService,
              private villageService: VillageService) {
  }

  ngOnInit() {
    this.showLoader = true;
    this.provinceService.getProvinces().subscribe(res=> {
      this.provinces = res;
      this.provinceId = this.provinces[0].id;
      this.townShipService.getTownShips(this.provinceId).subscribe(res2=>{
        this.townShips = res2;
        if(this.townShips.length > 0 ) {
          this.townShipId = this.townShips[0].id;
          // this.showLoader = false;
          this.serviceCenterService.getServiceCenters(this.townShipId).subscribe(res3 => {
            this.serviceCenters = res3;
            if (this.serviceCenters.length > 0) {
              this.serviceCenterId = this.serviceCenters[0].id;
              this.expertService.getExperts(this.serviceCenterId).subscribe(res => {
                this.experts = res;
                if (this.experts.length > 0) {
                  this.expertId = this.experts[0].nationalCode;
                  this.villageService.getVillages(this.expertId).subscribe(res5 => {
                    this.villages = res5;
                    this.showLoader = false;
                  });
                }
              });
            }
          });
        } else {
          this.showLoader = false
        }
      });
    });
  }

  getAllTownShips(event) {
    this.showLoader = true;
    this.townShipService.getTownShips(event).subscribe(res2=> {
      this.townShips = res2;
      if(this.townShips.length>0) {
        this.townShipId = this.townShips[0].id;
        this.serviceCenterService.getServiceCenters(this.townShipId).subscribe(res3 => {
          this.serviceCenters = res3;
          if(this.serviceCenters.length>0){
            this.serviceCenterId = this.serviceCenters[0].id;
            this.getAllExperts(this.serviceCenterId );
            this.showLoader = false;
          }else{
            this.experts = [];
          }

        });
      }else {
        this.serviceCenters = [];
        this.experts = [];
      }
    });
    this.showLoader = false;
  }

  getAllServiceCenters(event) {
    this.showLoader = true;
    this.serviceCenterService.getServiceCenters(event).subscribe(res3 => {
      this.serviceCenters = res3;
      if(this.serviceCenters.length>0){
        this.serviceCenterId = this.serviceCenters[0].id;
        this.getAllExperts(this.serviceCenterId );
        this.showLoader = false;
      }else{
        this.experts = [];
      }
    });
    this.showLoader = false;
  }

  getAllExperts(event) {
    this.showLoader = true;
    this.expertService.getExperts(event).subscribe(res=> {
      this.experts = res;
      if(this.experts.length>0){
        this.expertId = this.experts[0].nationalCode;
        this.villageService.getVillages(this.expertId).subscribe(res=>{
          this.villages = res;
          this.showLoader = false;
        });
      }else{
        this.experts = [];
      }
    });
  }

  setExpert(value) {
    this.showLoader = true;
    console.log(value);
    this.expertId = value;
    this.villageService.getVillages(this.expertId).subscribe(res => {
      this.villages = res;
      this.showLoader = false;
    });
  }

  deleteVillage(id) {
    this.showLoader = true;
    if (confirm('آیا از حذف اطمینان دارید؟')) {
      this.expertService.deleteVillage(id).subscribe(res => {
        this.villages = null;
        this.expert = res;
        this.villages = this.expert.villageList;
        this.showLoader = false;
      });
    }

  }


}
