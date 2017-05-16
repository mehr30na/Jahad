import { Component, OnInit } from '@angular/core';
import {ProvinceService} from "./province.service";
import {Province} from "./province";
declare var swal: any;


@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.css']
})

export class ProvinceComponent implements OnInit {

  provinces:Array<Province>=[];
  province=new Province();
  response:string;
  private showLoader: boolean;

  constructor(private provinceService:ProvinceService) { }

  ngOnInit() {
    this.getAllProvinces();
  }

  getAllProvinces(){
    this.showLoader = true;
    this.provinceService.getProvinces().subscribe(res=> {
      this.provinces = res;
      this.showLoader = false;
    });
  }

  getOneProvince(id:string){
    this.showLoader = true;
    this.provinceService.getProvince(id).subscribe(res=> {
      this.province = res;
      this.showLoader = false;
    });
  }

  updateProvince(){
    this.provinceService.updateProvince(this.province).subscribe(res=> {
      this.province=res;
    });
  }

  deleteProvince(id:string) {
    this.showLoader = true;
    if(confirm('آیا از حذف اطمینان دارید؟')){
      this.provinceService.deleteProvince(id).subscribe(
        res=>{
          this.provinces = res;
          this.showLoader = false;
        }
      );
    }
  }
}
