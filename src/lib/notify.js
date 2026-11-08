// Notification zeigen, wenn ein Issue auf "Done" kommt

export async function notifyDone(issue) {
	if (!('Notification' in window)) return;                     // Browser kann keine Notifications → nichts tun
	const permission = await Notification.requestPermission();   // Erlaubnis fragen (fragt nur beim 1. Mal)
	if (permission !== 'granted') return;                        // nicht erlaubt → nichts tun

	const sw = await navigator.serviceWorker.getRegistration();  // Service Worker holen (nur im Build da)
	if (sw) {
		sw.showNotification('Erledigt ✓', { body: issue.title }); // über den Service Worker zeigen
	} else {
		new Notification('Erledigt ✓', { body: issue.title });    // sonst normal zeigen
	}
}
