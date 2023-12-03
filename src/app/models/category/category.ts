export class Category {
  ID: number;
  Icon: string;
  Name: string;
  Count: number;

  constructor(ID: number, Icon: string, Name: string, Count: number) {
    this.ID = ID;
    this.Icon = Icon;
    this.Name = Name;
    this.Count = Count;
  }
}
