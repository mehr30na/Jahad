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

  constructor(private townShipService:TownShipService,
              private provinceService:ProvinceService
  ) { }

  ngOnInit() {
      this.provinceService.getProvinces().subscribe(res=>{
        this.provinces = res;
        this.townShips = this.provinces[0].townShipList;
        this.provinceId=this.provinces[0].id;
      });

  }

  getAllTownShips(event){
    this.provinceService.getProvince(event).subscribe(res=> {
      this.province = res;
      this.townShips = this.province.townShipList;
      this.provinceId=this.province.id;
    });
  }

  deleteTownShip(id){
    if(confirm('آیا از حذف اطمینان دارید؟')) {
      this.townShipService.deleteTownShip(id).subscribe(res=> {
        this.townShips=null;
        this.province = res;
        this.townShips=this.province.townShipList;
      });
      // this.provinceService.getProvince(this.provinceId).subscribe(res=> {
      //   this.province = res;
      //   this.townShips = this.province.townShipList;
      // });
    }
}

}
