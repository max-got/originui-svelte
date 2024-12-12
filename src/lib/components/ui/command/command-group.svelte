<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Command as CommandPrimitive } from 'bits-ui';

	let {
		children,
		class: className,
		heading,
		ref = $bindable(null),
		...restProps
	}: CommandPrimitive.GroupProps & {
		heading?: string;
	} = $props();
</script>

<CommandPrimitive.Group
	class={cn(
		'[&_[data-command-group-heading]]:text-muted-foreground", overflow-hidden p-2 text-foreground [&_[data-command-group-heading]]:px-3 [&_[data-command-group-heading]]:py-2 [&_[data-command-group-heading]]:text-xs [&_[data-command-group-heading]]:font-medium',
		className
	)}
	bind:ref
	{...restProps}
>
	{#if heading}
		<CommandPrimitive.GroupHeading class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
			{heading}
		</CommandPrimitive.GroupHeading>
	{/if}
	<CommandPrimitive.GroupItems {children} />
</CommandPrimitive.Group>
