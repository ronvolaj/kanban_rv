<script>
	import Header from '../lib/components/Header.svelte';             // Kopfzeile
	import Lane from '../lib/components/Lane.svelte';                 // Spalte
	import IssueDialog from '../lib/components/IssueDialog.svelte';   // Popup
	import { board, LANES } from '../lib/issues.svelte.js';           // Issues und Spalten
	import { exportCsv } from '../lib/export.js';                     // CSV-Export

	let dialog = $state();   // hier kommt das Popup rein
</script>

<main class="mx-auto max-w-6xl p-6">
	<!-- Kopfzeile mit zwei Funktionen für die Buttons -->
	<Header onAdd={() => dialog.open()} onExport={() => exportCsv(board.issues)} />

	<!-- 4 Spalten nebeneinander (auf dem Handy untereinander) -->
	<div class="grid gap-4 md:grid-cols-4">
		{#each LANES as lane}
			<!-- jede Spalte bekommt nur ihre Issues -->
			<Lane {lane} issues={board.issues.filter((i) => i.lane === lane)} />
		{/each}
	</div>
</main>

<!-- Popup für neue Issues -->
<IssueDialog bind:this={dialog} />
