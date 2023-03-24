export default abstract class Item {
  constructor(
    readonly category: string,
    readonly description: string,
    public price: number
  ) {}
}
