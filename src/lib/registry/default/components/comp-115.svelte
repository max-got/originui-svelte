<script lang="ts">
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';

	import Button from '$lib/registry/default/ui/button.svelte';
</script>

<Button class="relative ps-12">
	Previous
	<span
		class="bg-primary-foreground/15 pointer-events-none absolute inset-y-0 start-0 flex w-9 items-center justify-center"
	>
		<ChevronLeftIcon class="opacity-60" size={16} aria-hidden="true" />
	</span>
</Button>
