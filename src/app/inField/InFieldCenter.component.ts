/**
 * Created by mehr30na on 3/17/17.
 */
import {Component} from "@angular/core";
import {TownShip} from "../town-ship/TownShip";
import {Province} from "../province/province";
import {ServiceCenter} from "../service-center/serviceCenter";
import {Product} from "../product/product";
import {ProductService} from "../product/product.service";
import {ProvinceService} from "../province/province.service";
import {DownloadPdfService} from "./inFieldService";
import {TownShipService} from "../town-ship/town-ship.service";
import {ServiceCenterService} from "../service-center/service-center.service";
@Component({
  templateUrl: './InFieldCenter.component.html'
})

export class InFieldCenter {
  provinceId: string;
  townShips: Array<TownShip>;
  provinces: Array<Province>;
  province: Province;
  townShipId: string;
  townShip: TownShip;
  serviceCenters: Array<ServiceCenter>;
  products: Array<Product>;
  selectedProduct: string;
  displayData: Array<any> = [];
  total: number = 0;
  private totalSum: Array<any>=[];
  revert: Array<any> = [];
  temp: Array<any> = [];
  private downloadUrl: string;
  private res1: boolean = false;
  private sum: number;
  private showLoader: boolean;
  private serviceCenterId: string;
  private selectedserviceCenter: string;


  constructor(private productService: ProductService,
              private provinceService: ProvinceService,
              private downloadPdfService: DownloadPdfService,
              private townShipService: TownShipService,
              private serviceCenterService:ServiceCenterService
  ) {

  }

  ngOnInit() {
    this.showLoader = true;
    this.provinceService.getProvinces().subscribe(res => {
      this.provinces = res;
      this.provinceId = this.provinces[0].id;
      this.townShipService.getTownShips(this.provinceId).subscribe(res2 => {
        this.townShips = res2;
        if (this.townShips.length > 0) {
          this.townShipId = this.townShips[0].id;
          this.serviceCenterService.getServiceCenters(this.townShipId).subscribe(res3=>{
            this.serviceCenters = res3;
            this.productService.getProducts().subscribe(res4 => {
              this.products = res4;
              this.selectedProduct = this.products[0].id;
              // this.displayTable();
            });
            if(this.serviceCenters.length>0){
              this.serviceCenterId = this.serviceCenters[0].id;
              this.serviceCenterService.getTotalSum(this.serviceCenterId,this.selectedProduct).subscribe(res5=>{
                this.totalSum=res5;
                this.getTotal(this.totalSum);
                this.showLoader = false;
              });
            }else{
              this.showLoader = false;
            }
          });
        }else{
          this.showLoader = false;
        }
      });
    });
  }

  getAllTownShips(event) {
    this.showLoader = true;
    this.res1 = false;
    // this.townShips=[];
    // this.serviceCenters=[];
    this.townShipService.getTownShips(event).subscribe(res => {
      this.townShips = res;
      if(this.townShips.length>0) {
        this.townShipId = this.townShips[0].id;
        this.getAllServiceCenter(this.townShipId);
      }else{
        this.townShips = [];
        this.serviceCenters = [];
        this.totalSum=[];
      }
    });
  }

  getAllServiceCenter(event:string){
    this.showLoader = true;
    this.res1 = false;
    // this.townShips=[];
    // this.serviceCenters=[];
    this.serviceCenterService.getServiceCenters(event).subscribe(res => {
      this.serviceCenters = res;
      if(this.serviceCenters.length>0) {
        this.serviceCenterId = this.serviceCenters[0].id;
        this.serviceCenterService.getTotalSum(this.serviceCenterId, this.selectedProduct).subscribe(res2 => {
          this.totalSum = res2;
          this.getTotal(this.totalSum);
          this.showLoader = false;
        });
      }else{
        this.showLoader = false;
        this.serviceCenters = [];
        this.totalSum=[];
      }
    });
  }

  // setTownShip(event: string) {
  //   this.showLoader = true;
  //   this.res1 = false;
  //   this.townShipId = event;
  //   this.townShipService.getTotalSum(this.townShipId, this.selectedProduct).subscribe(res2 => {
  //     this.totalSum = res2;
  //     this.getTotal(this.totalSum);
  //     this.showLoader = false;
  //   });
  //   // this.serviceCenters=[];
  //   // for (let town of this.townShips) {
  //   //   if (this.townShipId == town.id) {
  //   //     this.townShip = town;
  //   //     this.serviceCenters = this.townShip.serviceCenterList;
  //   //     // this.displayData = [];
  //   //     this.displayTable();
  //   //   }
  //   // }
  // }

  setServiceCenter(item: string) {
    this.showLoader = true;
    this.res1 = false;
    this.serviceCenterId = item;
    this.serviceCenterService.getTotalSum(this.serviceCenterId, this.selectedProduct).subscribe(res2 => {
      this.totalSum = res2;
      this.getTotal(this.totalSum);
      this.showLoader = false;
    });
    // this.displayData = [];
    // this.displayTable();
  }

  setProduct(item: string) {
    this.showLoader = true;
    this.res1 = false;
    this.selectedProduct = item;
    this.serviceCenterService.getTotalSum(this.serviceCenterId, this.selectedProduct).subscribe(res2 => {
      this.totalSum = res2;
      this.getTotal(this.totalSum);
      this.showLoader = false;
    });
    // this.displayData = [];
    // this.displayTable();
  }

  // displayTable() {
  //   this.total = 0;
  //   this.displayData = [];
  //   for (let center of this.serviceCenters) {
  //     for (let expert of center.expertList) {
  //       for (let village of expert.villageList) {
  //         for (let infield of village.infieldList) {
  //           if (infield.product.id == this.selectedProduct) {
  //             let option = [
  //               center.title,
  //               expert.firstName + ' ' + expert.lastName + ' (' + expert.nationalCode + ')',
  //               village.title,
  //               infield.farmerFirstName + ' ' + infield.farmerLastName,
  //               infield.farmerFatherName,
  //               infield.farmerPhoneNumber,
  //               infield.farmLongitude + '-' + infield.farmLatitude,
  //               infield.infieldArea,
  //               infield.date
  //             ];
  //             this.displayData.push(option);
  //             this.total = this.total + infield.infieldArea;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  filter(s, e) {
    this.revert = this.displayData;
    if (s != null && e != null) {
      for (let item of this.displayData) {
        if (item[8] <= e && item[8] >= s) {
          this.temp.push(item);
        }
      }
    }
    else if (s == null && e == null) {
      if (this.temp != []) {
        this.displayData = this.revert;
      }
    }
    else {
      for (let item of this.displayData) {
        if (item[8] <= e || item[8] >= s) {
          this.temp.push(item);
        }
      }
    }
    this.displayData = this.temp;
  }

  unfilter() {
    if (this.temp != []) {
      this.displayData = this.revert;
    }
  }

  DownloadPdf(tid, pid) {
    this.downloadPdfService.downloadT(tid, pid).subscribe(res => {
      this.downloadUrl = res.url;
      console.log(this.downloadUrl);
      this.res1 = true;
    });
  }

  getTotal(totalSum){
    this.sum = 0
    for (let item of totalSum){
      this.sum = parseInt(item.sum) + this.sum;
    }
    return this.sum;
  }

}
