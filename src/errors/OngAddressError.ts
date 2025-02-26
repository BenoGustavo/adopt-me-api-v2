export class OngAddressError extends Error {
  constructor() {
    super("ONG address not found");
    this.name = "OngAddressError";
  }
}