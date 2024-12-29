<script lang="ts" module>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	import { tv, type VariantProps } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: 'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
		defaultVariants: {
			size: 'default',
			variant: 'default'
		},
		variants: {
			size: {
				default: 'h-9 px-4 py-2',
				icon: 'size-9',
				lg: 'h-10 rounded-lg px-8',
				sm: 'h-8 rounded-lg px-3 text-xs'
			},
			variant: {
				default:
					'bg-primary text-primary-foreground shadow-sm shadow-black/[0.04] hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm shadow-black/[0.04] hover:bg-destructive/90',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				outline:
					'border border-input bg-background shadow-sm shadow-black/[0.04] hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground shadow-sm shadow-black/[0.04] hover:bg-secondary/80'
			}
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			size?: ButtonSize;
			variant?: ButtonVariant;
		};
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

	let {
		children,
		class: className,
		href = null,
		ref = $bindable(null),
		size = 'default',
		variant = 'default',
		...restProps
	}: ButtonProps = $props();
</script>

{#if !href && restProps?.role !== 'link'}
	<button
		bind:this={ref}
		type="button"
		class={cn(buttonVariants({ className, size, variant }))}
		{...restProps}
	>
		{@render children?.()}
	</button>
{:else}
	<a bind:this={ref} {href} class={cn(buttonVariants({ className, size, variant }))} {...restProps}>
		{@render children?.()}
	</a>
{/if}
