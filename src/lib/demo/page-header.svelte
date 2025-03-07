<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	type PageHeaderProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		title: string;
	};
	let { children, ref = $bindable(null), title, ...restProps }: PageHeaderProps = $props();
</script>

<div bind:this={ref} class={cn('mb-16 text-center', restProps.class)}>
	<h1 id="title" class="mb-3 font-serif text-4xl/[1.1] font-bold text-foreground md:text-5xl/[1.1]">
		{title}
	</h1>
	<p class="text-lg text-muted-foreground">
		{@render children?.()}
	</p>
</div>
