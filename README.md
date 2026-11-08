# Kanban PWA

Ein einfaches Kanban-Board mit **SvelteKit**, **Svelte 5** und **Tailwind CSS**. Es speichert alles in `localStorage`, lässt sich als **PWA** installieren und funktioniert offline.

## Funktionen

- 4 Spalten: Do, Doing, Done, Archiv
- Neues Issue über ein HTML-`<dialog>` anlegen
- Issues mit Drag & Drop verschieben (ohne Library)
- Ein Issue hat: Title, Description, Creation-Date, Due-Date, Story Points, Priority
- Speichern in `localStorage`
- Summe der Story Points pro Spalte
- Rote Warnung, wenn das Due-Date vorbei ist
- Notification, wenn ein Issue auf Done kommt
- Ein Issue als `.ics` exportieren oder teilen (Web Share API)
- Alle Issues als `.csv` exportieren
- Datum mit **date-fns**
- PWA: Manifest und Service Worker

## Starten

```bash
npm install
npm run dev       # Entwicklung
npm run build     # fertige Seite im Ordner build/
npm run preview   # Build testen (PWA und offline)
```

## Dateien

| Datei | Aufgabe |
|---|---|
| `src/app.html` | HTML-Grundgerüst, Link zum Manifest |
| `src/app.css` | Tailwind und eigene Farben |
| `src/service-worker.js` | speichert alle Dateien für offline |
| `src/routes/+layout.js` | App nur im Browser, fertige index.html |
| `src/routes/+layout.svelte` | lädt das CSS |
| `src/routes/+page.svelte` | Startseite: Header, 4 Spalten, Dialog |
| `src/lib/issues.svelte.js` | alle Issues und localStorage |
| `src/lib/export.js` | ICS, CSV, Teilen |
| `src/lib/notify.js` | Notification bei Done |
| `src/lib/components/Header.svelte` | Titel, Datum, Buttons |
| `src/lib/components/Lane.svelte` | eine Spalte, Drop-Ziel, Summe |
| `src/lib/components/IssueCard.svelte` | eine Karte, Warnung, Buttons |
| `src/lib/components/IssueDialog.svelte` | Formular im `<dialog>` |
| `static/manifest.webmanifest` | macht die App installierbar |
