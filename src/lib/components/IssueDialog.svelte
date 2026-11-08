<script>
	import { addIssue } from '../issues.svelte.js';   // Funktion zum Hinzufügen

	let dialog;   // hier kommt das <dialog>-Element rein

	// Dialog öffnen (wird von der Seite aufgerufen)
	export function open() {
		dialog.showModal();
	}

	// Formular wurde abgeschickt
	function onSubmit(event) {
		const form = new FormData(event.target);   // alle Felder lesen

		addIssue({
			id: crypto.randomUUID(),                 // eindeutige ID
			title: form.get('title'),                // Titel
			description: form.get('description'),    // Beschreibung
			createdAt: new Date().toISOString(),     // Erstellungsdatum = jetzt
			dueDate: form.get('dueDate'),            // Due-Date
			storyPoints: Number(form.get('storyPoints')), // Story Points als Zahl
			priority: form.get('priority'),          // Priorität
			lane: 'Do'                               // startet in "Do"
		});

		event.target.reset();   // Formular leeren
	}
</script>

<!-- das Popup; backdrop = dunkler Hintergrund dahinter -->
<dialog bind:this={dialog} class="m-auto w-80 rounded-2xl p-6 backdrop:bg-black/40">
	<!-- method="dialog" = beim Abschicken schließt sich das Popup -->
	<form method="dialog" onsubmit={onSubmit} class="flex flex-col gap-3">
		<h2 class="font-serif text-2xl">Neues Issue</h2>

		<!-- Eingabefelder; name = so heißt das Feld in FormData -->
		<input name="title" placeholder="Titel" required class="rounded border border-line p-2" />
		<textarea name="description" placeholder="Beschreibung" class="rounded border border-line p-2"></textarea>
		<input name="dueDate" type="date" required class="rounded border border-line p-2" />
		<input name="storyPoints" type="number" min="1" value="1" class="rounded border border-line p-2" />
		<select name="priority" class="rounded border border-line p-2">
			<option>Low</option>
			<option selected>Medium</option>
			<option>High</option>
		</select>

		<!-- Buttons -->
		<div class="flex justify-end gap-2">
			<button type="button" class="px-4 py-2" onclick={() => dialog.close()}>Abbrechen</button>
			<button class="rounded-full bg-clay px-4 py-2 text-white">Anlegen</button>
		</div>
	</form>
</dialog>
