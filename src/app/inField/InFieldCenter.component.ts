/**
 * Created by mehr30na on 3/17/17.
 */
import {Component} from "@angular/core";
import {Province} from "../province/province";
import {TownShip} from "../town-ship/TownShip";
import {ServiceCenter} from "../service-center/serviceCenter";
import {Expert} from "../expert/expert";
import {Router} from "@angular/router";
import {TownShipService} from "../town-ship/town-ship.service";
import {ProvinceService} from "../province/province.service";
import {Product} from "../product/product";
import {ProductService} from "../product/product.service";
import {DownloadPdfService} from "./inFieldService";
@Component({
  templateUrl: './InFieldCenter.component.html'
})

export class InFieldCenter {
  province:Province;
  provinces:Array<Province>;
  townShip:TownShip;
  townShips:Array<TownShip>;
  serviceCenters:Array<ServiceCenter>;
  serviceCenter:ServiceCenter;
  serviceCenterId:string;
  experts:Array<Expert>;
  selectedProduct:string;
  products:Array<Product> = [];
  displayData:Array<any> = [];
  total:number = 0;
  temp: Array<any>=[];
  revert: Array<any>;
  private downloadUrl: string;
  private res1: boolean=false;

  constructor(private router:Router,
              private productService:ProductService,
              private townShipService:TownShipService,
              private provinceService:ProvinceService,
              private downloadPdfService: DownloadPdfService
  ) {
  }


  ngOnInit() {
    this.provinceService.getProvinces().subscribe(res=> {
      this.provinces = res;
      this.townShips = this.provinces[0].townShipList;
      this.serviceCenters = this.townShips[0].serviceCenterList;
      this.serviceCenterId=this.serviceCenters[0].id;
      this.experts=this.serviceCenters[0].expertList;
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
      if (this.province.townShipList.length > 0)
        this.townShips = this.province.townShipList;
      if (this.townShips[0].serviceCenterList.length > 0) {
        this.serviceCenters = this.townShips[0].serviceCenterList;
        this.serviceCenterId = this.serviceCenters[0].id;
        this.experts=this.serviceCenters[0].expertList;
        // this.total=0;
        // this.displayData=[];
        this.displayTable();
      }
    });
  }

  getAllServiceCenters(event) {
    this.res1=false;
    this.townShipService.getTownShip(event).subscribe(res=> {
      this.townShip = res;
      // this.serviceCenters = [];
      this.serviceCenters = this.townShip.serviceCenterList;
      this.serviceCenterId = this.serviceCenters[0].id;
      this.experts=this.serviceCenters[0].expertList;
      // this.total=0;
      // this.displayData=[];
      this.displayTable();
    });
  }

  setServiceCenter(event:string) {
    this.res1=false;
    this.serviceCenterId = event;
    for (let center of this.serviceCenters) {
      if (this.serviceCenterId == center.id) {
        this.serviceCenter = center;
        this.experts = this.serviceCenter.expertList;
        // this.total=0;
        // this.displayData=[];
        this.displayTable();
      }
    }
  }

  setProduct(item:string) {
    this.res1=false;
    this.selectedProduct = item;
    // this.total=0;
    // this.displayData=[];
    this.displayTable();
  }

  displayTable() {
    this.total=0;
    this.displayData=[];
      for (let expert of this.experts) {
        for (let village of expert.villageList) {
          for (let infield of village.infieldList) {
            if (infield.product.id == this.selectedProduct) {
              let option = [
                expert.firstName + ' ' + expert.lastName + ' (' + expert.nationalCode + ')',
                village.title,
                infield.farmerFirstName + ' ' + infield.farmerLastName,
                infield.farmerFatherName,
                infield.farmerPhoneNumber,
                infield.farmLongitude + '-' + infield.farmLatitude,
                infield.infieldArea,
                infield.date
              ];
              this.displayData.push(option);
              this.total = this.total + infield.infieldArea;
            }
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


  DownloadPdf(sid,pid){
    this.downloadPdfService.downloadS(sid,pid).subscribe(res=> {
      this.downloadUrl= res.url;
      console.log(this.downloadUrl);
      this.res1=true;
    });
  }

}
