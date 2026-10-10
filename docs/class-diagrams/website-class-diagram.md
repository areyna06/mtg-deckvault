# MTG DeckVault Website Class Diagram

This diagram documents the current website implementation. Deck entries are plain JavaScript objects, while card and price data use classes. React components and the API service are shown with their actual responsibilities.

```mermaid
classDiagram
    class App {
        <<React function component>>
        +openDeck: string|null
        +searchTerm: string
        +tagFilter: string
        +filteredDecks: DeckEntry[]
        +App(): JSX
    }

    class DeckEntry {
        <<plain object shape>>
        +id: string
        +name: string
        +colors: string
        +strategy: string
        +description: string
        +image: string
        +background: string
        +decklist: string
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

    class ScryfallAPI {
        <<external service>>
        +searchByExactName(cardName: string)
    }

    App "1" o-- "many" DeckEntry : defines collection data
    App ..> CardPriceChecker : renders for expanded deck
    CardPriceChecker ..> Card : creates for a lookup
    CardPriceChecker ..> CardPriceService : requests estimate
    CardPriceService ..> ScryfallAPI : exact-name request
    CardPriceService ..> CardPrice : maps API response
    CardPrice --> Card : estimate belongs to card
```

## How the Website Fits Together

- `App` in `src/App.jsx` owns the deck data and React state for the expanded deck, search text, and color-tag filter. It derives `filteredDecks` from that data.
- Each `DeckEntry` is a plain object in the `decks` array, not a JavaScript class. Its `cards` property contains featured card names only.
- When a deck is expanded, `App` passes its featured names to `CardPriceChecker` in `src/components/CardPriceChecker.jsx`.
- The checker tracks each card's loading, success, or error state. It creates a `Card` from the requested name and asks `CardPriceService` to look it up.
- `CardPriceService` in `src/services/CardPriceService.js` requests an exact-name match from Scryfall. `CardPrice.fromScryfall` in `src/models/CardPrice.js` maps the response into a `CardPrice` model.
- A `CardPrice` may have `usd: null` when no USD listing is available. The site reports individual-card price estimates and does not total the featured cards or claim to price a complete deck.
