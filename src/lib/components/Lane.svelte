<script>
	import IssueCard from './IssueCard.svelte';           // Karten-Komponente
	import { moveIssue } from '../issues.svelte.js';      // Funktion zum Verschieben
	import { notifyDone } from '../notify.js';            // Funktion für die Notification

	let { lane, issues } = $props();                      // Name der Spalte + ihre Issues bekommen

	let points = $derived(issues.reduce((sum, i) => sum + i.storyPoints, 0));   // Story Points zusammenzählen

	// Karte wird über die Spalte gezogen
	function onDragOver(event) {
		event.preventDefault();   // nötig, sonst kann man nicht ablegen
	}

	// Karte wird losgelassen
	function onDrop(event) {
		const id = event.dataTransfer.getData('text');   // ID der Karte lesen
		const issue = moveIssue(id, lane);               // Issue in diese Spalte verschieben
		if (lane === 'Done') notifyDone(issue);          // bei "Done" eine Notification zeigen
	}
</script>

<!-- die Spalte; ondragover + ondrop = Drag & Drop -->
<section
	aria-label={lane}
	class="min-h-96 rounded-2xl bg-white/60 p-3"
	ondragover={onDragOver}
	ondrop={onDrop}
>
	<!-- Name der Spalte und Summe der Story Points -->
	<h2 class="mb-3 flex justify-between font-serif text-xl">
		{lane}
		<span class="text-base text-clay">{points} SP</span>
	</h2>

	<!-- für jedes Issue eine Karte -->
	{#each issues as issue (issue.id)}
		<IssueCard {issue} />
	{/each}
</section>