<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, title }: { children: Snippet; title: string } = $props();
</script>

<div class="my-16 text-center">
	<h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">{title}</h1>
	<p class="text-muted-foreground">
		{@render children()}
	</p>
</div>
