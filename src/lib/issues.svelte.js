// Hier sind alle Issues gespeichert

import { browser } from '$app/env';   // true = Code läuft im Browser

// die 4 Spalten
export const LANES = ['Do', 'Doing', 'Done', 'Archiv'];

// Issues aus localStorage laden (beim Build gibt es kein localStorage → leere Liste)
const saved = browser ? localStorage.getItem('issues') : null;

// $state = wenn sich die Liste ändert, aktualisiert sich die Seite automatisch
export const board = $state({ issues: JSON.parse(saved || '[]') });

// alle Issues in localStorage speichern
function save() {
	localStorage.setItem('issues', JSON.stringify(board.issues));   // Liste → Text → speichern
}

// neues Issue hinzufügen
export function addIssue(issue) {
	board.issues.push(issue);   // hinten an die Liste hängen
	save();                     // speichern
}

// Issue in eine andere Spalte verschieben
export function moveIssue(id, lane) {
	const issue = board.issues.find((i) => i.id === id);   // Issue mit dieser ID suchen
	issue.lane = lane;                                     // neue Spalte setzen
	save();                                                // speichern
	return issue;                                          // Issue zurückgeben (für die Notification)
}

// Issue löschen
export function deleteIssue(id) {
	board.issues = board.issues.filter((i) => i.id !== id);   // alle behalten außer diesem
	save();                                                   // speichern
}
