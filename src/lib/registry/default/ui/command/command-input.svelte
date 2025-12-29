<script lang="ts">
	import Search from '@lucide/svelte/icons/search';
	import { Command as CommandPrimitive } from 'bits-ui';

	import { cn } from '$lib/registry/default/lib/utils.js';

	let {
		class: className,
		ref = $bindable(null),
		value = $bindable(''),
		...restProps
	}: CommandPrimitive.InputProps = $props();
</script>

<div class="border-input flex items-center border-b px-5" data-command-input-wrapper="">
	<Search size={20} class="text-muted-foreground/80 me-3" />
	<CommandPrimitive.Input
		class={cn(
			'placeholder:text-muted-foreground/70 flex h-10 w-full rounded-lg bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		bind:ref
		{...restProps}
		bind:value
	/>
</div>
