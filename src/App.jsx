import { useState } from "react";
import "./App.css";

// These are reference decklists, not a record of the exact cards I own.
// Artwork is stored locally. Decklist reference links open EDHREC.
const decks = [
  {
    id: "krenko",
    name: "Krenko, Mob Boss",
    colors: "Mono Red",
    strategy: "Goblin Tokens",
    description: "Make a bunch of Goblins, then turn that little army into a big problem.",
    colorClass: "red",
    image: "/images/krenko.webp",
    decklist: "https://edhrec.com/average-decks/krenko-mob-boss/upgraded/budget",
    cards: ["Skirk Prospector", "Goblin Chieftain", "Impact Tremors"],
  },
  {
    id: "shirei",
    name: "Shirei, Shizo's Caretaker",
    colors: "Mono Black",
    strategy: "Sacrifice & Reanimation",
    description: "Small creatures keep coming back from the graveyard to generate value.",
    colorClass: "black",
    image: "/images/shirei.webp",
    decklist: "https://edhrec.com/average-decks/shirei-shizos-caretaker/upgraded/budget",
    cards: ["Blood Artist", "Viscera Seer", "Zulaport Cutthroat"],
  },
  {
    id: "thranduil",
    name: "Thranduil, the Elvenking",
    colors: "Blue / Black / Green",
    strategy: "Elves & Graveyard",
    description: "Use Elves and the graveyard to give the Elvenking more things to do.",
    colorClass: "sultai",
    image: "/images/thranduil.webp",
    decklist: "https://edhrec.com/average-decks/thranduil-the-elvenking/upgraded/budget",
    cards: ["Llanowar Elves", "Priest of Titania", "Lathril, Blade of the Elves"],
  },
  {
    id: "trelasarra",
    name: "Trelasarra, Moon Dancer",
    colors: "Green / White",
    strategy: "Lifegain & Counters",
    description: "Gain life, grow creatures, and slowly build a threatening board.",
    colorClass: "selesnya",
    image: "/images/trelasarra.webp",
    decklist: "https://edhrec.com/average-decks/trelasarra-moon-dancer/upgraded/budget",
    cards: ["Ajani's Pridemate", "Conclave Mentor", "Daxos, Blessed by the Sun"],
  },
];

function App() {
  // Only one deck's quick details are open at a time.
  const [openDeck, setOpenDeck] = useState(null);

  return (
    <div className="site">
      <header className="site-header">
        <a className="brand" href="#top">MY DECK SHELF<span className="brand-dot">.</span></a>
        <nav aria-label="Main navigation">
          <a href="#decks">Decks</a>
          <a href="#about">About the site</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="eyebrow"><span className="eyebrow-line" /> MY COMMANDER COLLECTION</div>
          <h1>Four decks.<br /><em>Lots of stories.</em></h1>
          <p>A little corner of the internet for the Magic: The Gathering decks I enjoy playing. Nothing fancy, just my commanders and some deckbuilding ideas.</p>
          <a className="hero-link" href="#decks">Take a look <span aria-hidden="true">↘</span></a>
          <div className="hero-stamp" aria-hidden="true"><strong>04</strong><span>COMMANDERS</span></div>
        </section>

        <section id="decks" className="collection">
          <div className="section-title">
            <div>
              <span className="section-number">01 / THE COLLECTION</span>
              <h2>Meet the commanders</h2>
            </div>
            <p>Commander format · 100 cards each</p>
          </div>

          <div className="deck-grid">
            {decks.map((deck, index) => (
              <article className="deck-card" key={deck.id}>
                <div className={`card-art ${deck.colorClass}`}>
                  <span className="card-number">0{index + 1}</span>
                  <img src={deck.image} alt={`Fantasy illustration representing ${deck.name}`} loading="lazy" />
                </div>
                <div className="card-content">
                  <p className="card-label">COMMANDER · {deck.strategy}</p>
                  <h3>{deck.name}</h3>
                  <p className="card-colors">{deck.colors}</p>
                  <p className="card-description">{deck.description}</p>
                  <div className="card-actions">
                    <a href={deck.decklist} target="_blank" rel="noopener noreferrer" className="decklist-link">
                      Budget decklist ↗
                    </a>
                    <button type="button" className="details-button"
                      aria-expanded={openDeck === deck.id}
                      onClick={() => setOpenDeck(openDeck === deck.id ? null : deck.id)}>
                      {openDeck === deck.id ? "Less −" : "Quick look +"}
                    </button>
                  </div>
                </div>
                {openDeck === deck.id && (
                  <div className="card-details">
                    <strong>A few cards to explore for this theme:</strong>
                    <ul>{deck.cards.map((card) => <li key={card}>{card}</li>)}</ul>
                    <p>These are example synergy ideas, not a verified copy of the linked decklist or my own collection.</p>
                  </div>
                )}
              </article>
            ))}
          </div>
          <p className="deck-note">Decklist links open EDHREC's budget-filtered Bracket 3 (Upgraded) average builds. They're ideas to explore, not verified copies of my personal decks. Prices and power levels may vary.</p>
        </section>

        <section id="about" className="about-section">
          <div>
            <span className="section-number">02 / BEHIND THE SITE</span>
            <h2>Made with a few simple tools.</h2>
            <p>This is a small one-page React project made to showcase my favorite Magic decks. I kept it simple on purpose.</p>
          </div>
          <div className="tools-grid">
            <div className="tool"><span>01</span><strong>React</strong><p>Builds the deck cards and the working buttons.</p></div>
            <div className="tool"><span>02</span><strong>CSS</strong><p>Handles the colors, layout, and mobile design.</p></div>
            <div className="tool"><span>03</span><strong>Vite</strong><p>Runs the website while I'm working on it.</p></div>
            <div className="tool"><span>04</span><strong>VS Code</strong><p>Where I write and edit the code.</p></div>
          </div>
          <div className="credits">Original fantasy illustrations (stored locally) · Decklist inspiration: <a href="https://edhrec.com/" target="_blank" rel="noopener noreferrer">EDHREC</a> · Bracket guide: <a href="https://magic.wizards.com/en/formats/commander" target="_blank" rel="noopener noreferrer">Wizards of the Coast</a></div>
        </section>
      </main>

      <footer className="site-footer">
        <strong>MY DECK SHELF.</strong>
        <span>Made for a love of Commander.</span>
        <small>Unofficial fan project. Not endorsed by Wizards of the Coast. Portraits are original fantasy illustrations, not official Magic card images.</small>
      </footer>
    </div>
  );
}

export default App;
