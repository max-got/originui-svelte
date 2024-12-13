<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
</script>

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
	<Button
		variant="secondary"
		class="flex size-10 items-center justify-center rounded-full bg-secondary text-xs text-muted-foreground ring-2 ring-background hover:bg-secondary hover:text-foreground"
		size="icon"
	>
		+3
	</Button>
</div>
