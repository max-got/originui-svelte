<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import ChevronRight from 'lucide-svelte/icons/chevron-right';
</script>

<Button class="relative pe-12">
	Next
	<span
		class="pointer-events-none absolute inset-y-0 end-0 flex w-9 items-center justify-center bg-primary-foreground/15"
	>
		<ChevronRight class="opacity-60" size={16} stroke-width={2} aria-hidden="true" />
	</span>
</Button>
