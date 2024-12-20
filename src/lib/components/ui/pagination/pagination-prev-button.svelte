<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button.svelte';
	import { cn } from '$lib/utils.js';

	import { Pagination as PaginationPrimitive } from 'bits-ui';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';

	let {
		children,
		class: className,
		ref = $bindable(null),
		...restProps
	}: PaginationPrimitive.PrevButtonProps = $props();
</script>

{#snippet Fallback()}
	<span>Previous</span>
	<ChevronLeft size={16} stroke-width={2} />
{/snippet}

<PaginationPrimitive.PrevButton
	bind:ref
	aria-label="Go to previous page"
	class={cn(buttonVariants({ className: 'gap-1 pl-2.5', size: 'default' }), className)}
	children={children || Fallback}
	{...restProps}
/>
