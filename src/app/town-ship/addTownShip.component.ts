/**
 * Created by Zar on 2/22/2017.
 */
import {Component, OnInit} from "@angular/core";
import {Province} from "../province/province";
import {Router} from "@angular/router";
import {TownShipService} from "./town-ship.service";
import {ProvinceService} from "../province/province.service";
import {TownShip} from "./TownShip";
declare var swal:any;

@Component({
  selector: '',
  templateUrl: './addTownShip.component.html'
})

export class AddTownShipComponent implements OnInit{
  province:Province;
  provinceId:string;
  provinces:Array<Province>;
  newTown:TownShip;
  newTownShips:Array<TownShip>=[];
  response:boolean=false;

  constructor(private router:Router,
              private townShipService:TownShipService,
              private provinceService:ProvinceService) { }

  ngOnInit() {
    this.provinceService.getProvinces().subscribe(res=>{
      this.provinces = res;
      this.provinceId=this.provinces[0].id;
    });
    this.newTown = new TownShip();
    this.newTownShips.push(this.newTown);
  }

  setProvince(event) {
      this.provinceId=event;
  }

  addTownShips(){
    this.townShipService.addTownShip(this.newTownShips, this.provinceId).subscribe(res=> {
      this.newTownShips=res;
      if(this.newTownShips){
        swal(
          'شهرستان با موفقیت افزوده شد!',
          'لطفا دکمه OK را بزنید',
          'success'
        );
        this.router.navigateByUrl('townShips');
        this.newTownShips=null;
      }
    });
    // for(let i=0;i<this.newTownShips.length;i++){
    //   this.newTownShips.splice(i,1);
    // }
  }

  deleteTownShip(i){
      this.newTownShips.splice(i,1);
  }

  onChange(value,i){
    this.newTownShips[i].title=value;
  }

  newTownShip(){
    let newTS=new TownShip();
    this.newTownShips.push(newTS);
  }


}
