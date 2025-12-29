<script lang="ts">
	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuRadioGroup,
		DropdownMenuRadioItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdowns';
	import Button from '$lib/registry/default/ui/button.svelte';

	let framework = $state('sveltekit');
</script>

<DropdownMenu>
	<DropdownMenuTrigger>
		{#snippet child({ props })}
			<Button variant="outline" {...props}>
				Radio items
				<ChevronDown class="-me-1 opacity-60" size={16} aria-hidden="true" />
			</Button>
		{/snippet}
	</DropdownMenuTrigger>
	<DropdownMenuContent>
		<DropdownMenuRadioGroup value={framework} onValueChange={(value) => (framework = value)}>
			<DropdownMenuRadioItem value="sveltekit">SvelteKit</DropdownMenuRadioItem>
			<DropdownMenuRadioItem value="nextjs" disabled>Next.js</DropdownMenuRadioItem>
			<DropdownMenuRadioItem value="remix">Remix</DropdownMenuRadioItem>
			<DropdownMenuRadioItem value="astro">Astro</DropdownMenuRadioItem>
		</DropdownMenuRadioGroup>
	</DropdownMenuContent>
</DropdownMenu>
