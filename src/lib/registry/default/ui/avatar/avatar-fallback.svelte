<script lang="ts">
	import { Avatar as AvatarPrimitive } from 'bits-ui';

	import { cn } from '$lib/registry/default/lib/utils.js';

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: AvatarPrimitive.FallbackProps = $props();
</script>

<AvatarPrimitive.Fallback
	bind:ref
	class={cn(
		'bg-secondary flex size-full items-center justify-center rounded-[inherit] text-xs',
		className
	)}
	{...restProps}
/>
