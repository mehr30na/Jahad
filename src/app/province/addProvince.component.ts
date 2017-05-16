/**
 * Created by Zar on 2/17/2017.
 */
import {Component} from "@angular/core";
import {ProvinceService} from "./province.service";
import {Province} from "./province";
import { Router} from "@angular/router";
declare var swal: any;



@Component({
  selector:'AddProvince',
  templateUrl:'./addProvince.component.html',
})

export class AddProvinceComponent{

  province=new Province();
  response:boolean=false;
  private showLoader: boolean;
  constructor(private provinceService:ProvinceService,private router:Router) {
  }

  addProvince(province:Province,$event){
    this.showLoader = true;
    $event.preventDefault();
    this.provinceService.addProvince(province).subscribe(res=> {
      this.response=res;
      if(this.response){
        swal(
          'استان با موفقیت افزوده شد!',
        'لطفا دکمه OK را بزنید',
          'success'
        )
        this.showLoader = false;
        this.router.navigateByUrl('main/provinces');
      }
    });
  }

}
