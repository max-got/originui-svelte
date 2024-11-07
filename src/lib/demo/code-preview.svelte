<script lang="ts">
	let { code }: { code: string } = $props();
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html code}

<style>
	:global(pre.shiki) {
		@apply h-full overflow-auto rounded-md px-2 py-4 text-left text-sm;
	}

	:global(html.dark .shiki),
	:global(html.dark .shiki span) {
		color: var(--shiki-dark) !important;
		background-color: transparent !important;
	}

	:global(.shiki .collapsed-section-wrapper) {
		display: contents;
		:global(.collapsible-toggle) {
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
		&[data-open='false'] {
			:global(.collapsed-section) {
				position: absolute;
				left: -9999px;
				max-height: 0px;
				overflow: hidden;
				opacity: 0;
			}
		}
	}

	:global(.shiki code) {
		counter-reset: step;
		counter-increment: step 0;
	}

	:global(code .line::before) {
		content: counter(step);
		counter-increment: step;
		width: 1rem;
		margin-right: 1.5rem;
		display: inline-block;
		text-align: right;
		color: rgba(115, 138, 148, 0.4);
	}
</style>
