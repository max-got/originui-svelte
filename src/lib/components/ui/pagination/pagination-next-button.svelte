<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button.svelte';
	import { cn } from '$lib/utils.js';

	import { Pagination as PaginationPrimitive } from 'bits-ui';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	let {
		children,
		class: className,
		ref = $bindable(null),
		...restProps
	}: PaginationPrimitive.NextButtonProps = $props();
</script>

{#snippet Fallback()}
	<span>Next</span>
	<ChevronRight size={16} stroke-width={2} />
{/snippet}

<PaginationPrimitive.NextButton
	bind:ref
	class={cn(buttonVariants({ className: 'gap-1 pr-2.5', size: 'default' }), className)}
	children={children || Fallback}
	aria-label="Go to next page"
	{...restProps}
/>
