/**
 * Created by Zar on 2/17/2017.
 */
import {Expert} from "../expert/expert";
import {InField} from "../inField/inField";

export class Village{
  id:string;
  title:string;
  expert:Expert;
  infieldList:Array<InField>;
}
