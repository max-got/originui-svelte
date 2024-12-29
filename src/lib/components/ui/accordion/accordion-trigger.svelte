<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Accordion as AccordionPrimitive, type WithoutChild } from 'bits-ui';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	let {
		children,
		class: className,
		ref = $bindable(null),
		...restProps
	}: WithoutChild<AccordionPrimitive.TriggerProps> = $props();
</script>

<AccordionPrimitive.Header class="flex">
	<AccordionPrimitive.Trigger
		bind:ref
		class={cn(
			'flex flex-1 items-center justify-between py-4 text-left font-semibold transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		<ChevronDown
			size={16}
			stroke-width={2}
			aria-hidden
			class="shrink-0 opacity-60 transition-transform duration-200"
		/>
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
