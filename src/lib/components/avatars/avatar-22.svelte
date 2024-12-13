<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
</script>

<div
	class="flex items-center rounded-full border border-border bg-background p-1 shadow shadow-black/5"
>
	<div class="flex -space-x-3">
		<enhanced:img
			class="size-10 rounded-full ring-2 ring-background"
			src="/static/avatar-80-03.jpg"
			alt="Avatar 01"
			loading="lazy"
			decoding="async"
		/>
		<enhanced:img
			class="size-10 rounded-full ring-2 ring-background"
			src="/static/avatar-80-05.jpg"
			alt="Avatar 02"
			loading="lazy"
			decoding="async"
		/>
		<enhanced:img
			class="size-10 rounded-full ring-2 ring-background"
			src="/static/avatar-80-06.jpg"
			alt="Avatar 03"
			loading="lazy"
			decoding="async"
		/>
		<enhanced:img
			class="size-10 rounded-full ring-2 ring-background"
			src="/static/avatar-80-07.jpg"
			alt="Avatar 04"
			loading="lazy"
			decoding="async"
		/>
	</div>
	<Button
		variant="secondary"
		class="flex items-center justify-center rounded-full bg-transparent px-3 text-xs text-muted-foreground shadow-none hover:bg-transparent hover:text-foreground"
	>
		+3
	</Button>
</div>
