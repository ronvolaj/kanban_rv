// Einstellungen für Vite (startet und baut die App)
import { sveltekit } from '@sveltejs/kit/vite';     // SvelteKit-Plugin
import adapter from '@sveltejs/adapter-static';     // baut eine normale, statische Webseite
import tailwindcss from '@tailwindcss/vite';        // Tailwind-Plugin
import { defineConfig } from 'vite';                // Hilfsfunktion für die Einstellungen

export default defineConfig({
	plugins: [
		tailwindcss(),                       // Tailwind einschalten
		sveltekit({ adapter: adapter() })    // SvelteKit einschalten, fertige Seite kommt in "build"
	]
});
