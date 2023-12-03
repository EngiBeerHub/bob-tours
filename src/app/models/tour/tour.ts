export class Tour {
  Description: string;
  Duration: number;
  ID: number;
  Image: string;
  MaxPersons: number;
  PriceF: number;
  PriceG: number;
  Region: string;
  StartingPoint: Point;
  Title: string;
  Tourtype: string;

  constructor(description: string, duration: number, id: number, image: string, maxPersons: number, priceF: number, priceG: number, region: string, startingPoint: Point, title: string, tourtype: string) {
    this.Description = description;
    this.Duration = duration;
    this.ID = id;
    this.Image = image;
    this.MaxPersons = maxPersons;
    this.PriceF = priceF;
    this.PriceG = priceG;
    this.Region = region;
    this.StartingPoint = startingPoint;
    this.Title = title;
    this.Tourtype = tourtype;
  }
}

export class Point {
  Lat: string;
  Lng: string;
  Location: string;

  constructor(lat: string, lng: string, location: string) {
    this.Lat = lat;
    this.Lng = lng;
    this.Location = location;
  }
}
