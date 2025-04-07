<script lang="ts" module>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	import { tv, type VariantProps } from 'tailwind-variants';

	export const badgeVariants = tv({
		base: 'inline-flex items-center justify-center rounded-full border px-1.5 text-xs font-medium leading-normal transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70',
		defaultVariants: {
			variant: 'default'
		},
		variants: {
			variant: {
				default: 'border-transparent bg-primary text-primary-foreground',
				destructive: 'border-transparent bg-destructive text-destructive-foreground',
				outline: 'text-foreground',
				secondary: 'border-transparent bg-secondary text-secondary-foreground'
			}
		}
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

	export type BadgeProps = WithElementRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
		class?: string;
		variant?: BadgeVariant;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

	let {
		children,
		class: className,
		ref = $bindable(null),
		variant = 'default',
		...restProps
	}: BadgeProps = $props();
</script>

<div class={cn(badgeVariants({ className, variant }))} bind:this={ref} {...restProps}>
	{@render children?.()}
</div>
