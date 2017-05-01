/**
 * Created by Zar on 2/17/2017.
 */
import {Village} from "../village/village";
import {InField} from "../inField/inField";

export class Farmer{
  id:string;
  farmerFirstName:string;
  farmerLastName:string;
  farmerFatherName:string;
  farmerNationalCode:string;
  farmerPhoneNumber:string;
  farmArea:number;
  farmLatitude:number;
  farmLongitude:number;
  village:Village;
  infieldList:Array<InField>;

}
