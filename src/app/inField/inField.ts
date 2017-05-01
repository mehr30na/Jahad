import {Product} from "../product/product";
import {Village} from "../village/village";
/**
 * Created by mehr30na on 3/17/17.
 */
export class InField{
  id:string;
  farmerFirstName:string;
  farmerLastName:string;
  farmerFatherName:string;
  farmerNationalCode:string;
  farmerPhoneNumber:string;
  farmLatitude:number;
  farmLongitude:number;
  product:Product;
  infieldArea:number;
  village:Village;
  date:string;
}
