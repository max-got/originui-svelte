<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import Pin from 'lucide-svelte/icons/pin';
</script>

<div
	class="inline-flex -space-x-px divide-x divide-primary-foreground/30 rounded-lg shadow-sm shadow-black/[0.04] rtl:space-x-reverse"
>
	<Button
		class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
		size="icon"
		aria-label="Options"
	>
		<ChevronDown size={16} stroke-width={2} aria-hidden="true" />
	</Button>
	<Button class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10">
		<Pin class="-ms-1 me-2 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
		Pinned
	</Button>
</div>
