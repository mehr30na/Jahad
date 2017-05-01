import {Component, OnInit} from "@angular/core";
import {Province} from "../province/province";
import {ServiceCenter} from "../service-center/serviceCenter";
import {TownShip} from "../town-ship/TownShip";
import {Router} from "@angular/router";
import {TownShipService} from "../town-ship/town-ship.service";
import {ProvinceService} from "../province/province.service";
import {ServiceCenterService} from "../service-center/service-center.service";
import {Expert} from "./expert";
import {ExpertService} from "./expert.service";
declare var swal:any;


@Component({
  selector: '',
  templateUrl: './addExpert.component.html'
})

export class AddExpertComponent implements OnInit {
  province:Province;
  provinceId:string;
  provinces:Array<Province>;
  townShipId:string;
  townShip:TownShip;
  townShips:Array<TownShip>;
  serviceCenters:Array<ServiceCenter>;
  serviceCenterId:string;
  expert:Expert;

  constructor(private router:Router,
              private townShipService:TownShipService,
              private provinceService:ProvinceService,
              private expertService:ExpertService) {
  }


  ngOnInit() {
    this.provinceService.getProvinces().subscribe(res=> {
      this.provinces = res;
      this.townShips = this.provinces[0].townShipList;
      this.serviceCenters = this.townShips[0].serviceCenterList;
      // this.provinceId = this.provinces[0].id;
      // this.townShipId = this.townShips[0].id;
      this.serviceCenterId = this.serviceCenters[0].id;
    });
    this.expert = new Expert();
  }

  getAllTownShips(event) {
    this.provinceService.getProvince(event).subscribe(res=> {
      this.province = res;
      this.townShips=[];
      this.serviceCenters=[];
      if(this.province.townShipList.length>0)
      this.townShips = this.province.townShipList;
      // for(let township of this.townShips){
      //   this.serviceCenters=township.serviceCenterList;
      if(this.townShips[0].serviceCenterList.length>0) {
        this.serviceCenters = this.townShips[0].serviceCenterList;
        this.serviceCenterId = this.serviceCenters[0].id;
      }
        // }

    });
  }

  getAllServiceCenters(event) {
    this.townShipService.getTownShip(event).subscribe(res=> {
      this.townShip = res;
      this.serviceCenters=[];
      this.serviceCenters = this.townShip.serviceCenterList;
      this.serviceCenterId = this.serviceCenters[0].id;
      console.log(event);
    });
  }

  setServiceCenter(event) {
    console.log(event);
    this.serviceCenterId = event;
  }

  addExperts() {
    this.expertService.addExpert(this.expert, this.serviceCenterId).subscribe(res=> {
      this.expert = res;
      swal(
        'کارشناس با موفقیت افزوده شد!',
        'لطفا دکمه OK را بزنید',
        'success'
      );
      this.router.navigateByUrl('experts');
    });
    this.expert = null;
  }

  onChangeL(value){
    this.expert.lastName=value;
  }
  onChangeF(value){
    this.expert.firstName=value;
  }
  onChangeC(value){
    this.expert.nationalCode=value;
  }
  onChangeP(value){
    this.expert.phoneNumber=value;
  }
  onChangeE(value){
    this.expert.email=value;
  }
  onChangePass(value){
    this.expert.password=value;
  }
}
