import {Component, OnInit} from "@angular/core";
import {AllocatedProduct} from "../allocated-product/allocatedProduct";
import {Expert} from "./expert";
import {ExpertService} from "./expert.service";
import {ProvinceService} from "../province/province.service";
import {Province} from "../province/province";
import {TownShip} from "../town-ship/TownShip";
import {ServiceCenter} from "../service-center/serviceCenter";
import {TownShipService} from "../town-ship/town-ship.service";
import {ServiceCenterService} from "../service-center/service-center.service";
import {ProductService} from "../product/product.service";
@Component({
  templateUrl:'./allocatedProductList.html'
})

export class AllocatedProductList implements OnInit {
  experts: Array<Expert>;
  expertId: string;
  allocatedProducts: Array<AllocatedProduct>;
  expert: Expert;
  private provinces:Array<Province>;
  private townShips:Array<TownShip>;
  private serviceCenters:Array<ServiceCenter>;
  private province:Province;
  private serviceCenterId:string;
  private townShip:TownShip;
  private serviceCenter:ServiceCenter;

  constructor( private provinceService:ProvinceService,
               private expertService: ExpertService,
               private townShipService:TownShipService,
               private serviceCenterService:ServiceCenterService,
               private productService:ProductService,
  ) {
  }

  ngOnInit() {
    this.provinceService.getProvinces().subscribe(res=> {
      this.provinces = res;
      this.townShips = this.provinces[0].townShipList;
      this.serviceCenters=this.townShips[0].serviceCenterList;
      this.experts=this.serviceCenters[0].expertList;
      this.expertId=this.experts[0].nationalCode;
      this.allocatedProducts = this.experts[0].allocatedProductList;
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
        this.allocatedProducts = this.experts[0].allocatedProductList;
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
      this.allocatedProducts = this.experts[0].allocatedProductList;
    });
  }

  getAllExperts(event) {
    this.serviceCenterId = event;
    this.serviceCenterService.getServiceCenter(this.serviceCenterId).subscribe(res=> {
      this.serviceCenter = res;
      this.experts=this.serviceCenter.expertList;
      this.expertId=this.experts[0].nationalCode;
      this.allocatedProducts = this.experts[0].allocatedProductList;
    });
  }


  setExpert(value) {
    this.expertId = value;
    this.expertService.getExpert(this.expertId).subscribe(res => {
      this.expert = res;
      this.allocatedProducts = this.expert.allocatedProductList;
    });
  }

  deleteAllocated(id){
    if(confirm('آیا از حذف اطمینان دارید؟')) {
      this.expertService.deleteAllocatedProduct(id).subscribe(res=> {
        this.allocatedProducts=null;
        this.expert= res;
        this.allocatedProducts=this.expert.allocatedProductList;
      });
    }

  }
}
