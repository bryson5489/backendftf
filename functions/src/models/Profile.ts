import { ObjectId } from "mongodb";

export default interface Profile {
  isFarmer: boolean;
  profile_id: string;
  _id?: ObjectId;
  fullName: string;
  email: string;
  phoneNumber?: string;
  aboutMe?: string;
  lat: number;
  lng: number;
}

// google has a free geo location api// geo forwarding api

// change the file name on git hub
