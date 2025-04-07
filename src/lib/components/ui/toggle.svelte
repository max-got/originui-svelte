<script lang="ts" module>
	import type { ToggleRootProps } from 'bits-ui';

	import { tv, type VariantProps } from 'tailwind-variants';

	export const toggleVariants = tv({
		base: 'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
		defaultVariants: {
			size: 'default',
			variant: 'default'
		},
		variants: {
			size: {
				default: 'h-9 px-3',
				lg: 'h-10 px-3',
				sm: 'h-8 px-2'
			},
			variant: {
				default: 'bg-transparent',
				outline:
					'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground'
			}
		}
	});

	export type ToggleVariant = VariantProps<typeof toggleVariants>['variant'];
	export type ToggleSize = VariantProps<typeof toggleVariants>['size'];
	export type ToggleVariants = VariantProps<typeof toggleVariants>;
	export type ToggleProps = ToggleRootProps & {
		class?: string;
		size?: ToggleSize;
		variant?: ToggleVariant;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Toggle as TogglePrimitive } from 'bits-ui';

	let {
		class: className,
		pressed = $bindable(false),
		ref = $bindable(null),
		size = 'default',
		variant = 'default',
		...restProps
	}: ToggleProps = $props();
</script>

<TogglePrimitive.Root
	bind:ref
	bind:pressed
	class={cn(toggleVariants({ className, size, variant }))}
	{...restProps}
/>
