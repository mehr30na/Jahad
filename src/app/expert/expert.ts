/**
 * Created by Zar on 2/17/2017.
 */
import {ServiceCenter} from "../service-center/serviceCenter";
import {Village} from "../village/village";
import {AllocatedProduct} from "../allocated-product/allocatedProduct";

export class Expert{

  nationalCode:string;
  firstName:string;
  email:string;
  lastName:string;
  phoneNumber:string;
  password:string;
  serviceCenter:ServiceCenter;
  villageList:Array<Village>;
  allocatedProductList:Array<AllocatedProduct>;
}
