import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProvinceComponent} from "./province/province.component";
import {AddProvinceComponent} from "./province/addProvince.component";
import {TownShipComponent} from "./town-ship/town-ship.component";
import {ServiceCenterComponent} from "./service-center/service-center.component";
import {ExpertComponent} from "./expert/expert.component";
import {ProductComponent} from "./product/product.component";
import {AddTownShipComponent} from "./town-ship/addTownShip.component";
import {AddServiceCenterComponent} from "./service-center/addServiceCenter.component";
import {AddExpertComponent} from "./expert/addExpert.component";
import {AddProductComponent} from "./product/addProduct.component";
import {AllocatingVillageComponent} from "./expert/allocatingVillage.component";
import {AllocatingProductComponent} from "./expert/allocatingProduct.component";
import {AllocatedVillageList} from "./expert/allocatedVillageList";
import {AllocatedProductList} from "./expert/allocatedProductList";
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {InFieldProvince} from "./inField/InFieldProvince.component";
import {InFieldTownShip} from "./inField/InFieldTown.component";
import {InFieldCenter} from "./inField/InFieldCenter.component";
import {InFieldExpert} from "./inField/InFieldExpert.component";


const routes: Routes = [
  {path: 'login',  component:LoginComponent },
  {path: 'main', component: MainComponent,
    children:[
      {path: 'provinces', component: ProvinceComponent},
      {path: 'addProvinces', component: AddProvinceComponent},
      {path: 'townShips', component: TownShipComponent},
      {path: 'addTownShip', component: AddTownShipComponent},
      {path: 'serviceCenters', component: ServiceCenterComponent},
      {path: 'addServiceCenter', component: AddServiceCenterComponent},
      {path: 'experts', component: ExpertComponent},
      {path: 'addExpert', component: AddExpertComponent},
      {path: 'VillageAllocate', component: AllocatingVillageComponent},
      {path: 'VillageList', component: AllocatedVillageList},
      {path: 'ProductAllocate', component: AllocatingProductComponent},
      {path: 'ProductList', component: AllocatedProductList},
      {path: 'products', component: ProductComponent},
      {path: 'addProduct', component: AddProductComponent},
      {path: 'infieldTotal', component: InFieldProvince},
      {path: 'infieldTown', component: InFieldTownShip},
      {path: 'infieldCenter', component: InFieldCenter},
      {path: 'infieldExpert', component: InFieldExpert}
    ]
  },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
