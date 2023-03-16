interface Location {
  lat: number;
  lng: number;
}

interface Geometry {
  location: Location;
}

export default interface Farm {
  place_id: string;
  formatted_address: string;
  geometry: Geometry;
  name: string;
  rating: number;
}
