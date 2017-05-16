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
  private expertId: string;
  private showLoader: boolean;

  constructor(private _route:ActivatedRoute,
              private townShipService:TownShipService,
              private provinceService:ProvinceService,
              private serviceCenterService:ServiceCenterService,
              private expertService:ExpertService) {
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
          this.showLoader = false;
          this.serviceCenterService.getServiceCenters(this.townShipId).subscribe(res3 => {
            this.serviceCenters = res3;
            if (this.serviceCenters.length > 0) {
              this.serviceCenterId = this.serviceCenters[0].id;
              this.expertService.getExperts(this.serviceCenterId).subscribe(res => {
                this.experts = res;
                if (this.experts.length > 0) {
                  this.expertId = this.experts[0].nationalCode;
                  console.log(this.experts);
                  this.showLoader = false;
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
      // this.townShips = this.provinces[0].townShipList;
      // this.townShipId = this.townShips[0].id;
      // this.serviceCenters=this.townShips[0].serviceCenterList;
      // this.experts=this.serviceCenters[0].expertList;
      // this.serviceCenterId=this.serviceCenters[0].id;


  getAllTownShips(event) {
    this.showLoader = true;
    this.townShipService.getTownShips(event).subscribe(res2=> {
      this.townShips = res2;
      if(this.townShips.length>0) {
        this.townShipId = this.townShips[0].id;
        this.serviceCenterService.getServiceCenters(this.townShipId).subscribe(res3 => {
          this.serviceCenters = res3;
          if(this.serviceCenters.length>0){
            this.getAllExperts(this.serviceCenters[0].id);
            this.showLoader = false;
          }else{
            this.experts = [];
            this.showLoader = false;
          }

        });
      }else{
        this.serviceCenters = [];
        this.experts = [];
        this.showLoader = false;
      }
    });
    // this.provinceService.getProvince(event).subscribe(res=> {
    //   this.province = res;
    //   this.townShips=[];
    //   this.serviceCenters=[];
    //   if(this.province.townShipList.length>0)
    //     this.townShips = this.province.townShipList;
    //   if(this.townShips[0].serviceCenterList.length>0) {
    //     this.serviceCenters = this.townShips[0].serviceCenterList;
    //     this.serviceCenterId = this.serviceCenters[0].id;
    //   }
    //   if(this.serviceCenters[0].expertList.length>0)
    //     this.experts=this.serviceCenters[0].expertList;
    //
    // });
  }

  getAllServiceCenters(event) {
    this.showLoader = true;
    this.serviceCenterService.getServiceCenters(event).subscribe(res3 => {
      this.serviceCenters = res3;
      if(this.serviceCenters.length>0){
        this.getAllExperts(this.serviceCenters[0].id);
      }else{
        this.experts = [];
        this.showLoader = false;
      }
    });
    // this.townShipService.getTownShip(event).subscribe(res=> {
    //   this.townShip = res;
    //   this.serviceCenters=[];
    //   this.serviceCenters = this.townShip.serviceCenterList;
    //   this.serviceCenterId = this.serviceCenters[0].id;
    //   this.experts=this.serviceCenters[0].expertList;
    // });

}

  getAllExperts(event) {
    this.showLoader = true;
    this.expertService.getExperts(event).subscribe(res=> {
      this.experts = res;
      this.showLoader = false;
    });
  }

  deleteExpert(id:string) {
    this.showLoader = true;
    if(confirm('آیا از حذف اطمینان دارید؟')) {
      this.expertService.deleteExpert(id).subscribe(res=> {
        this.experts=null;
        this.serviceCenter = res;
        this.experts=this.serviceCenter.expertList;
        this.showLoader = false;
      });
    }
  }

  getOneExpert(id) {
    this.showLoader = true;
    this.expertService.getExpert(id).subscribe(res=> {
      this.expert = res;
      this.showLoader = false;
    });
  }

}
