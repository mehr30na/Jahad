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
import {ExpertService} from "../expert/expert.service";
import {InField} from "./inField";

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
  village=new Village();
  villages:Array<Village> = [];
  products:Array<Product> = [];
  displayData:Array<any> = [];
  total:number = 0;
  temp: Array<any>=[];
  revert: Array<any>;
  response:any;
  private downloadUrl: string;
  private res1: boolean=false;
  private showLoader: boolean;
  provinceId: string;
  townShipId: string;
  private totalSum: Array<any>=[];
  private sum: number;
  private infieldList: Array<InField>=[];
  private producId: string;

  constructor(private router:Router,
              private productService:ProductService,
              private townShipService:TownShipService,
              private provinceService:ProvinceService,
              private serviceCenterService:ServiceCenterService,
              private expertService:ExpertService,
              private downloadPdfService: DownloadPdfService) {}


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
              this.expertService.getExperts(this.serviceCenterId).subscribe(res5=>{
                this.experts=res5;
                if(this.experts.length>0){
                  this.expertId=this.experts[0].nationalCode;
                  this.expertService.getInfields(this.expertId,this.selectedProduct).subscribe(res6=>{
                    this.infieldList=res6;
                    // for(let item of this.infieldList) {
                    //   this.villages.push(this.infieldList.village);
                    // }
                    this.getTotalsum();
                    this.showLoader = false;
                  });
                }else{
                  this.experts =[];
                  this.showLoader = false;
                }
              });
            }else{
              this.experts=[];
              this.serviceCenters =[];
              this.showLoader = false;
            }
          });
        }else{
          this.townShips=[];
          this.experts =[];
          this.serviceCenters =[];
          this.showLoader = false;
        }
      });
    });
  }

  getAllTownShips(event) {
    this.sum=0;
    this.showLoader = true;
    this.townShipService.getTownShips(event).subscribe(res2 => {
      this.townShips = res2;
      if (this.townShips.length > 0) {
        this.townShipId = this.townShips[0].id;
        this.serviceCenterService.getServiceCenters(this.townShipId).subscribe(res3 => {
          this.serviceCenters = res3;
          // this.productService.getProducts().subscribe(res4 => {
          //   this.products = res4;
          //   this.selectedProduct = this.products[0].id;
          //   // this.displayTable();
          // });
          if (this.serviceCenters.length > 0) {
            this.serviceCenterId = this.serviceCenters[0].id;
            this.expertService.getExperts(this.serviceCenterId).subscribe(res5 => {
              this.experts = res5;
              if (this.experts.length > 0) {
                this.expertId = this.experts[0].nationalCode;
                this.expertService.getInfields(this.expertId, this.selectedProduct).subscribe(res6 => {
                  this.infieldList = res6;
                  this.showLoader = false;
                });
              } else {
                this.experts =[];
                this.showLoader = false;
              }
            });
          }else{
            this.experts=[];
            this.serviceCenters =[];
            this.showLoader = false;
          }
        });
      }else{
        this.townShips=[];
        this.experts =[];
        this.serviceCenters =[];
        this.showLoader = false;
      }
    });
  }
    // this.res1=false;
    // this.provinceService.getProvince(event).subscribe(res=> {
    //   this.province = res;
    //   // this.townShips = [];
    //   // this.serviceCenters = [];
    //   // this.experts=[];
    //   // this.villages=[];
    //   if (this.province.townShipList.length > 0)
    //     this.townShips = this.province.townShipList;
    //   if (this.townShips[0].serviceCenterList.length > 0) {
    //     this.serviceCenters = this.townShips[0].serviceCenterList;
    //     this.serviceCenterId = this.serviceCenters[0].id;
    //   }
    //   if (this.serviceCenters[0].expertList.length > 0) {
    //     this.experts = this.serviceCenters[0].expertList;
    //     this.villages = this.experts[0].villageList;
    //     this.displayTable();
    //   }
    // });
  // }

  getAllServiceCenters(event) {
    this.sum=0;
    this.showLoader = true;
    this.serviceCenterService.getServiceCenters(event).subscribe(res3 => {
      this.serviceCenters = res3;
      // this.productService.getProducts().subscribe(res4 => {
      //   this.products = res4;
      //   this.selectedProduct = this.products[0].id;
        // this.displayTable();
      // });
      if (this.serviceCenters.length > 0) {
        this.serviceCenterId = this.serviceCenters[0].id;
        this.expertService.getExperts(this.serviceCenterId).subscribe(res5 => {
          this.experts = res5;
          if (this.experts.length > 0) {
            this.expertId = this.experts[0].nationalCode;
            this.expertService.getInfields(this.expertId, this.selectedProduct).subscribe(res6 => {
              this.infieldList = res6;
              // this.getTotalsum(this.expertId,this.producId);
              this.showLoader = false;
            });
          }
        });
      }else{
        this.experts =[];
        this.serviceCenters =[];
        this.showLoader = false;
      }
    });
  }
    // this.res1=false;
    // this.townShipService.getTownShip(event).subscribe(res=> {
    //   this.townShip = res;
      // this.serviceCenters = [];
      // this.experts=[];
      // this.villages=[];
  //     this.serviceCenters = this.townShip.serviceCenterList;
  //     this.serviceCenterId = this.serviceCenters[0].id;
  //     this.experts = this.serviceCenters[0].expertList;
  //     this.villages = this.experts[0].villageList;
  //     this.displayTable();
  //   });
  // }

  getAllExperts(event) {
    this.sum=0;
    this.showLoader = true;
    this.expertService.getExperts(event).subscribe(res5 => {
      this.experts = res5;
      if (this.experts.length > 0) {
        this.expertId = this.experts[0].nationalCode;
        this.expertService.getInfields(this.expertId, this.selectedProduct).subscribe(res6 => {
          this.infieldList = res6;
          // this.getTotalsum(this.expertId,this.producId);
          this.showLoader = false;
        });
      }else{
        this.experts =[];
        this.showLoader = false;
      }
    });
  }
  //   this.res1=false;
  //   this.serviceCenterId = event;
  //   // this.experts=[];
  //   // this.villages=[];
  //   this.serviceCenterService.getServiceCenter(this.serviceCenterId).subscribe(res=> {
  //     this.serviceCenter = res;
  //     this.experts = this.serviceCenter.expertList;
  //     this.villages = this.experts[0].villageList;
  //     this.displayTable();
  //   });
  // }

  setExpert(event) {
    this.sum=0;
    this.showLoader = true;
    this.expertId=event;
    this.expertService.getInfields(event, this.selectedProduct).subscribe(res6 => {
      this.infieldList = res6;
      // this.getTotalsum(this.expertId,this.producId);
      this.showLoader = false;
    });
  }
    // this.res1=false;
    // this.expertId = event;
    // // this.villages=[];
    // for (let expert of this.experts) {
    //   if (this.expertId == expert.nationalCode) {
    //     this.villages = expert.villageList;
    //     this.displayTable();
    //   }
    // }
  // }

  setProduct(item:string) {
    this.showLoader = true;
    this.res1=false;
    this.selectedProduct = item;
    this.expertService.getInfields(this.expertId, this.selectedProduct).subscribe(res6 => {
      this.infieldList = res6;
      this.showLoader = false;
    });
  }
    // this.displayTable();

  // displayTable() {
  //   console.log(this.selectedProduct);
  //   this.total=0;
  //   this.displayData=[];
  //     for (let village of this.villages) {
  //       for (let infield of village.infieldList) {
  //         if (infield.product.id == this.selectedProduct) {
  //           let option = [
  //             infield.id,
  //             village.title,
  //             infield.farmerFirstName + ' ' + infield.farmerLastName,
  //             infield.farmerFatherName,
  //             infield.farmerPhoneNumber,
  //             infield.farmLongitude + '-' + infield.farmLatitude,
  //             infield.infieldArea,
  //             infield.date,
  //             infield.infieldArea
  //           ];
  //           this.displayData.push(option);
  //           this.total = this.total + infield.infieldArea;
  //         }
  //       }
  //     }
  // }

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

  deleteInField(id){
    this.showLoader=true;
    this.downloadPdfService.deleteItem(id).subscribe(resDel=>{
      this.expertService.getInfields(this.expertId, this.selectedProduct).subscribe(res6 => {
        this.infieldList = res6;
        this.showLoader = false;
      });
      // this.displayTable();
    });
}

  deleteInFieldMoshabeh(id){
    this.showLoader=true;
    this.downloadPdfService.deleteItemMoshabeh(id).subscribe(resDel=>{
      this.expertService.getInfields(this.expertId, this.selectedProduct).subscribe(res6 => {
        this.infieldList = res6;
        this.showLoader = false;
      });
      // this.displayTable();
    });
  }

getTotalsum () {
    this.expertService.getTotalsum(this.expertId,this.selectedProduct).subscribe(res=>{
      this.sum = res.sum;
      console.log(this.sum);
    });
}


}
