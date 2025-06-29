<script lang="ts">
	import Badge from '$lib/components/ui/badge.svelte';
	import Button from '$lib/registry/default/ui/button.svelte';

	import BellIcon from '@lucide/svelte/icons/bell';

	let count = $state(3);

	function handleClick() {
		count = 0;
	}
</script>

<Button
	variant="outline"
	size="icon"
	class="relative"
	onclick={handleClick}
	aria-label="Notifications"
>
	<BellIcon size={16} aria-hidden="true" />
	{#if count > 0}
		<Badge class="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
			{count > 99 ? '99+' : count}
		</Badge>
	{/if}
</Button>
