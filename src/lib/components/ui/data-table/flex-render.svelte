<script
	lang="ts"
	generics="TData, TValue, TContext extends CellContext<TData, TValue> | HeaderContext<TData, TValue>"
>
	import type { CellContext, ColumnDefTemplate, HeaderContext } from '@tanstack/table-core';
	import type { Attachment } from 'svelte/attachments';

	import { RenderComponentConfig, RenderSnippetConfig } from './render-helpers.js';
	type Props = {
		/** Used to pass attachments that can't be gotten through context */
		attach?: Attachment;
		/** The cell or header field of the current cell's column definition. */
		content?: TContext extends HeaderContext<TData, TValue>
			? ColumnDefTemplate<HeaderContext<TData, TValue>>
			: TContext extends CellContext<TData, TValue>
				? ColumnDefTemplate<CellContext<TData, TValue>>
				: never;
		/** The result of the `getContext()` function of the header or cell */
		context: TContext;
	};
	let { attach, content, context }: Props = $props();
</script>

{#if typeof content === 'string'}
	{content}
{:else if content instanceof Function}
	<!-- It's unlikely that a CellContext will be passed to a Header -->
	<!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
	{@const result = content(context as any)}
	{#if result instanceof RenderComponentConfig}
		{@const { component: Component, props } = result}
		<Component {...props} {attach} />
	{:else if result instanceof RenderSnippetConfig}
		{@const { params, snippet } = result}
		{@render snippet({ ...params, attach })}
	{:else}
		{result}
	{/if}
{/if}
