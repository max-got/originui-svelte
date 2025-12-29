<script lang="ts" module>
	import { getContext, setContext } from 'svelte';

	import type { ToggleVariants } from '$lib/registry/default/ui/toggle.svelte';

	export function setToggleGroupCtx(props: ToggleVariants) {
		setContext('toggleGroup', props);
	}

	export function getToggleGroupCtx() {
		return getContext<ToggleVariants>('toggleGroup');
	}
</script>

<script lang="ts">
	import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';

	import { cn } from '$lib/registry/default/lib/utils.js';

	let {
		class: className,
		ref = $bindable(null),
		size = 'default',
		value = $bindable(),
		variant = 'default',
		...restProps
	}: ToggleGroupPrimitive.RootProps & ToggleVariants = $props();

	setToggleGroupCtx({
		size,
		variant
	});
</script>

<ToggleGroupPrimitive.Root
	bind:value={value as never}
	bind:ref
	class={cn(
		'group/toggle-group flex items-center rounded-md data-[variant=outline]:shadow-2xs',
		className
	)}
	{...restProps}
/>
