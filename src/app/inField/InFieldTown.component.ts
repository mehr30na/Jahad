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
@Component({
  templateUrl: './InFieldTown.component.html'
})

export class InFieldTownShip {
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


  constructor(private productService: ProductService,
              private provinceService: ProvinceService,
              private downloadPdfService: DownloadPdfService,
              private townShipService: TownShipService) {

  }

  ngOnInit() {
    this.showLoader = true;
    this.provinceService.getProvinces().subscribe(res => {
      this.provinces = res;
      this.provinceId = this.provinces[0].id;
      this.townShipService.getTownShips(this.provinceId).subscribe(res => {
        this.townShips = res;
        this.productService.getProducts().subscribe(res => {
          this.products = res;
          this.selectedProduct = this.products[0].id;
          // this.displayTable();

        if (this.townShips.length > 0) {
          this.townShipId = this.townShips[0].id;
          this.townShipService.getTotalSum(this.townShipId,this.selectedProduct).subscribe(res2=>{
            this.totalSum=res2;
            this.getTotal(this.totalSum);
            this.showLoader = false;
          });
        }
        });
      });
    });
    this.showLoader = true;
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
        this.townShipService.getTotalSum(this.townShipId, this.selectedProduct).subscribe(res2 => {
          this.totalSum = res2;
          this.getTotal(this.totalSum);
          this.showLoader = false;
        });
      }
    });
  }

  setTownShip(event: string) {
    this.showLoader = true;
    this.res1 = false;
    this.townShipId = event;
    this.townShipService.getTotalSum(this.townShipId, this.selectedProduct).subscribe(res2 => {
      this.totalSum = res2;
      this.getTotal(this.totalSum);
      this.showLoader = false;
    });
    // this.serviceCenters=[];
    // for (let town of this.townShips) {
    //   if (this.townShipId == town.id) {
    //     this.townShip = town;
    //     this.serviceCenters = this.townShip.serviceCenterList;
    //     // this.displayData = [];
    //     this.displayTable();
    //   }
    // }
  }

  setProduct(item: string) {
    this.showLoader = true;
    this.res1 = false;
    this.selectedProduct = item;
    this.townShipService.getTotalSum(this.townShipId, this.selectedProduct).subscribe(res2 => {
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
