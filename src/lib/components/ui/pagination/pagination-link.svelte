<script lang="ts">
	import { type ButtonProps, buttonVariants } from '$lib/components/ui/button.svelte';
	import { cn } from '$lib/utils.js';

	import { Pagination as PaginationPrimitive, type WithoutChild } from 'bits-ui';

	type Props = WithoutChild<PaginationPrimitive.PageProps> &
		Pick<ButtonProps, 'size'> & {
			isActive?: boolean;
		};

	let {
		children,
		class: className,
		isActive = false,
		page,
		ref = $bindable(null),
		size = 'icon',
		...restProps
	}: Props = $props();
</script>

{#snippet Fallback()}
	{page.value}
{/snippet}

<PaginationPrimitive.Page
	{page}
	bind:ref
	aria-current={isActive ? 'page' : undefined}
	class={cn(
		buttonVariants({
			size,
			variant: isActive ? 'outline' : 'ghost'
		}),
		className
	)}
	{...restProps}
	children={children || Fallback}
/>
