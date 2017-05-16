import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProvinceComponent} from "./province/province.component";
import { TownShipComponent} from "./town-ship/town-ship.component";
import { ServiceCenterComponent} from "./service-center/service-center.component";
import { ExpertComponent} from "./expert/expert.component";
import { VillageComponent} from "./village/village.component";
import { ProductComponent} from "./product/product.component";
import { FarmerComponent} from "./farmer/farmer.component";
import { ProvinceService} from "./province/province.service";
import { AllocatedProductService} from "./allocated-product/allocated-product.service";
import { ExpertService} from "./expert/expert.service";
import { FarmerService} from "./farmer/farmer.service";
import { ProductService} from "./product/product.service";
import { ServiceCenterService} from "./service-center/service-center.service";
import { TownShipService} from "./town-ship/town-ship.service";
import { VillageService} from "./village/village.service";
import { AddProvinceComponent} from "./province/addProvince.component";
import { AddTownShipComponent} from "./town-ship/addTownShip.component";
import { AddServiceCenterComponent} from "./service-center/addServiceCenter.component";
import { AddExpertComponent} from "./expert/addExpert.component";
import { AllocatingVillageComponent} from "./expert/allocatingVillage.component";
import { AllocatingProductComponent} from "./expert/allocatingProduct.component";
import { AddProductComponent} from "./product/addProduct.component";
import { AddVillageComponent} from "./village/addVillage.component";
import {AllocatedProductList} from "./expert/allocatedProductList";
import {AllocatedVillageList} from "./expert/allocatedVillageList";
import {LoginService} from "./login/loginService";
import {MainComponent} from "./main/main.component";
import {LoginComponent} from "./login/login.component";
import {InFieldProvince} from "./inField/InFieldProvince.component";
import {InFieldTownShip} from "./inField/InFieldTown.component";
import {InFieldCenter} from "./inField/InFieldCenter.component";
import {InFieldExpert} from "./inField/InFieldExpert.component";
import {Ng2PaginationModule} from "ng2-pagination";
import {DownloadPdfService} from "./inField/inFieldService";
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ProvinceComponent,
    AddProvinceComponent,
    TownShipComponent,
    AddTownShipComponent,
    ServiceCenterComponent,
    AddServiceCenterComponent,
    ExpertComponent,
    AddExpertComponent,
    AllocatingVillageComponent,
    AllocatingProductComponent,
    VillageComponent,
    AddVillageComponent,
    ProductComponent,
    AddProductComponent,
    FarmerComponent,
    AllocatedProductList,
    AllocatedVillageList,
    InFieldProvince,
    InFieldTownShip,
    InFieldCenter,
    InFieldExpert,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2PaginationModule
  ],
  providers: [
    LoginService,
    ProvinceService,
    AllocatedProductService,
    ExpertService,
    FarmerService,
    ProductService,
    ServiceCenterService,
    TownShipService,
    VillageService,
    DownloadPdfService
  ],
  bootstrap: [
    AppComponent
  ],

})
export class AppModule { }
