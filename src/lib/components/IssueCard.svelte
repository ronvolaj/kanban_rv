<script>
	import { format, formatDistanceToNow, isPast, endOfDay, parseISO } from 'date-fns';   // Datums-Funktionen
	import { de } from 'date-fns/locale';                     // deutsche Sprache
	import { deleteIssue } from '../issues.svelte.js';        // Löschen
	import { exportIcs, shareIssue } from '../export.js';     // ICS und Teilen

	let { issue } = $props();   // das Issue bekommen

	let due = $derived(parseISO(issue.dueDate));                          // Due-Date als echtes Datum
	let overdue = $derived(isPast(endOfDay(due)) && issue.lane !== 'Done' && issue.lane !== 'Archiv'); // überfällig?

	// Karte wird angefangen zu ziehen
	function onDragStart(event) {
		event.dataTransfer.setData('text', issue.id);   // ID merken
	}
</script>

<!-- die Karte; rot, wenn überfällig -->
<article
	class="mb-3 cursor-grab rounded-xl border p-3 shadow-sm {overdue ? 'border-red-500 bg-red-50' : 'border-line bg-white'}"
	draggable="true"
	ondragstart={onDragStart}
>
	<!-- Warnung, nur wenn überfällig -->
	{#if overdue}
		<p class="text-sm font-bold text-red-600">⚠ Überfällig!</p>
	{/if}

	<!-- Titel -->
	<h3 class="font-serif text-lg">{issue.title}</h3>
	<!-- Beschreibung -->
	<p class="text-sm text-gray-600">{issue.description}</p>

	<!-- Infos -->
	<p class="mt-2 text-xs text-gray-500">
		Fällig: {format(due, 'd. MMM yyyy', { locale: de })}<br />
		Erstellt: {formatDistanceToNow(parseISO(issue.createdAt), { locale: de, addSuffix: true })}<br />
		{issue.storyPoints} SP · Priorität: {issue.priority}
	</p>

	<!-- Buttons -->
	<div class="mt-2 flex gap-2 text-xs">
		<button class="rounded bg-sand px-2 py-1" onclick={() => shareIssue(issue)}>Teilen</button>
		<button class="rounded bg-sand px-2 py-1" onclick={() => exportIcs(issue)}>ICS</button>
		<button class="rounded bg-sand px-2 py-1" onclick={() => deleteIssue(issue.id)}>Löschen</button>
	</div>
</article>
