import { ObjectId } from "mongodb";
import Farm from "./Farm";

export default interface Favorite {
  _id?: ObjectId;
  farm: Farm;
  profile_id?: ObjectId;
}
