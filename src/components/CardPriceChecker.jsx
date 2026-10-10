import { useState } from "react";
import { Card } from "../models/Card.js";
import { CardPriceService } from "../services/CardPriceService.js";

function CardPriceChecker({ cardNames }) {
  const [priceStates, setPriceStates] = useState({});

  async function checkPrice(cardName) {
    setPriceStates((currentStates) => ({
      ...currentStates,
      [cardName]: { status: "loading" },
    }));

    try {
      const card = new Card(cardName);
      const price = await CardPriceService.fetchPrice(card);

      setPriceStates((currentStates) => ({
        ...currentStates,
        [cardName]: { status: "loaded", price },
      }));
    } catch (error) {
      setPriceStates((currentStates) => ({
        ...currentStates,
        [cardName]: { status: "error", message: error.message },
      }));
    }
  }

  return (
    <div className="mt-4 border-t border-[#2d2a28] pt-4">
      <h4 className="text-[9px] uppercase tracking-[0.2em] text-[#b4ada6]">
        Featured card prices
      </h4>
      <p className="mt-2 text-xs leading-5 text-[#aaa39d]">
        Scryfall USD estimates for individual cards, not the value of a complete deck.
      </p>

      <ul className="mt-3 divide-y divide-[#2d2a28]">
        {cardNames.map((cardName) => {
          const priceState = priceStates[cardName];
          const isLoading = priceState?.status === "loading";

          return (
            <li key={cardName} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-[#e4ded7]">{cardName}</p>
                {priceState?.status === "loaded" && (
                  <p className="mt-1 text-xs text-[#c7c1ba]" aria-live="polite">
                    {priceState.price.hasPrice
                      ? `Estimated price: ${priceState.price.formatUSD()} USD`
                      : "No USD price is currently listed for this card."}
                  </p>
                )}
                {priceState?.status === "error" && (
                  <p className="mt-1 text-xs text-[#e5a49b]" role="status">
                    {priceState.message}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => checkPrice(cardName)}
                disabled={isLoading}
                className="shrink-0 rounded-full border border-[#3c3937] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#efeae3] transition hover:border-[#f2efe9] disabled:cursor-wait disabled:opacity-60"
              >
                {isLoading ? "Checking..." : priceState?.status === "loaded" ? "Refresh" : "Check price"}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-[10px] text-[#8f8982]">
        Estimates vary by printing and condition. Prices are not guaranteed selling prices.
      </p>
    </div>
  );
}

export default CardPriceChecker;