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
import {Village} from "../village/village";

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
  private townShipId:string;
  private serviceCenter:ServiceCenter;
  private provinceId: string;
  private villages: Array<Village>;
  private showLoader: boolean;

  constructor( private provinceService:ProvinceService,
               private expertService: ExpertService,
               private townShipService:TownShipService,
               private serviceCenterService:ServiceCenterService,
               private productService:ProductService,
  ) {
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
                    this.allocatedProducts = this.experts[0].allocatedProductList;
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
            this.showLoader = false;
            this.experts = [];
          }

        });
      }else {
        this.showLoader = false;
        this.serviceCenters = [];
        this.experts = [];
      }
    });

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
        this.showLoader = false;
        this.experts = [];
      }
    });
    // this.showLoader = false;
  }

  getAllExperts(event) {
    this.showLoader = true;
    this.expertService.getExperts(event).subscribe(res=> {
      this.experts = res;
      if(this.experts.length>0){
        this.expertId = this.experts[0].nationalCode;
          this.allocatedProducts = this.experts[0].allocatedProductList;
          this.showLoader = false;
      }else{
        this.experts = [];
      }
    });
  }


  setExpert(value) {
    this.showLoader = true;
    this.expertId = value;
    this.expertService.getExpert(this.expertId).subscribe(res => {
      this.allocatedProducts = res.allocatedProductList;
      this.showLoader = false;
    });
  }

  deleteAllocated(id){
    this.showLoader = true;
    if(confirm('آیا از حذف اطمینان دارید؟')) {
      this.expertService.deleteAllocatedProduct(id).subscribe(res=> {
        this.allocatedProducts=null;
        this.expert= res;
        this.allocatedProducts=this.expert.allocatedProductList;
        this.showLoader = false;
      });
    }

  }
}
