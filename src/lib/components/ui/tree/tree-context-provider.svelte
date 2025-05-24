<script lang="ts">
	import type { Snippet } from 'svelte';

	import { treeContext, type TreeContextValue } from './tree-context.svelte';

	type TreeContextProviderProps = TreeContextValue & {
		children: Snippet<[]>;
	};

	const { children, ...props }: TreeContextProviderProps = $props();

	treeContext.set(props);
</script>

{@render children()}
