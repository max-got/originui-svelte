<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { ComponentRender } from '$lib/types/components.js';
	import CopyButton from '$lib/demo/copy-button.svelte';
	import ViewToggleButton from './demo-view-toggle-button.svelte';

	import CodePreview from '$lib/demo/code-preview.svelte';
	import { page } from '$app/stores';

	let {
		component,
		class: className,
		shallowCodeShow = true,
		onShowCode
	}: {
		component: ComponentRender;
		shallowCodeShow?: boolean;
		onShowCode?: (url: string) => void;
		class?: string;
	} = $props();

	let showCode = $state(false);
	async function toggleView() {
		showCode = !showCode;
	}

	const url = $derived(`${$page.url}/${component.id}`);

	//!TODO: in the best case, showCode should automatically be set to true when component is rendered as an shallow route
</script>

{#snippet actionButtons({ source }: { source: string })}
	<div
		class={cn(
			'absolute right-2 top-2 z-10 flex items-center gap-x-2 rounded-lg border border-transparent bg-background/30 backdrop-blur-sm transition-colors',
			showCode && 'border border-input',
			!showCode &&
				'lg:opacity-0 lg:group-focus-within/item:opacity-100 lg:group-hover/item:opacity-100 '
		)}
	>
		{#if !shallowCodeShow}
			<ViewToggleButton {showCode} onToggle={toggleView} />
			<div class="h-6 w-px bg-border"></div>
		{:else}
			<ViewToggleButton
				{showCode}
				onToggle={() => {
					onShowCode?.(url);
				}}
			/>
			<div class="h-6 w-px bg-border"></div>
		{/if}
		<CopyButton code={source} />
	</div>
{/snippet}

<div class={cn('group/item', className)} data-preview-code={showCode ? 'true' : undefined}>
	{#if component && component.code.copyable.content && component.code.preview.content}
		{@render actionButtons({ source: component.code.copyable.content })}
		{#if showCode}
			<CodePreview code={component.code.highlighted.content} />
		{:else}
			<component.render />
		{/if}
	{:else}
		<div
			class="flex h-full flex-col items-center justify-center text-center text-sm text-muted-foreground"
		>
			<p>Component not available</p>
			<a class="underline hover:text-foreground" href="https://github.com/max-got/originui-svelte">
				Create a pull request
			</a>
		</div>
	{/if}
</div>
