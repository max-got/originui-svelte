<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Avatar as AvatarPrimitive } from 'bits-ui';

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: AvatarPrimitive.FallbackProps = $props();
</script>

<AvatarPrimitive.Fallback
	bind:ref
	class={cn(
		'flex size-full items-center justify-center rounded-[inherit] bg-secondary text-xs',
		className
	)}
	{...restProps}
/>
