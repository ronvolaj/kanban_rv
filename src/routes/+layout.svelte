<script>
	import '../app.css';             // CSS mit Tailwind laden
	let { children } = $props();     // children = Inhalt der Seite
</script>

<!-- Seite anzeigen -->
{@render children()}
