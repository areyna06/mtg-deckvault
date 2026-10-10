export class CardPrice {
  constructor({ cardName, usd, source = "Scryfall", retrievedAt = new Date() }) {
    if (!cardName) {
      throw new Error("A card name is required for a price.");
    }

    this.cardName = cardName;
    this.usd = Number.isFinite(usd) ? usd : null;
    this.currency = "USD";
    this.source = source;
    this.retrievedAt = new Date(retrievedAt);
  }

  get hasPrice() {
    return this.usd !== null;
  }

  formatUSD() {
    if (!this.hasPrice) {
      return null;
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: this.currency,
    }).format(this.usd);
  }

  static fromScryfall(card, data) {
    const rawPrice = data?.prices?.usd;
    const usd = rawPrice === null || rawPrice === undefined ? null : Number(rawPrice);

    return new CardPrice({
      cardName: data?.name || card.name,
      usd: Number.isFinite(usd) ? usd : null,
    });
  }
}