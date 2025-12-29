<script lang="ts">
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';

	import Button from '$lib/registry/default/ui/button.svelte';
</script>

<Button variant="link" class="gap-1">
	<ChevronLeftIcon class="opacity-60" size={16} aria-hidden="true" />
	Go back
</Button>
