<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Command as CommandPrimitive } from 'bits-ui';
	import Search from 'lucide-svelte/icons/search';

	let {
		class: className,
		ref = $bindable(null),
		value = $bindable(''),
		...restProps
	}: CommandPrimitive.InputProps = $props();
</script>

<div class="flex items-center border-b border-input px-5" data-command-input-wrapper="">
	<Search size={20} stroke-width={2} class="me-3 text-muted-foreground/80" />
	<CommandPrimitive.Input
		class={cn(
			'flex h-10 w-full rounded-lg bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		bind:ref
		{...restProps}
		bind:value
	/>
</div>
