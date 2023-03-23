import { ObjectId } from "mongodb";

export default interface User {
  _id: ObjectId;
  fullName: string;
  email: string;
  phoneNumber?: number;
  lat: number;
  lng: number;
}

// google has a free geo location api// geo forwarding api
