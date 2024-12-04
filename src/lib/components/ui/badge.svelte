<script module lang="ts">
	import type { WithElementRef } from 'bits-ui';

	import { tv, type VariantProps } from 'tailwind-variants';
	const badgeVariants = tv({
		base: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',

		defaultVariants: {
			variant: 'default'
		},
		variants: {
			variant: {
				default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
				destructive:
					'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
				outline: 'text-foreground',
				secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'
			}
		}
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

	export type BadgeProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: BadgeVariant;
	};
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils.js';
	let {
		class: className,
		ref = $bindable(null),
		variant = 'default',
		...restProps
	}: BadgeProps = $props();
</script>

<div bind:this={ref} class={cn(badgeVariants({ variant }), className)} {...restProps}></div>
