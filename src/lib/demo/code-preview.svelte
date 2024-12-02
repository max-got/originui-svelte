<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement> & {
		code: string;
	};
	let { code, ...restProps }: Props = $props();
</script>

<div class="_code_wrapper contents" {...restProps}>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html code}
</div>

<style lang="postcss">
	:global(pre.shiki) {
		@apply relative h-full overflow-x-auto rounded-md px-2 py-4 text-left text-sm;
	}

	:global(html.dark .shiki),
	:global(html.dark .shiki span) {
		color: var(--shiki-dark) !important;
		background-color: transparent !important;
	}

	._code_wrapper :global {
		/* prettier adds a line at the end of the file
			isntead of tangling with js, we can just use css 
			*/
		.shiki span.line:last-of-type:empty {
			display: none;
		}

		.shiki .collapsed-section-wrapper {
			display: contents;

			&[data-open='false'] {
				.collapsed-section {
					position: absolute;
					left: -9999px;
					max-height: 0px;
					overflow: hidden;
					opacity: 0;
				}
			}
			.collapsible-toggle {
				position: relative;
				margin-left: 1rem;
				display: inline-flex;
				align-items: center;
				border-radius: var(--radius);
				border: 1px solid hsl(var(--border));
				background-color: hsl(var(--muted));
				padding: 0.25rem 0.625rem;
				font-size: 0.75rem;
				color: hsl(var(--foreground));
				box-shadow: 0 1px 2px 0 hsla(0 0 0 / 0.05);
				transition-property: all;
				transition-duration: 150ms;

				&:hover {
					border-color: hsl(var(--border) / 0.5);
					background-color: hsl(var(--muted) / 0.5);
				}
			}
		}
	}
</style>
