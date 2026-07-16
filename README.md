# AICU L18 - URL workshop

Baseline indipendente per il workshop post-aula sul percorso:

```txt
referenceUrl -> API -> SQLite -> response -> href
```

## Requisiti

- Node.js 26 o superiore;
- pnpm.

## Setup

```bash
pnpm install
pnpm setup:browsers
```

## Primo run

```bash
pnpm test:e2e
```

Il risultato iniziale e' intenzionale:

- URL `https`: verde;
- URL `javascript:`: rosso.

Per aprire soltanto i due scenari security in modalita' debug:

```bash
pnpm demo:security --debug
```

Il risultato atteso resta un test verde e un test rosso.

## Missione

Leggi `consegna.md`. Devi definire una policy minima dei protocolli consentiti e
applicare un fallback sicuro, senza cambiare il valore memorizzato o aggiungere
dipendenze.

Il requisito certo e' `https` consentito e `javascript:` rifiutato. Ogni protocollo
aggiuntivo richiede una scelta esplicita.

## Comandi

```bash
pnpm dev
pnpm check
pnpm test
pnpm test:e2e
pnpm test:all
```

SQLite usa un file locale in `data/` per `pnpm dev` e un database in-memory nei test.

## Demo manuale locale

Avviare l'app:

```bash
pnpm demo:reset
pnpm dev
```

Creare un ticket con titolo `Riferimento malevolo L18` e incollare nel campo
`URL di riferimento`:

```txt
javascript:(()=>{document.body.innerHTML='<main style="position:fixed;inset:0;z-index:999999;display:grid;place-items:center;background:#ff00a8;color:#050005;border:16px solid red;font:900 5vw system-ui;text-align:center">CONTENUTO MALEVOLO ESEGUITO<br><small style="font-size:2vw">QUESTA UI NON APPARTIENE AL PRODOTTO</small></main>';document.body.style.overflow='hidden'})()
```

Dopo il salvataggio, aprire `Dettagli` e selezionare `Apri riferimento`. Il payload
modifica solo la pagina locale con un takeover chiaramente dimostrativo. Per ripristinare:

```bash
pnpm demo:reset
```

Ricaricare quindi la dashboard.
