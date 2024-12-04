<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Command as CommandPrimitive } from 'bits-ui';

	type Props = CommandPrimitive.ListProps & {
		inputRef?: HTMLElement;
	};

	let { class: className, inputRef, ref = $bindable(null), ...restProps }: Props = $props();
</script>

<CommandPrimitive.List
	{...restProps}
	bind:ref
	class={cn('bg-popover text-popover-foreground shadow-lg shadow-black/5 outline-none', className)}
	onmouseup={() => {
		inputRef?.focus();
	}}
/>
