/**
 * Created by mehr30na on 3/17/17.
 */
import {Component} from "@angular/core";
import {Province} from "../province/province";
import {TownShip} from "../town-ship/TownShip";
import {Product} from "../product/product";
import {ProvinceService} from "../province/province.service";
import {ProductService} from "../product/product.service";
import {Ng2PaginationModule} from "ng2-pagination";
import {DownloadPdfService} from "./inFieldService";
import {Response} from "@angular/http";
import {GlobalUrl} from "../globalUrl";
import {TownShipService} from "../town-ship/town-ship.service";
import {totalmem} from "os";


@Component({
  templateUrl: './InFieldProvince.component.html'
})

export class InFieldProvince {
  provinces: Array<Province> = [];
  provinceId: string;
  province = new Province();
  townShips: Array<TownShip> = [];
  products: Array<Product> = [];
  selectedProduct: string;
  counter: number = 0;
  displayData: Array<any> = [];
  total:number=0;
  temp:Array<any>=[];
  revert: Array<any>;
  private downloadUrl: any;
  private res1: boolean=false;
  url : string=GlobalUrl.url;
  private totalSum: Array<any>=[];
  private productId: string;
  private showLoader: boolean;
  private sum: number;


  constructor(private provinceService: ProvinceService,
              private productService: ProductService,
              private downloadPdfService: DownloadPdfService,

  ) {
  }

  ngOnInit() {
    this.showLoader = true;
    this.provinceService.getProvinces().subscribe(res=>{
      this.provinces = res;
      this.provinceId = this.provinces[0].id;
      this.productService.getProducts().subscribe(res3=>{
        this.products = res3;
        if(this.products.length>0) {
          this.productId = this.products[0].id;
          this.provinceService.getTotalSum(this.provinceId, this.productId).subscribe(res2 => {
            this.totalSum = res2;
            this.getTotal(this.totalSum);
            console.log(this.totalSum);
            this.showLoader = false;
          });
        }else{
          this.totalSum = [];
        }
      });

    });
    // this.provinceService.getProvinces().subscribe(res => {
    //   this.provinces = res;
    //   this.provinceId = this.provinces[0].id;
    //   this.townShipService.getTownShips(this.provinceId).subscribe(res2=> {
    //     this.townShips = res2;
    //   });
    //
    //   this.productService.getProducts().subscribe(res => {
    //     this.products = res;
    //     this.selectedProduct = this.products[0].id;
    //     // this.displayTable();
    //   });
    // });

  }

  setProvince(event) {
    this.showLoader = true;
    this.provinceId = event;
    this.productService.getProducts().subscribe(res=>{
      this.products = res;
      this.productId = this.products[0].id;
      this.provinceService.getTotalSum(this.provinceId,this.productId).subscribe(res2=>{
        this.totalSum = res2;
        this.getTotal(this.totalSum);
        this.showLoader = false;
      });
    });

    // this.townShips=[];
    // this.res1=false;
    // this.provinceService.getProvince(event).subscribe(res => {
    //   this.province = res;
    //   this.provinceId = this.provinces[0].id;
    //   this.townShipService.getTownShips(this.provinceId).subscribe(res2=> {
    //     this.townShips = res2;
    //   });
    //   // this.displayTable();
    // });
  }

  setProduct(item: string) {
    this.showLoader = true;
    this.productId = item;
    this.provinceService.getTotalSum(this.provinceId,this.productId).subscribe(res=>{
      this.totalSum = res;
      this.getTotal(this.totalSum);
      this.showLoader = false;
    });
    // this.res1=false;
    // this.selectedProduct = item;
    // this.displayData = [];
    // this.displayTable();


  }

  // displayTable() {
  //   this.total=0;
  //   this.displayData = [];
  //   for (let town of this.townShips) {
  //     for (let center of town.serviceCenterList) {
  //       for (let expert of center.expertList) {
  //         for (let village of expert.villageList) {
  //           for (let infield of village.infieldList) {
  //             if (infield.product.id == this.selectedProduct) {
  //               let option = [
  //                 town.title,
  //                 center.title,
  //                 expert.firstName + ' ' + expert.lastName + ' (' + expert.nationalCode + ')',
  //                 village.title,
  //                 infield.farmerFirstName + ' ' + infield.farmerLastName,
  //                 infield.farmerFatherName,
  //                 infield.farmerPhoneNumber,
  //                 infield.farmLongitude + '-' + infield.farmLatitude,
  //                 infield.infieldArea,
  //                 infield.date
  //               ];
  //               this.displayData.push(option);
  //               this.counter = this.counter + 1;
  //               this.total=this.total+infield.infieldArea;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  // filter(s,e){
  //   this.revert = this.displayData;
  //   if(s!=null && e!=null) {
  //     for (let item of this.displayData) {
  //       if (item[8] <= e && item[8] >= s) {
  //         this.temp.push(item);
  //       }
  //     }
  //   }
  //   else if(s==null && e==null){
  //     if(this.temp!=[]){
  //       this.displayData = this.revert;
  //     }
  //   }
  //   else{
  //     for (let item of this.displayData) {
  //       if (item[8] <= e || item[8] >= s) {
  //         this.temp.push(item);
  //       }
  //     }
  //   }
  //   this.displayData = this.temp;
  // }

  // unfilter(){
  //   if(this.temp!=[]){
  //     this.displayData = this.revert;
  //   }
  // }

  DownloadPdf(id,pid){
    this.showLoader = true;
    this.downloadPdfService.downloadP(id,pid).subscribe(res=> {
      this.downloadUrl= res.url;
      console.log(this.downloadUrl);
      this.res1=true;
      this.showLoader = false;
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
