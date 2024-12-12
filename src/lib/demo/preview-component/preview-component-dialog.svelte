<script lang="ts">
	import type { AvailableOUIComponent } from '$data/api/components.handler';

	import Component from './preview-component.svelte';
	import * as Dialog from '$lib/demo/ui/dialog/index.js';
	import * as Drawer from '$lib/demo/ui/drawer/index.js';

	import { MediaQuery } from 'runed';
	const screen = new MediaQuery('(min-width: 768px)');

	type PreviewProps = {
		closeDialog: () => void;
		componentMetadata?: AvailableOUIComponent;
		dialogOpen: boolean;
	};
	let { closeDialog, componentMetadata, dialogOpen }: PreviewProps = $props();
</script>

{#if componentMetadata}
	{#if screen.matches}
		<Dialog.Root
			open={dialogOpen}
			onOpenChange={(open) => {
				if (!open) closeDialog();
			}}
		>
			<Dialog.Portal>
				<Dialog.Overlay />
				<Dialog.Content class="max-w-6xl ">
					<Component {componentMetadata} />
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	{:else}
		<Drawer.Root open={dialogOpen} onClose={() => closeDialog()}>
			<Drawer.Content>
				<div
					class="max-h-[calc(100vh-5rem)] overflow-y-auto supports-[max-height:100dvh]:max-h-[calc(100dvh-5rem)]"
				>
					<Component {componentMetadata} />
				</div>
			</Drawer.Content>
		</Drawer.Root>
	{/if}
{/if}
