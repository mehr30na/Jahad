import {Component} from "@angular/core";
import {Province} from "../province/province";
import {TownShip} from "../town-ship/TownShip";
import {ServiceCenter} from "../service-center/serviceCenter";
import {Expert} from "./expert";
import {Village} from "../village/village";
import {Router} from "@angular/router";
import {TownShipService} from "../town-ship/town-ship.service";
import {ProvinceService} from "../province/province.service";
import {ServiceCenterService} from "../service-center/service-center.service";
import {ExpertService} from "./expert.service";
import {ProductService} from "../product/product.service";
import {Product} from "../product/product";
import {AllocatedProduct} from "../allocated-product/allocatedProduct";
declare var swal:any;

@Component({
  selector:'',
  templateUrl:'allocatingProduct.component.html'
})

export class AllocatingProductComponent{
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
  expertId:string;
  allocatedProduct=new AllocatedProduct();
  newVillages:Array<Village>=[];
  products:Array<Product>;
  private showLoader: boolean;

  constructor(private router:Router,
              private townShipService:TownShipService,
              private provinceService:ProvinceService,
              private serviceCenterService:ServiceCenterService,
              private expertService:ExpertService,
              private productService:ProductService) {
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
    this.productService.getProducts().subscribe(res=>{
      this.products=res;
      this.allocatedProduct.product=this.products[0];
      this.showLoader = false;
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
        this.showLoader = false;
      }else{
        this.experts = [];
      }
    });
  }

  setExpert(event){
    this.expertId=event;
  }

  setProduct(item:string){
    this.allocatedProduct.product.id=item;
  }

  onChange(value){
    this.allocatedProduct.area=value;
  }

  addAllocated(){
    this.showLoader = true;
    this.expertService.addAllocated(this.allocatedProduct, this.expertId).subscribe(res=> {
      this.allocatedProduct=res;
      swal(
        'متراژ مجاز با موفقیت افزوده شد!',
        'لطفا دکمه OK را بزنید',
        'success'
      );
      this.router.navigateByUrl('/main/ProductList');
      this.showLoader = false;
    });
  }
}
