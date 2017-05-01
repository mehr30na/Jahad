/**
 * Created by Zar on 2/17/2017.
 */
import {TownShip} from "../town-ship/TownShip";
import {Expert} from "../expert/expert";

export class ServiceCenter{
  id:string;
  title:string;
  townShip:TownShip;
  expertList:Array<Expert>;
}
