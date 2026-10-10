export class Card {
  constructor(name) {
    const normalizedName = String(name ?? "").trim();

    if (!normalizedName) {
      throw new Error("A card name is required.");
    }

    this.name = normalizedName;
  }
}