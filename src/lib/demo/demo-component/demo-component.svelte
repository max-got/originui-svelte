<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { ComponentRender } from '$lib/types/components.js';
	import CopyButton from '$lib/demo/copy-button.svelte';
	import ViewToggleButton from './demo-view-toggle-button.svelte';

	let {
		component,
		class: className
	}: {
		component: ComponentRender;
		class?: string;
	} = $props();

	let showCode = $state(false);
	let Preview = $state<typeof import('$lib/demo/code-preview.svelte').default | null>(null);
	let CodePreview = $state<typeof import('$lib/demo/code-preview.svelte').default | null>(null);

	async function loadPreview() {
		if (!Preview) {
			Preview = (await import('$lib/demo/code-preview.svelte')).default;
		}
	}
	function toggleView() {
		showCode = !showCode;
		if (showCode) {
			loadCodePreview();
		}
	}
	async function loadCodePreview() {
		if (!CodePreview) {
			CodePreview = (await import('$lib/demo/code-preview.svelte')).default;
		}
	}

	$effect(() => {
		loadPreview();
	});
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
		<ViewToggleButton {showCode} onToggle={toggleView} />
		<div class="h-6 w-px bg-border"></div>
		<CopyButton code={source} />
	</div>
{/snippet}

<div class={cn('group/item', className)} data-preview-code={showCode ? 'true' : undefined}>
	{#if component && component.code.copyable.content && component.code.preview.content}
		{@render actionButtons({ source: component.code.copyable.content })}
		{#if showCode}
			{#if CodePreview}
				<CodePreview code={component.code.highlighted.content} />
			{/if}
		{:else if Preview}
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
