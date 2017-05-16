import {Component, OnInit} from "@angular/core";
import {Province} from "../province/province";
import {ServiceCenter} from "../service-center/serviceCenter";
import {TownShip} from "../town-ship/TownShip";
import {Router} from "@angular/router";
import {TownShipService} from "../town-ship/town-ship.service";
import {ProvinceService} from "../province/province.service";
import {ServiceCenterService} from "../service-center/service-center.service";
import {Expert} from "./expert";
import {ExpertService} from "./expert.service";
declare var swal: any;


@Component({
  selector: '',
  templateUrl: './addExpert.component.html'
})

export class AddExpertComponent implements OnInit {
  province: Province;
  provinceId: string;
  provinces: Array<Province>;
  townShipId: string;
  townShip: TownShip;
  townShips: Array<TownShip>;
  serviceCenters: Array<ServiceCenter>;
  serviceCenterId: string;
  expert: Expert;
  private showLoader: boolean;

  constructor(private router: Router,
              private townShipService: TownShipService,
              private provinceService: ProvinceService,
              private serviceCenterService: ServiceCenterService,
              private expertService: ExpertService) {
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
          this.showLoader = false;
          this.serviceCenterService.getServiceCenters(this.townShipId).subscribe(res3 => {
            this.serviceCenters = res3;
            if (this.serviceCenters.length > 0) {
              this.serviceCenterId = this.serviceCenters[0].id;
              this.showLoader = false;
            }
          });
        } else {
          this.showLoader = false;
        }
      });
    });
    this.expert = new Expert();
  }

  getAllTownShips(event) {
    this.showLoader = true;
    this.townShipService.getTownShips(event).subscribe(res => {
      this.townShips = res;
      if(this.townShips.length > 0 ){
        this.townShipId = this.townShips[0].id;
        this.getAllServiceCenters(this.townShipId);
      }
      this.showLoader = false;
    });
  }

  getAllServiceCenters(event) {
    this.showLoader = true;
    this.serviceCenterService.getServiceCenters(event).subscribe(res => {
      this.serviceCenters = res;
      if(this.serviceCenters.length>0){
        this.serviceCenterId = this.serviceCenters[0].id;
      }
        this.showLoader = false;

    });
  }

  setServiceCenter(event) {
    console.log(event);
    this.serviceCenterId = event;
  }

  addExperts() {
    this.showLoader = true;
    this.expertService.addExpert(this.expert, this.serviceCenterId).subscribe(res => {
      this.expert = res;
      swal(
        'کارشناس با موفقیت افزوده شد!',
        'لطفا دکمه OK را بزنید',
        'success'
      );
      this.router.navigateByUrl('main/experts');
      this.showLoader = false;
    });
    this.expert = null;
  }

  onChangeL(value) {
    this.expert.lastName = value;
  }

  onChangeF(value) {
    this.expert.firstName = value;
  }

  onChangeC(value) {
    this.expert.nationalCode = value;
  }

  onChangeP(value) {
    this.expert.phoneNumber = value;
  }

  onChangeE(value) {
    this.expert.email = value;
  }

  onChangePass(value) {
    this.expert.password = value;
  }
}
