/**
 * Created by mehr30na on 3/17/17.
 */
import {Component} from "@angular/core";
import {Product} from "../product/product";
import {ServiceCenter} from "../service-center/serviceCenter";
import {Expert} from "../expert/expert";
import {TownShip} from "../town-ship/TownShip";
import {Province} from "../province/province";
import {Router} from "@angular/router";
import {TownShipService} from "../town-ship/town-ship.service";
import {ProvinceService} from "../province/province.service";
import {ServiceCenterService} from "../service-center/service-center.service";
import {Village} from "../village/village";
import {ProductService} from "../product/product.service";
import {DownloadPdfService} from "./inFieldService";

@Component({
  templateUrl: './InFieldExpert.component.html'
})

export class InFieldExpert {
  province = new Province();
  provinces:Array<Province> = [];
  townShip = new TownShip();
  townShips:Array<TownShip> = [];
  serviceCenters:Array<ServiceCenter> = [];
  serviceCenter = new ServiceCenter();
  serviceCenterId:string;
  experts:Array<Expert> = [];
  expert:Expert;
  selectedProduct:string;
  expertId:string;
  villages:Array<Village> = [];
  products:Array<Product> = [];
  displayData:Array<any> = [];
  total:number = 0;
  temp: Array<any>=[];
  revert: Array<any>;
  response:any;
  private downloadUrl: string;
  private res1: boolean=false;

  constructor(private router:Router,
              private productService:ProductService,
              private townShipService:TownShipService,
              private provinceService:ProvinceService,
              private serviceCenterService:ServiceCenterService,
              private downloadPdfService: DownloadPdfService) {}


  ngOnInit() {
    this.provinceService.getProvinces().subscribe(res=> {
      this.provinces = res;
      this.townShips = this.provinces[0].townShipList;
      this.serviceCenters = this.townShips[0].serviceCenterList;
      this.experts = this.serviceCenters[0].expertList;
      this.expertId= this.experts[0].nationalCode;
      this.villages = this.experts[0].villageList;
      this.productService.getProducts().subscribe(res=> {
        this.products = res;
        this.selectedProduct = this.products[0].id;
        this.displayTable();
      });
    });
  }

  getAllTownShips(event) {
    this.res1=false;
    this.provinceService.getProvince(event).subscribe(res=> {
      this.province = res;
      // this.townShips = [];
      // this.serviceCenters = [];
      // this.experts=[];
      // this.villages=[];
      if (this.province.townShipList.length > 0)
        this.townShips = this.province.townShipList;
      if (this.townShips[0].serviceCenterList.length > 0) {
        this.serviceCenters = this.townShips[0].serviceCenterList;
        this.serviceCenterId = this.serviceCenters[0].id;
      }
      if (this.serviceCenters[0].expertList.length > 0) {
        this.experts = this.serviceCenters[0].expertList;
        this.villages = this.experts[0].villageList;
        this.displayTable();
      }
    });
  }

  getAllServiceCenters(event) {
    this.res1=false;
    this.townShipService.getTownShip(event).subscribe(res=> {
      this.townShip = res;
      // this.serviceCenters = [];
      // this.experts=[];
      // this.villages=[];
      this.serviceCenters = this.townShip.serviceCenterList;
      this.serviceCenterId = this.serviceCenters[0].id;
      this.experts = this.serviceCenters[0].expertList;
      this.villages = this.experts[0].villageList;
      this.displayTable();
    });
  }

  getAllExperts(event) {
    this.res1=false;
    this.serviceCenterId = event;
    // this.experts=[];
    // this.villages=[];
    this.serviceCenterService.getServiceCenter(this.serviceCenterId).subscribe(res=> {
      this.serviceCenter = res;
      this.experts = this.serviceCenter.expertList;
      this.villages = this.experts[0].villageList;
      this.displayTable();
    });
  }

  setExpert(event) {
    this.res1=false;
    this.expertId = event;
    // this.villages=[];
    for (let expert of this.experts) {
      if (this.expertId == expert.nationalCode) {
        this.villages = expert.villageList;
        this.displayTable();
      }
    }
  }

  setProduct(item:string) {
    this.res1=false;
    this.selectedProduct = item;
    this.displayTable();
  }

  displayTable() {
    console.log(this.selectedProduct);
    this.total=0;
    this.displayData=[];
      for (let village of this.villages) {
        for (let infield of village.infieldList) {
          if (infield.product.id == this.selectedProduct) {
            let option = [
              infield.id,
              village.title,
              infield.farmerFirstName + ' ' + infield.farmerLastName,
              infield.farmerFatherName,
              infield.farmerPhoneNumber,
              infield.farmLongitude + '-' + infield.farmLatitude,
              infield.infieldArea,
              infield.date,
              infield.infieldArea
            ];
            this.displayData.push(option);
            this.total = this.total + infield.infieldArea;
          }
        }
      }
  }

  filter(s,e){
    this.revert = this.displayData;
    if(s!=null && e!=null) {
      for (let item of this.displayData) {
        if (item[8] <= e && item[8] >= s) {
          this.temp.push(item);
        }
      }
    }
    else if(s==null && e==null){
      if(this.temp!=[]){
        this.displayData = this.revert;
      }
    }
    else{
      for (let item of this.displayData) {
        if (item[8] <= e || item[8] >= s) {
          this.temp.push(item);
        }
      }
    }
    this.displayData = this.temp;
  }

  unfilter(){
    if(this.temp!=[]){
      this.displayData = this.revert;
    }
  }

  DownloadPdf(eid,pid){
    this.downloadPdfService.downloadE(eid,pid).subscribe(res=> {
      this.downloadUrl= res.url;
      console.log(this.downloadUrl);
      this.res1=true;
    });
  }

  deleteInField(index,item){
    this.villages=[];
    console.log(item[0]);
    this.downloadPdfService.deleteItem(item[0]).subscribe(resDel=>{
      this.villages=resDel;
      this.displayTable();
    });

}

}
