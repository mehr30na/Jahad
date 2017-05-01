import {Province} from "../province/province";
import {ServiceCenter} from "../service-center/serviceCenter";

export class TownShip {
  id:string;
  title:string;
  province:Province;
  serviceCenterList:Array<ServiceCenter>;
}
