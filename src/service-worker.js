// Service Worker: speichert alle Dateien, damit die App offline läuft
// SvelteKit registriert diese Datei automatisch (nur im Build)

import { immutable, assets, prerendered } from '$app/manifest';   // Listen mit allen Dateien der App
import { version } from '$app/env';                              // Versionsnummer des Builds
import { resolve } from '$app/paths';                            // Pfad → richtige Adresse

const CACHE = 'kanban-' + version;   // Name des Caches
const FILES = [...immutable, ...assets, ...prerendered].map((f) => resolve(f.path));   // alle Dateien

// beim Installieren: alle Dateien speichern
self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)));
});

// bei jeder Anfrage: zuerst im Cache suchen, sonst aus dem Internet laden
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request, { ignoreVary: true }).then((file) => file || fetch(event.request))
	);
});
