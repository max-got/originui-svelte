<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdowns';
	import Heading1 from 'lucide-svelte/icons/heading-1';
	import Heading2 from 'lucide-svelte/icons/heading-2';
	import Minus from 'lucide-svelte/icons/minus';
	import Plus from 'lucide-svelte/icons/plus';
	import TextQuote from 'lucide-svelte/icons/text-quote';
	import Type from 'lucide-svelte/icons/type';
</script>

<DropdownMenu>
	<DropdownMenuTrigger>
		{#snippet child({ props })}
			<Button
				size="icon"
				variant="ghost"
				class="rounded-full shadow-none"
				aria-label="Open edit menu"
				{...props}
			>
				<Plus size={16} stroke-width={2} aria-hidden="true" />
			</Button>
		{/snippet}
	</DropdownMenuTrigger>
	<DropdownMenuContent class="pb-2">
		<DropdownMenuLabel>Add block</DropdownMenuLabel>
		<DropdownMenuItem>
			<div
				class="flex size-8 items-center justify-center rounded-lg border border-border bg-background"
				aria-hidden="true"
			>
				<Type size={16} stroke-width={2} class="opacity-60" />
			</div>
			<div>
				<div class="text-sm font-medium">Text</div>
				<div class="text-xs text-muted-foreground">Start writing with plain text</div>
			</div>
		</DropdownMenuItem>
		<DropdownMenuItem>
			<div
				class="flex size-8 items-center justify-center rounded-lg border border-border bg-background"
				aria-hidden="true"
			>
				<TextQuote size={16} stroke-width={2} class="opacity-60" />
			</div>
			<div>
				<div class="text-sm font-medium">Quote</div>
				<div class="text-xs text-muted-foreground">Capture a quote</div>
			</div>
		</DropdownMenuItem>
		<DropdownMenuItem>
			<div
				class="flex size-8 items-center justify-center rounded-lg border border-border bg-background"
				aria-hidden="true"
			>
				<Minus size={16} stroke-width={2} class="opacity-60" />
			</div>
			<div>
				<div class="text-sm font-medium">Divider</div>
				<div class="text-xs text-muted-foreground">Visually divide blocks</div>
			</div>
		</DropdownMenuItem>
		<DropdownMenuItem>
			<div
				class="flex size-8 items-center justify-center rounded-lg border border-border bg-background"
				aria-hidden="true"
			>
				<Heading1 size={16} stroke-width={2} class="opacity-60" />
			</div>
			<div>
				<div class="text-sm font-medium">Heading 1</div>
				<div class="text-xs text-muted-foreground">Big section heading</div>
			</div>
		</DropdownMenuItem>
		<DropdownMenuItem>
			<div
				class="flex size-8 items-center justify-center rounded-lg border border-border bg-background"
				aria-hidden="true"
			>
				<Heading2 size={16} stroke-width={2} class="opacity-60" />
			</div>
			<div>
				<div class="text-sm font-medium">Heading 2</div>
				<div class="text-xs text-muted-foreground">Medium section subheading</div>
			</div>
		</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>
