<script lang="ts">
	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdowns';
	import Button from '$lib/registry/default/ui/button.svelte';
</script>

<DropdownMenu>
	<DropdownMenuTrigger>
		{#snippet child({ props })}
			<Button variant="outline" {...props}>
				Same width of trigger
				<ChevronDown class="-me-1 opacity-60" size={16} aria-hidden="true" />
			</Button>
		{/snippet}
	</DropdownMenuTrigger>
	<DropdownMenuContent class="min-w-(--bits-dropdown-menu-anchor-width)">
		<DropdownMenuItem>Option 1</DropdownMenuItem>
		<DropdownMenuItem>Option 2</DropdownMenuItem>
		<DropdownMenuItem>Option 3</DropdownMenuItem>
		<DropdownMenuItem>Option 4</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>
