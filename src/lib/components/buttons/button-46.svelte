<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import IconChevronDown from 'lucide-svelte/icons/chevron-down';
	import IconChevronUp from 'lucide-svelte/icons/chevron-up';

	let isExpanded = $state(false);

	function toggleExpand() {
		isExpanded = !isExpanded;
	}
</script>

<Button
	variant="ghost"
	onclick={toggleExpand}
	aria-expanded={isExpanded}
	aria-controls="expandable-content"
>
	{isExpanded ? 'Show less' : 'Show more'}
	{#if isExpanded}
		<IconChevronUp class="-me-1 ms-1" size={16} stroke-width="2" aria-hidden="true" />
	{:else}
		<IconChevronDown class="-me-1 ms-1" size={16} stroke-width="2" aria-hidden="true" />
	{/if}
</Button>
