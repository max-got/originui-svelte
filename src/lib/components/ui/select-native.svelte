<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils.js';

	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	let {
		children,
		class: className,
		ref = $bindable(null),
		value = $bindable(),
		...restProps
	}: WithElementRef<HTMLSelectAttributes> = $props();
</script>

<div class="relative">
	<select
		bind:this={ref}
		bind:value
		class={cn(
			'peer inline-flex w-full cursor-pointer appearance-none items-center rounded-lg border border-input bg-background text-sm text-foreground shadow-sm shadow-black/5 transition-shadow focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 has-[option[disabled]:checked]:text-muted-foreground',
			restProps.multiple
				? 'py-1 [&>*]:px-3 [&>*]:py-1 [&_option:checked]:bg-accent'
				: 'h-9 pe-8 ps-3',
			className
		)}
		{...restProps}
	>
		{@render children?.()}
	</select>
	{#if !restProps.multiple}
		<span
			class="pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50"
		>
			<ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
		</span>
	{/if}
</div>
