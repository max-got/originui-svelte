<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Accordion as AccordionPrimitive, type WithoutChild } from 'bits-ui';

	let {
		children,
		class: className,
		ref = $bindable(null),
		...restProps
	}: WithoutChild<AccordionPrimitive.ContentProps> = $props();
</script>

<AccordionPrimitive.Content
	bind:ref
	class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
	{...restProps}
>
	<div class={cn('pb-4 pt-0', className)}>
		{@render children?.()}
	</div>
</AccordionPrimitive.Content>
