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

  constructor(private router:Router,
              private townShipService:TownShipService,
              private provinceService:ProvinceService,
              private serviceCenterService:ServiceCenterService,
              private expertService:ExpertService,
              private productService:ProductService) {
  }

  ngOnInit() {
    this.provinceService.getProvinces().subscribe(res=> {
      this.provinces = res;
      this.provinceId = this.provinces[0].id;
      this.townShips = this.provinces[0].townShipList;
      this.serviceCenters=this.townShips[0].serviceCenterList;
      this.serviceCenterId=this.serviceCenters[0].id;
      this.experts=this.serviceCenters[0].expertList;
      this.expertId=this.experts[0].nationalCode;
    });
    this.productService.getProducts().subscribe(res=>{
      this.products=res;
      this.allocatedProduct.product=this.products[0];
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
    });
  }

  getAllExperts(event) {
    this.serviceCenterId = event;
    this.serviceCenterService.getServiceCenter(this.serviceCenterId).subscribe(res=> {
      this.serviceCenter = res;
      this.experts=this.serviceCenter.expertList;
      this.expertId=this.experts[0].nationalCode;
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
    this.expertService.addAllocated(this.allocatedProduct, this.expertId).subscribe(res=> {
      this.allocatedProduct=res;
      swal(
        'متراژ مجاز با موفقیت افزوده شد!',
        'لطفا دکمه OK را بزنید',
        'success'
      );
      this.router.navigateByUrl('/main/experts');
    });
  }
}
