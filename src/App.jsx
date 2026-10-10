import { useMemo, useState } from "react";
import CardPriceChecker from "./components/CardPriceChecker.jsx";

// Original illustrations are saved in public/images, so they work offline.
// The links below are budget deckbuilding references, not my personal lists.
const decks = [
  {
    id: "krenko",
    name: "Krenko, Mob Boss",
    colors: "Mono Red",
    strategy: "Goblin Tokens",
    description: "Make a bunch of Goblins, then turn that little army into a big problem.",
    image: "/images/krenko.webp",
    background: "bg-gradient-to-br from-[#612b2d] to-[#cf7b4f]",
    decklist: "https://edhrec.com/average-decks/krenko-mob-boss/upgraded/budget",
    cards: ["Skirk Prospector", "Goblin Chieftain", "Impact Tremors"],
  },
  {
    id: "shirei",
    name: "Shirei, Shizo's Caretaker",
    colors: "Mono Black",
    strategy: "Sacrifice & Reanimation",
    description: "Small creatures keep coming back from the graveyard to generate value.",
    image: "/images/shirei.webp",
    background: "bg-gradient-to-br from-[#362a40] to-[#857083]",
    decklist: "https://edhrec.com/average-decks/shirei-shizos-caretaker/upgraded/budget",
    cards: ["Blood Artist", "Viscera Seer", "Zulaport Cutthroat"],
  },
  {
    id: "thranduil",
    name: "Thranduil, the Elvenking",
    colors: "Blue / Black / Green",
    strategy: "Elves & Graveyard",
    description: "Use Elves and the graveyard to give the Elvenking more things to do.",
    image: "/images/thranduil.webp",
    background: "bg-gradient-to-br from-[#234f61] to-[#48734b]",
    decklist: "https://edhrec.com/average-decks/thranduil-the-elvenking/upgraded/budget",
    cards: ["Llanowar Elves", "Priest of Titania", "Lathril, Blade of the Elves"],
  },
  {
    id: "trelasarra",
    name: "Trelasarra, Moon Dancer",
    colors: "Green / White",
    strategy: "Lifegain & Counters",
    description: "Gain life, grow creatures, and slowly build a threatening board.",
    image: "/images/trelasarra.webp",
    background: "bg-gradient-to-br from-[#5f7c53] to-[#ccaa70]",
    decklist: "https://edhrec.com/average-decks/trelasarra-moon-dancer/upgraded/budget",
    cards: ["Ajani's Pridemate", "Conclave Mentor", "Daxos, Blessed by the Sun"],
  },
];

function App() {
  const [openDeck, setOpenDeck] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState("All");

  const tags = ["All", ...new Set(decks.map((deck) => deck.colors))];

  const filteredDecks = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    return decks.filter((deck) => {
      const matchesTag = tagFilter === "All" || deck.colors === tagFilter;
      const searchableText = [
        deck.name,
        deck.colors,
        deck.strategy,
        deck.description,
        ...deck.cards,
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !normalizedQuery || searchableText.includes(normalizedQuery);

      return matchesTag && matchesSearch;
    });
  }, [searchTerm, tagFilter]);

  const featuredDeck = filteredDecks[0] || decks[0];
  const colorCount = new Set(decks.map((deck) => deck.colors)).size;

  return (
    <div className="min-h-screen bg-[#f5efe4] text-[#35271f]">
      <div className="mx-auto max-w-[1180px] px-[18px] sm:px-8">
        {/* Navigation */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d9cbbb] py-6 sm:py-[30px]">
          <a href="#top" className="text-[13px] font-extrabold tracking-[2px] no-underline sm:text-[15px]">
            MY DECK SHELF<span className="text-[#b55a39]">.</span>
          </a>
          <nav aria-label="Main navigation" className="flex gap-4 text-xs text-[#726458] sm:gap-[30px] sm:text-sm">
            <a className="hover:text-[#aa5335]" href="#decks">Decks</a>
            <a className="hover:text-[#aa5335]" href="#about">About the site</a>
          </nav>
        </header>

        <main id="top">
          {/* Introduction */}
          <section className="relative border-b border-[#d9cbbb] py-[75px] sm:min-h-[460px] sm:py-[100px]">
            <div className="flex items-center gap-[10px] text-[11px] font-extrabold tracking-[2.3px] text-[#a95436]">
              <span className="h-[2px] w-6 bg-[#a95436]" /> MY COMMANDER COLLECTION
            </div>
            <h1 className="my-6 max-w-[740px] font-serif text-[clamp(48px,7vw,90px)] leading-[1.04] tracking-[-2px] sm:tracking-[-3px]">
              Four decks.<br /><em className="text-[#a75439]">Lots of stories.</em>
            </h1>
            <p className="mb-[30px] max-w-[530px] text-base leading-[1.8] text-[#76685e]">
              A little corner of the internet for the Magic: The Gathering decks I enjoy playing.
              Nothing fancy, just my commanders and some deckbuilding ideas.
            </p>
            <a href="#decks" className="inline-block rounded bg-[#35271f] px-5 py-[13px] text-sm text-[#fff9f0] hover:bg-[#a75439]">
              Take a look <span className="ml-3" aria-hidden="true">↘</span>
            </a>
            <div className="mt-8 grid max-w-[660px] gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["Decks", decks.length],
                ["Color groups", colorCount],
                ["Format", "Commander"],
                ["Focus", featuredDeck.strategy],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[8px] border border-[#e1d3be] bg-[#f5ebde] p-3">
                  <div className="text-[10px] font-extrabold uppercase tracking-[1.8px] text-[#a95436]">{label}</div>
                  <div className="mt-2 font-serif text-[28px] leading-none text-[#35271f]">{value}</div>
                </div>
              ))}
            </div>
            <div aria-hidden="true" className="absolute right-3 top-[140px] hidden h-[120px] w-[120px] rotate-12 flex-col items-center justify-center rounded-full border-2 border-[#c8a97e] text-[#ab8055] lg:flex xl:right-16 xl:top-[150px] xl:h-40 xl:w-40">
              <strong className="font-serif text-[46px] font-normal leading-none xl:text-[62px]">04</strong>
              <span className="text-[9px] tracking-[2px] xl:text-[11px]">COMMANDERS</span>
            </div>
          </section>

          {/* Deck collection */}
          <section id="decks" className="py-[58px] sm:py-[78px]">
            <div className="mb-[26px] flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <span className="text-[11px] font-extrabold tracking-[2.3px] text-[#a95436]">01 / THE COLLECTION</span>
                <h2 className="mt-3 font-serif text-[clamp(30px,4vw,42px)] tracking-[-1px]">Meet the commanders</h2>
              </div>
              <p className="text-[13px] text-[#857569]">Commander format · {filteredDecks.length} visible deck{filteredDecks.length === 1 ? "" : "s"}</p>
            </div>

            <div className="mb-6 rounded-[10px] border border-[#e2d5c6] bg-[#fffaf3] p-4 shadow-[0_6px_18px_rgba(73,42,20,0.03)]">
              <label htmlFor="deck-search" className="mb-2 block text-[11px] font-extrabold tracking-[2px] text-[#a95436] uppercase">
                Search the shelf
              </label>
              <input
                id="deck-search"
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Try: token, elves, lifegain, or black"
                className="w-full rounded border border-[#d8c7af] bg-[#f9f4ee] px-3 py-2.5 text-sm text-[#35271f] outline-none transition focus:border-[#a95436] focus:ring-2 focus:ring-[#e8cbbb]"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setTagFilter(tag)}
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[1.2px] transition ${
                      tagFilter === tag
                        ? "border-[#a95436] bg-[#a95436] text-white"
                        : "border-[#d6c3a5] bg-transparent text-[#5e4a40] hover:bg-[#f3e6d9]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {filteredDecks.length === 0 ? (
              <div className="rounded-[12px] border border-dashed border-[#d9cbbb] bg-[#fffaf3] p-8 text-center text-sm text-[#6a584f]">
                No decks match your current search. Try a broader keyword or switch the filter tag.
              </div>
            ) : (
              <div className="grid gap-[22px] lg:grid-cols-2">
                {filteredDecks.map((deck, index) => (
                  <article key={deck.id} className="grid min-w-0 overflow-hidden rounded-[9px] border border-[#e2d5c6] bg-[#fffaf3] shadow-[0_6px_20px_rgba(73,42,20,0.04)] sm:grid-cols-[43%_57%]">
                    <div className={`relative flex min-h-[240px] items-center justify-center px-[18px] py-6 sm:min-h-[300px] ${deck.background}`}>
                      <span className="absolute left-4 top-3 text-[11px] font-bold tracking-[2px] text-white/75">0{index + 1}</span>
                      <img
                        className="h-[225px] w-[170px] max-w-full rounded-[9px] object-cover object-center shadow-[0_12px_25px_#0005] sm:h-[255px] sm:w-[185px]"
                        src={deck.image}
                        alt={`Fantasy illustration representing ${deck.name}`}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex min-w-0 flex-col items-start p-[22px] sm:p-[26px]">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[1.4px] text-[#ab6245]">
                        COMMANDER · {deck.strategy}
                      </p>
                      <h3 className="mb-3 font-serif text-[clamp(20px,2vw,25px)] leading-[1.18]">{deck.name}</h3>
                      <p className="mb-3 text-xs font-bold text-[#615349]">{deck.colors}</p>
                      <p className="mb-[18px] text-[13px] leading-[1.55] text-[#7b6c60]">{deck.description}</p>
                      <div className="mt-auto flex flex-wrap gap-[9px]">
                        <a className="inline-flex items-center rounded bg-[#3c302a] px-3 py-[11px] text-xs font-bold text-[#fffaf3] hover:bg-[#a95436]"
                           href={deck.decklist} target="_blank" rel="noopener noreferrer">
                          Budget decklist ↗
                        </a>
                        <button type="button" className="cursor-pointer rounded border border-[#d1bfad] bg-transparent px-3 py-[10px] text-xs font-bold text-[#5e4a40] hover:bg-[#f4e8dc]"
                          aria-expanded={openDeck === deck.id}
                          onClick={() => setOpenDeck(openDeck === deck.id ? null : deck.id)}>
                          {openDeck === deck.id ? "Less −" : "Quick look +"}
                        </button>
                      </div>
                    </div>
                    {openDeck === deck.id && (
                      <div className="border-t border-[#dfd0be] bg-[#f4eadd] px-[22px] py-[18px] text-[13px] sm:col-span-2">
                        <strong>A few cards to explore for this theme:</strong>
                        <ul className="my-[10px] list-disc pl-[22px] leading-[1.7]">
                          {deck.cards.map((card) => <li key={card}>{card}</li>)}
                        </ul>
                        <p className="mt-[10px] text-xs leading-normal text-[#7e6c5c]">
                          These are example synergy ideas, not a verified copy of the linked decklist or my own collection.
                        </p>
                        <CardPriceChecker cardNames={deck.cards} />
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
            <p className="mt-[25px] max-w-[800px] text-xs leading-[1.7] text-[#87776a]">
              Decklist links open EDHREC's budget-filtered Bracket 3 (Upgraded) average builds. They're ideas to explore,
              not verified copies of my personal decks. Prices and power levels may vary.
            </p>
          </section>

          {/* Tools used */}
          <section id="about" className="grid gap-7 border-t border-[#d9cbbb] py-[75px] lg:grid-cols-[1fr_1.1fr] lg:gap-x-20">
            <div>
              <span className="text-[11px] font-extrabold tracking-[2.3px] text-[#a95436]">02 / BEHIND THE SITE</span>
              <h2 className="mt-3 max-w-[390px] font-serif text-[clamp(30px,4vw,42px)] tracking-[-1px]">Made with a few simple tools.</h2>
              <p className="mt-4 max-w-[380px] text-[15px] leading-[1.75] text-[#75685d]">
                This is a small one-page React project made to showcase my favorite Magic decks. I kept it simple on purpose.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["01", "React", "Builds the deck cards and the working buttons."],
                ["02", "Tailwind CSS", "Styles the colors, layout, and mobile design."],
                ["03", "Vite", "Runs the website while I'm working on it."],
                ["04", "VS Code", "Where I write and edit the code."],
              ].map(([number, name, description]) => (
                <div key={name} className="rounded-[7px] border border-[#ddd0bd] bg-[#eae0d2] p-4 sm:p-5">
                  <span className="mb-[17px] block text-[11px] text-[#a75b3c]">{number}</span>
                  <strong className="font-serif text-xl font-normal">{name}</strong>
                  <p className="mt-2 text-xs leading-[1.55] text-[#786b5f]">{description}</p>
                </div>
              ))}
            </div>
            <div className="text-[13px] text-[#817267] lg:col-span-2">
              Original fantasy illustrations (stored locally) · Decklist inspiration:{" "}
              <a className="text-[#9c4e34] underline" href="https://edhrec.com/" target="_blank" rel="noopener noreferrer">EDHREC</a>
              {" "}· Bracket guide:{" "}
              <a className="text-[#9c4e34] underline" href="https://magic.wizards.com/en/formats/commander" target="_blank" rel="noopener noreferrer">Wizards of the Coast</a>
            </div>
          </section>
        </main>

        <footer className="flex flex-wrap items-center gap-x-[25px] gap-y-[10px] border-t border-[#d9cbbb] py-7 text-xs text-[#817368]">
          <strong className="tracking-[1px] text-[#362820]">MY DECK SHELF.</strong>
          <span>Made for a love of Commander.</span>
          <small className="basis-full text-[11px] leading-normal">
            Unofficial fan project. Not endorsed by Wizards of the Coast. Portraits are original fantasy illustrations, not official Magic card images.
          </small>
        </footer>
      </div>
    </div>
  );
}

export default App;
