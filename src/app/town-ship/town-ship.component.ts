import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TownShipService} from "./town-ship.service";
import {TownShip} from "./TownShip";
import {ProvinceService} from "../province/province.service";
import {Province} from "../province/province";

@Component({
  selector: 'app-town-ship',
  templateUrl: './town-ship.component.html',
  styleUrls: ['./town-ship.component.css']
})
export class TownShipComponent implements OnInit {

  provinceId:string;
  townShips:Array<TownShip>;
  provinces:Array<Province>;
  townShip:TownShip;
  response:string;
  province: Province;
  private showLoader: boolean;

  constructor(private townShipService:TownShipService,
              private provinceService:ProvinceService
  ) { }

  ngOnInit() {
    this.showLoader = true;
      this.provinceService.getProvinces().subscribe(resP=>{
        this.provinces = resP;
        this.provinceId = this.provinces[0].id;
        this.townShipService.getTownShips(this.provinceId).subscribe(resT=>{
          this.townShips = resT;
          this.showLoader = false;
        });
        // this.townShips = this.provinces[0].townShipList;
        // this.provinceId=this.provinces[0].id;
      });

  }

  getAllTownShips(event){
    this.showLoader = true;
    this.townShipService.getTownShips(event).subscribe(res=> {
      this.townShips = res;
      this.showLoader = false;
    });
  }

  deleteTownShip(id){
    this.showLoader = true;
    if(confirm('آیا از حذف اطمینان دارید؟')) {
      this.townShipService.deleteTownShip(id).subscribe(res=> {
        this.townShips=res;
        this.showLoader = false;
      });
      // this.provinceService.getProvince(this.provinceId).subscribe(res=> {
      //   this.province = res;
      //   this.townShips = this.province.townShipList;
      // });
    }
}

}
