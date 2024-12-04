<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Command as CommandPrimitive } from 'bits-ui';

	let {
		class: className,
		ref = $bindable(null),
		value = $bindable(''),
		...restProps
	}: CommandPrimitive.InputProps = $props();
</script>

<CommandPrimitive.Input
	bind:value
	bind:ref
	class={cn(
		'flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed',
		className
	)}
	{...restProps}
/>
