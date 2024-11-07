<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
</script>

<div
	class="inline-grid grid-flow-col -space-x-px rounded-lg shadow-sm shadow-black/[0.04] rtl:space-x-reverse"
>
	<Button
		class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
		variant="outline"
		size="icon"
		aria-label="Upvote"
	>
		<ChevronUp size={16} stroke-width={2} aria-hidden="true" />
	</Button>
	<span class="flex items-center border border-input px-3 text-sm font-medium">235</span>
	<Button
		class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
		variant="outline"
		size="icon"
		aria-label="Downvote"
	>
		<ChevronDown size={16} stroke-width={2} aria-hidden="true" />
	</Button>
</div>
