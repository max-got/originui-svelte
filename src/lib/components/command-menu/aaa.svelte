<script lang="ts">
	import type { Component } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import Button from '../ui/button.svelte';
	import CommandMenuItem from './command-menu-item.svelte';
	import CommandMenuKbd from './command-menu-kbd.svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { commandComponentContext } from '$lib/context/command-componen-context.svelte';
	import { useSearchPageState } from '$lib/state/search-page.svelte';

	import { CornerDownLeftIcon, LinkIcon, Tag } from '@lucide/svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { llmsTxtLinks } from '$lib/data/api/llms.txt.links';
	import { registryTagCounts, registryTags } from '$lib/registry/tags';
	import { cn } from '$lib/utils';
	import { encodeQueryItem } from 'ufo';
	const isMac =
		browser && (navigator.platform.includes('MAC') || navigator.platform.includes('Mac'));
	let open = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
			if (
				(e.target instanceof HTMLElement && e.target.isContentEditable) ||
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement ||
				e.target instanceof HTMLSelectElement
			) {
				return;
			}
			goto('/search');
			e.preventDefault();
			open = !open;
		}
	}
	function handleOpenChange(isOpen: boolean) {
		if (!isOpen && page.url.pathname === '/search') goto('/');
		else if (isOpen && page.url.pathname === '/') goto('/search');
		open = isOpen;
	}

	const { setTags } = useSearchPageState();
</script>

<svelte:document onkeydown={handleKeydown} />

<Dialog.Root {open} onOpenChange={handleOpenChange}>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="secondary"
				class={cn('relative justify-start md:w-40 lg:w-56 xl:w-64')}
				aria-label="Open command menu"
				onclick={() => (open = true)}
			>
				<span class="inline-flex">Search...</span>
				<div class="flex gap-1">
					<CommandMenuKbd>{isMac ? '⌘' : 'Ctrl'}</CommandMenuKbd>
					<CommandMenuKbd class="aspect-square">K</CommandMenuKbd>
				</div>
			</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content
		class="ring-svelte/70 bg-background  rounded-md border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4"
	>
		<Dialog.Header class="sr-only">
			<Dialog.Title>Search Components...</Dialog.Title>
			<Dialog.Description>Search for a command to run...</Dialog.Description>
		</Dialog.Header>
		<Command.Root
			class="**:data-[slot=command-input-wrapper]:bg-background **:data-[slot=command-input-wrapper]:border-input rounded-none bg-transparent **:data-[slot=command-input]:!h-9 **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:!h-9 **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border **:data-[slot=command-input-wrapper]:focus-visible:ring-0 **:data-[slot=command-input-wrapper]:focus-visible:outline-none"
		>
			<Command.Input placeholder="Search components..." />
			<Command.List class="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5  ">
				<Command.Empty class="text-muted-foreground py-12 text-center text-sm">
					No results found.
				</Command.Empty>
				<Command.Group heading="Suggestions">
					<Command.LinkItem href="/search">
						<Tag class="text-muted-foreground/80 size-4" />
						Search for Tags
					</Command.LinkItem>
					<Command.LinkItem href="/search/llms">
						<Tag class="text-muted-foreground/80 size-4" />
						Search for LLMs.txt
					</Command.LinkItem>
				</Command.Group>
				{#if registryTags?.length}
					<Command.Group heading="Component Tags">
						{#each registryTags as tag (tag)}
							<Command.Item
								value={tag}
								keywords={['tag', tag]}
								onSelect={() => {
									goto(`/search?${encodeQueryItem('tags', [tag])}`);
									open = false;
								}}
							>
								<Tag class="text-muted-foreground/80 size-4" />
								{tag}
								<span
									class="text-muted-foreground ml-auto font-mono text-xs font-normal tabular-nums"
								>
									{registryTagCounts[tag]}
								</span>
							</Command.Item>
						{/each}
					</Command.Group>
				{/if}
				<Command.Group heading="LLMs.txt">
					{#each llmsTxtLinks as link (link.label)}
						<Command.Item
							value={link.label}
							keywords={['llm', 'markdown', 'txt', 'llms.txt', 'ai', 'cursor', 'gpt', link.label]}
						>
							<LinkIcon class="text-muted-foreground/80 size-4" />
							{link.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
		<div
			class="text-muted-foreground border-t-svelte/20 bg-svelte/20 absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-md border-t px-4 text-xs font-medium"
		>
			<div class="flex items-center gap-2">
				<CommandMenuKbd>
					<span>Press</span>
					<CornerDownLeftIcon class="size-4" />
					<span>to continue</span>
				</CommandMenuKbd>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
