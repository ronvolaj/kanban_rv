// Export als ICS und CSV, und Teilen

import { format } from 'date-fns';   // Datum als Text formatieren

// Text als Datei herunterladen
function download(name, text) {
	const a = document.createElement('a');                     // unsichtbarer Link
	a.href = URL.createObjectURL(new Blob([text]));            // Link zeigt auf den Text als Datei
	a.download = name;                                         // Dateiname
	a.click();                                                 // klicken → Download startet
}

// ein Issue als Kalendertermin (.ics)
export function exportIcs(issue) {
	const day = issue.dueDate.replaceAll('-', '');   // "2026-11-20" → "20261120"
	const ics = [
		'BEGIN:VCALENDAR',                                  // Kalender Anfang
		'VERSION:2.0',                                      // Version
		'PRODID:-//Kanban//DE',                             // Programmname
		'BEGIN:VEVENT',                                     // Termin Anfang
		'UID:' + issue.id,                                  // eindeutige ID
		'DTSTAMP:' + format(new Date(), "yyyyMMdd'T'HHmmss"), // Erstellzeit
		'DTSTART;VALUE=DATE:' + day,                        // ganztägig am Due-Date
		'SUMMARY:' + issue.title,                           // Titel
		'DESCRIPTION:' + issue.description.replaceAll('\n', ' '), // Beschreibung (ohne Zeilenumbrüche)
		'END:VEVENT',                                       // Termin Ende
		'END:VCALENDAR'                                     // Kalender Ende
	].join('\r\n');                                         // Zeilen verbinden
	download(issue.title + '.ics', ics);                    // herunterladen
}

// alle Issues als Tabelle (.csv)
export function exportCsv(issues) {
	let csv = 'Title;Description;Lane;Created;Due;Story Points;Priority\n';   // Kopfzeile
	for (const i of issues) {                                                 // für jedes Issue …
		csv += `"${i.title}";"${i.description}";"${i.lane}";"${i.createdAt}";"${i.dueDate}";"${i.storyPoints}";"${i.priority}"\n`; // … eine Zeile
	}
	download('issues.csv', csv);                                              // herunterladen
}

// ein Issue teilen (Teilen-Menü: WhatsApp, Mail …)
export function shareIssue(issue) {
	if (navigator.share) {                                                    // kann der Browser teilen?
		navigator.share({ title: issue.title, text: issue.description });     // Teilen-Menü öffnen
	} else {
		alert('Teilen geht in diesem Browser nicht.');                        // Hinweis
	}
}
