<!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
<script lang="ts" generics="T = any">
	import type { HTMLAttributes } from 'svelte/elements';

	import {
		AssistiveDndState,
		type DndState,
		type HotkeysConfig,
		type TreeInstance
	} from '@headless-tree/core';

	type Props = HTMLAttributes<HTMLSpanElement> & {
		getLabel?: typeof getDefaultLabel;
		tree: TreeInstance<T>;
	};

	const { getLabel = getDefaultLabel, tree, ...props }: Props = $props();

	function getDefaultLabel<T>(
		dnd: DndState<T> | null | undefined,
		assistiveState: AssistiveDndState,
		hotkeys: HotkeysConfig<T>
	) {
		const itemNames = dnd?.draggedItems?.map((item) => item.getItemName()).join(', ') ?? '';
		const position = !dnd?.dragTarget
			? 'None'
			: 'childIndex' in dnd.dragTarget
				? `${dnd.dragTarget.childIndex} of ${dnd.dragTarget.item.getChildren().length} in ${dnd.dragTarget.item.getItemName()}`
				: `in ${dnd.dragTarget.item.getItemName()}`;
		const navGuide =
			`Press ${hotkeys.dragUp.hotkey} and ${hotkeys.dragDown.hotkey} to move up or down, ` +
			`${hotkeys.completeDrag.hotkey} to drop, ${hotkeys.cancelDrag.hotkey} to abort.`;
		switch (assistiveState) {
			case AssistiveDndState.Aborted:
				return `Drag cancelled. Press ${hotkeys.startDrag.hotkey} to move selected items`;
			case AssistiveDndState.Completed:
				return `Drag completed. Press ${hotkeys.startDrag.hotkey} to move selected items`;
			case AssistiveDndState.Dragging:
				return itemNames ? `${itemNames}, ${position}` : position;
			case AssistiveDndState.Started:
				return itemNames
					? `Dragging ${itemNames}. Current position: ${position}. ${navGuide}`
					: `Current position: ${position}. ${navGuide}`;
			case AssistiveDndState.None:
			default:
				return `Press ${hotkeys.startDrag.hotkey} to move selected items`;
		}
	}

	const state = $derived(tree.getState());

	const styles = Object.entries({
		clip: 'rect(0 0 0 0)',
		height: '1px',
		margin: '-1px',
		overflow: 'hidden',
		position: 'absolute',
		width: '1px'
	})
		.map(([key, value]) => `${key}: ${value}`)
		.join('; ');

	const mergedStyle = $derived.by(() => [styles, props.style].filter(Boolean).join('; '));
</script>

<span aria-live="assertive" {...props} style={mergedStyle}>
	{getLabel(state.dnd, state.assistiveDndState ?? AssistiveDndState.None, tree.getHotkeyPresets())}
</span>
