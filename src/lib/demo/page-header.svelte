<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type PageHeaderProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		//make snippet non-optional
		children: Snippet;
		title: string;
	};
	let { children, ref = $bindable(null), title, ...restProps }: PageHeaderProps = $props();
</script>

<div bind:this={ref} class="my-16 text-center" {...restProps}>
	<h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">{title}</h1>
	<p class="text-muted-foreground">
		{@render children()}
	</p>
</div>
