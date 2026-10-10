# Card Price Checker Class Diagram

The price checker adds a small model and service layer around the featured card names already stored on each deck entry. It requests a price only after a user selects **Check price** for an individual card.

```mermaid
classDiagram
    class App {
        +openDeck: string|null
        +decks: DeckEntry[]
    }

    class DeckEntry {
        <<plain object shape>>
        +id: string
        +name: string
        +cards: string[]
    }

    class CardPriceChecker {
        <<React function component>>
        +cardNames: string[]
        +priceStates: object
        +checkPrice(cardName: string): Promise~void~
    }

    class Card {
        +name: string
        +Card(name: string)
    }

    class CardPriceService {
        +fetchPrice(card: Card)$ Promise~CardPrice~
    }

    class CardPrice {
        +cardName: string
        +usd: number|null
        +currency: string
        +source: string
        +retrievedAt: Date
        +hasPrice: boolean
        +formatUSD(): string|null
        +fromScryfall(card: Card, data: object)$ CardPrice
    }

    App "1" --> "many" DeckEntry : defines collection data
    DeckEntry ..> CardPriceChecker : passes featured card names when expanded
    CardPriceChecker ..> Card : creates for requested name
    CardPriceChecker ..> CardPriceService : requests estimate
    CardPriceService ..> CardPrice : maps Scryfall response
    CardPrice --> Card : price is for this card
```

## How it fits together

- `DeckEntry` describes the existing plain objects in `src/App.jsx`; it is not a new JavaScript class. Its `cards` array remains a list of featured card-name strings.
- `CardPriceChecker` receives those names only when the user expands a deck. It keeps each card's loading, success, or error state locally and asks for prices one card at a time.
- `Card` validates and stores the requested name. `CardPriceService` sends an exact-name request to Scryfall and converts a successful response into `CardPrice`.
- `CardPrice` stores an optional USD estimate and formats it for display. A missing USD listing is represented as `null`, not as a zero price.
- Prices are individual-card estimates for Scryfall's returned printing. The interface does not add them up or present them as a full-deck value.