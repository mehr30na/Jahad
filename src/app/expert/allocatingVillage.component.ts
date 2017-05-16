import {Component} from "@angular/core";
import {Province} from "../province/province";
import {TownShip} from "../town-ship/TownShip";
import {ServiceCenter} from "../service-center/serviceCenter";
import {Expert} from "./expert";
import {Router} from "@angular/router";
import {TownShipService} from "../town-ship/town-ship.service";
import {ProvinceService} from "../province/province.service";
import {ServiceCenterService} from "../service-center/service-center.service";
import {ExpertService} from "./expert.service";
import {Village} from "../village/village";
declare var swal: any;


@Component({
  selector: '',
  templateUrl: './allocatingVillage.component.html'
})

export class AllocatingVillageComponent {
  provinces: Array<Province>;
  province: Province;
  townShips: Array<TownShip>;
  townShip: TownShip;
  serviceCenterId: string;
  serviceCenter: ServiceCenter;
  serviceCenters: Array<ServiceCenter> = [];
  response: string;
  provinceId: string;
  townShipId: string;
  expert: Expert;
  experts: Array<Expert>;
  expertId: string;
  village: Village;
  newVillages: Array<Village> = [];
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
          this.serviceCenterService.getServiceCenters(this.townShipId).subscribe(res3 => {
            this.serviceCenters = res3;
            if (this.serviceCenters.length > 0) {
              this.serviceCenterId = this.serviceCenters[0].id;
              this.expertService.getExperts(this.serviceCenterId).subscribe(res4 => {
                this.experts = res4;
                if (this.experts.length > 0) {
                  this.expertId = this.experts[0].nationalCode;
                  console.log(this.expertId);
                  this.showLoader = false;
                }
              });
            }
          });
        }
      });
    });
    this.village = new Village();
    this.newVillages.push(this.village);
    this.showLoader = false;
  }

  getAllTownShips(event) {
    this.showLoader = true;
    this.townShipService.getTownShips(event).subscribe(res2 => {
      this.townShips = res2;
      this.townShipId = this.townShips[0].id;
      this.serviceCenterService.getServiceCenters(this.townShipId).subscribe(res3 => {
        this.serviceCenters = res3;
        if (this.serviceCenters.length > 0) {
          this.serviceCenterId = this.serviceCenters[0].id;
          this.expertService.getExperts(this.serviceCenterId).subscribe(res4 => {
            this.experts = res4;
            if (this.experts.length > 0) {
              this.expertId = this.experts[0].nationalCode;
              console.log(this.expertId);
              this.showLoader = false;
            }else{
              this.experts = [];
            }
          });
        }else{
          this.serviceCenters = [];
          this.experts = [];
        }
      });
    });
    this.showLoader = false;
  }

  getAllServiceCenters(event) {
    this.showLoader = true;
    this.serviceCenterService.getServiceCenters(event).subscribe(res3 => {
      this.serviceCenters = res3;
      if (this.serviceCenters.length > 0) {
        this.serviceCenterId = this.serviceCenters[0].id;
        this.expertService.getExperts(this.serviceCenterId).subscribe(res4 => {
          this.experts = res4;
          if (this.experts.length > 0) {
            this.expertId = this.experts[0].nationalCode;
            console.log(this.expertId);
            this.showLoader = false;
          }else{
            this.experts = [];
          }
        });
      }else{
        this.serviceCenters = [];
        this.experts = [];
      }
    });
    this.showLoader = false;
  }

  getAllExperts(event) {
    this.showLoader = true;
    this.serviceCenterId = event;
    this.expertService.getExperts(this.serviceCenterId).subscribe(res4 => {
      this.experts = res4;
      if (this.experts.length > 0) {
        this.expertId = this.experts[0].nationalCode;
        console.log(this.expertId);
        this.showLoader = false;
      }else{
        this.experts = [];
      }
    });
    this.showLoader = false;
  }

  setExpert(event) {
    this.expertId = event;
  }

  onChange(value, i) {
    this.newVillages[i].title = value;
  }

  newVillage() {
    let newV = new Village();
    this.newVillages.push(newV);
  }

  deleteVillage(i) {
    this.newVillages.splice(i, 1);
  }

  addVillages() {
    this.showLoader = true;
    this.expertService.addVillages(this.newVillages, this.expertId).subscribe(res => {
      this.newVillages = res;
      swal(
        'روستاها با موفقیت افزوده شدند!',
        'لطفا دکمه OK را بزنید',
        'success'
      );
      this.router.navigateByUrl('main/VillageList');
      this.showLoader = false;
    });
  }

}
