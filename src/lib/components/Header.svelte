<script>
	import { format } from 'date-fns';        // Datum formatieren
	import { de } from 'date-fns/locale';     // deutsche Sprache

	let { onAdd, onExport } = $props();       // zwei Funktionen von der Seite bekommen

	const today = format(new Date(), 'EEEE, d. MMMM yyyy', { locale: de });   // z. B. "Montag, 9. November 2026"
</script>

<!-- Kopfzeile: Titel links, Buttons rechts -->
<header class="mb-6 flex flex-wrap items-end justify-between gap-4">
	<div>
		<!-- heutiges Datum -->
		<p class="text-sm text-clay">{today}</p>
		<!-- Titel -->
		<h1 class="font-serif text-5xl">Kanban</h1>
	</div>

	<div class="flex gap-2">
		<!-- Button: alle Issues als CSV herunterladen -->
		<button class="rounded-full border border-line bg-white px-4 py-2" onclick={onExport}>CSV Export</button>
		<!-- Button: Dialog für ein neues Issue öffnen -->
		<button class="rounded-full bg-clay px-4 py-2 text-white" onclick={onAdd}>+ Neues Issue</button>
	</div>
</header>
