# Adweb Endringssystem

Prototype for **Adweb Oppgaver** — et verktøy der medieplanleggere behandler endringsforespørsler fra annonsører, følger opp innkommende kampanjer og beholder sporbarhet for hva som er gjort.

Prosjektet er bygget som en frontend-prototype med mockdata. Målet er å visualisere arbeidsflyt, UI-mønstre og informasjonsbehov før integrasjon mot ekte Adweb-backend.

## Intensjon

Planleggere mottar jevnlig endringsforespørsler og nye kampanjer fra eksterne bookingsystemer. De trenger ett sted med:

- **Oversikt** over hva som krever handling nå
- **Sporbarhet** for godkjente, avslåtte og avklarte saker
- **Tydelige handlinger** — godkjenne, avslå, be om avklaring eller bekrefte lest

Denne prototypen utforsker hvordan det kan presenteres i én samlet visning, med fokus på lesbarhet, statusbadges og sporbar historikk.

## Funksjoner

### Mine oppgaver

Ventende endringsforespørsler som planleggeren skal behandle.

- **Planleggerfilter** — filtrer oppgaver per planlegger eller vis alle
- **Utvidbar liste** — hver oppgave viser annonsør, ordrenummer og kampanje
- **Forespurt av** — navn på annonsørkontakt som lenke (klar for kobling til kontaktinfo)
- **Forespurte endringer** — detaljert liste over hva som er bedt om endret
- **Godkjenn** — flytter forespørselen til *Siste endringer* med badge **Endring**
- **Avslå** — åpner modal for avslagsmelding; flytter til *Siste endringer* med badge **Avslått** og synlig avslagsgrunn
- **Empty state** — illustrasjon og teksten «Det er ingen flere oppgaver idag.» når listen er tom

### Siste endringer

Blandet aktivitetsliste med historikk og innkommende hendelser.

| Badge | Type | Beskrivelse |
|-------|------|-------------|
| **Ny** | Kampanje | Innkommende kampanje fra eksternt bookingsystem |
| **Avklaring** | Kampanje | Kampanje lest, men planlegger har sendt avklaringsmelding |
| **Endring** | Endring | Godkjent endringsforespørsel |
| **Avslått** | Endring | Avslått endringsforespørsel med avslagsmelding |

**Kampanjer (Ny / Avklaring)**

- Fullt kampanjesammendrag med ordrelinjer, budsjett og vedlegg
- **Trenger avklaring** — modal for å beskrive hva som må avklares; kampanjen blir liggende med badge **Avklaring**
- **Bekreft lest** — fjerner kampanjen fra listen når alt er avklart

**Endringer (Endring / Avslått)**

- Viser gjennomførte eller forespurte endringer
- Avslåtte viser i tillegg avslagsmelding fra planlegger
- **Bekreft lest** — fjerner oppføringen fra listen

**Empty state** — illustrasjon og teksten «Det finnes ingen flere endringer idag» når listen er tom.

## Teknologi

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 6](https://vite.dev/) for utvikling og bygging
- CSS Modules (ingen Tailwind)
- Mockdata i `src/data/mockData.ts`

## Kom i gang

```bash
npm install
npm run dev
```

Appen kjører på [http://localhost:5173](http://localhost:5173).

Andre kommandoer:

```bash
npm run build    # Produksjonsbygg
npm run preview  # Forhåndsvis produksjonsbygg lokalt
```

## Prosjektstruktur

```
src/
├── App.tsx              # Hovedlogikk og tilstand
├── components/          # UI-komponenter (kort, modal, filter, osv.)
├── data/mockData.ts     # Dummy-data for oppgaver og siste endringer
├── types/index.ts       # TypeScript-typer
└── utils/recentItems.ts # Hjelpere for å opprette oppføringer i historikk
public/
└── Empty.svg            # Empty state-illustrasjon
```

## Status

Dette er en **UI-prototype**. Data persisteres ikke mellom sesjoner, og det finnes ingen API-integrasjon ennå. Mockdata kan endres i `src/data/mockData.ts` for å teste ulike scenarier.

Designet er basert på Figma-skisser for AdWeb.

## Lisens

Privat prosjekt.
