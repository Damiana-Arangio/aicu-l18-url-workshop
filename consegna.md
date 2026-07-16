# Workshop L18 - Un link di cui non ci fidiamo

## Scenario

Il campo opzionale `referenceUrl` viene salvato nel ticket e usato come destinazione
del link **Apri riferimento** nel pannello dettagli.

La baseline tratta ogni stringa non vuota come una destinazione navigabile.

## Missione

Definisci e implementa una policy minima dei protocolli consentiti.

```txt
Requisito certo: https deve funzionare; javascript: deve essere rifiutato.
Ogni protocollo aggiuntivo deve essere una scelta esplicita.
```

## Criteri di accettazione

- un URL `https` valido resta disponibile;
- uno schema `javascript:` non viene esposto come destinazione navigabile;
- il pannello mostra `Riferimento non disponibile.` per un valore non consentito;
- il fallback non modifica il valore originale memorizzato;
- nessuna nuova dipendenza;
- test mirato e suite precedente verdi;
- diff limitato al percorso `referenceUrl -> href`.

## Processo

1. Esegui `pnpm test:e2e`.
2. Segui il dato dalla request all'attributo `href`.
3. Scrivi la policy in una frase.
4. Implementa il controllo nel punto d'uso.
5. Esegui `pnpm test:e2e` e `pnpm test:all`.
6. Rivedi il diff.

Puoi usare un agente liberamente, ma devi saper motivare policy, patch e motivo del
verde.

## Stop

Non aggiungere redirect server, CSP, auth, logger, sanitizzazione globale o refactor
generali.
