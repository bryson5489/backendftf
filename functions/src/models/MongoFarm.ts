interface Geometry {
  location: Location;
}

export default interface MongoFarm {
  customer_id?: string;
  farmer_id: string;

  formatted_address: string;
  geometry?: Geometry;
  name: string;
  rating: number;
  website?: string;
}
