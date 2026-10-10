import { Card } from "../models/Card.js";
import { CardPrice } from "../models/CardPrice.js";

const SCRYFALL_NAMED_CARD_URL = "https://api.scryfall.com/cards/named";

export class CardPriceService {
  static async fetchPrice(card) {
    const requestedCard = card instanceof Card ? card : new Card(card);
    const url = new URL(SCRYFALL_NAMED_CARD_URL);
    url.searchParams.set("exact", requestedCard.name);

    let response;

    try {
      response = await fetch(url);
    } catch {
      throw new Error("Couldn't connect to Scryfall. Check your internet connection and try again.");
    }

    if (response.status === 404) {
      throw new Error(`Scryfall couldn't find a card named "${requestedCard.name}".`);
    }

    if (response.status === 429) {
      throw new Error("Scryfall is receiving too many requests. Please try again shortly.");
    }

    if (!response.ok) {
      throw new Error("Scryfall couldn't provide a price right now. Please try again later.");
    }

    const cardData = await response.json();
    return CardPrice.fromScryfall(requestedCard, cardData);
  }
}