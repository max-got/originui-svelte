<script lang="ts">
	import CheckboxTree, { type TreeNode } from '$lib/components/ui/checkbox-tree.svelte';
	import Checkbox from '$lib/components/ui/checkbox.svelte';
	import Label from '$lib/components/ui/label.svelte';

	const initialTree: TreeNode = {
		children: [
			{ defaultChecked: true, id: 'mountains', label: 'Mountains' },
			{
				children: [
					{ id: 'niagara', label: 'Niagara Falls' },
					{ defaultChecked: true, id: 'angel-falls', label: 'Angel Falls' }
				],
				id: 'waterfalls',
				label: 'Waterfalls'
			},
			{ id: 'grand-canyon', label: 'Grand Canyon' }
		],
		id: 'natural-wonders',
		label: 'Natural Wonders'
	};
</script>

<div class="space-y-3">
	<CheckboxTree tree={initialTree}>
		{#snippet renderNode({ children, id, isChecked, label, onCheckedChange })}
			<div class="ms-6 flex items-center gap-2">
				<Checkbox {id} checked={isChecked} {onCheckedChange} />
				<Label for={id}>{label}</Label>
			</div>

			{#if children}
				{#each children as child (child.id)}
					<div class="ms-6 space-y-3">
						{@render renderNode({ ...child })}
					</div>
				{/each}
			{/if}
		{/snippet}
	</CheckboxTree>
</div>
