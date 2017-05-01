/**
 * Created by Zar on 2/22/2017.
 */
import {Component, OnInit} from "@angular/core";
import {Province} from "../province/province";
import {Router} from "@angular/router";

import {ProvinceService} from "../province/province.service";
import {TownShipService} from "../town-ship/town-ship.service";
import {ServiceCenter} from "./serviceCenter";
import {ServiceCenterService} from "./service-center.service";
import {TownShip} from "../town-ship/TownShip";

declare var swal:any;

@Component({
  selector: '',
  templateUrl: './addServiceCenter.component.html'
})

export class AddServiceCenterComponent implements OnInit{
  province:Province;
  provinceId:string;
  provinces:Array<Province>;
  newServiceCenter:ServiceCenter;
  newServiceCenters:Array<ServiceCenter>=[];
  serviceCente: ServiceCenter;
  serviceCenters: Array<ServiceCenter>=[];
  townShipId: string;
  townShips: Array<TownShip>;


  constructor(private router:Router,
              private townShipService:TownShipService,
              private provinceService:ProvinceService,
              private serviceCenterService:ServiceCenterService
){ }


  ngOnInit() {
    this.provinceService.getProvinces().subscribe(res=>{
      this.provinces = res;
      this.townShips = this.provinces[0].townShipList;
      this.townShipId= this.townShips[0].id;
      this.provinceId=this.provinces[0].id;
    });
    this.serviceCente = new ServiceCenter();
    this.newServiceCenters.push(this.serviceCente);
  }

  getAllTownShips(event){
    this.provinceService.getProvince(event).subscribe(res=> {
      this.province = res;
      this.townShips = this.province.townShipList;
      this.townShipId= this.townShips[0].id;
    });
  }

  setTownShip(event) {
      this.townShipId=event;
  }

  addServiceCenters(){
    this.serviceCenterService.addServiceCenter(this.newServiceCenters, this.townShipId).subscribe(res=> {
      this.newServiceCenters=res;
      if(this.newServiceCenters) {
        swal(
          'مرکز سرویس با موفقیت افزوده شد!',
          'لطفا دکمه OK را بزنید',
          'success'
        );
        this.router.navigateByUrl('serviceCenters');
        this.newServiceCenters=null;
        // let newTS=new ServiceCenter();
        // newTS.title="";
        // this.newServiceCenters.push(newTS);
      }
    });
    // for(let i=0;i<this.newTownShips.length;i++){
    //   this.newTownShips.splice(i,1);
    // }
  }

  deleteServiceCenter(i){
    this.newServiceCenters.splice(i,1);
  }

  onChange(value,i){
    this.newServiceCenters[i].title=value;
  }

  newServiceCenterArray(){
    let newTS=new ServiceCenter();
    this.newServiceCenters.push(newTS);
  }


}
