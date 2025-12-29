<script lang="ts">
	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	import Button from '$lib/registry/default/ui/button.svelte';
</script>

<Button>
	Button
	<ChevronDown class="-me-1 opacity-60" size={16} aria-hidden="true" />
</Button>
