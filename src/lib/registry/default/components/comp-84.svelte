<script lang="ts">
	import Sparkles from '@lucide/svelte/icons/sparkles';

	import Button from '$lib/registry/default/ui/button.svelte';
</script>

<Button variant="outline">
	Button
	<Sparkles class="-me-1 opacity-60" size={16} aria-hidden="true" />
</Button>
