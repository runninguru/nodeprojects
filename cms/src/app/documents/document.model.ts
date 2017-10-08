export class Document {
  public id: string;
  public name: string;
  public description: string;
  public url: string;
  public children: Document[];
  constructor(id: string, name: string , description: string, url: string) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.url = url;
  }
}
