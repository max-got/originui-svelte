<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import AvatarImg01 from '$assets/avatar-80-03.jpg?w=80&h=80&enhanced';
	import AvatarImg02 from '$assets/avatar-80-05.jpg?w=80&h=80&enhanced';
	import AvatarImg03 from '$assets/avatar-80-06.jpg?w=80&h=80&enhanced';
	import AvatarImg04 from '$assets/avatar-80-07.jpg?w=80&h=80&enhanced';
</script>

<div
	class="flex items-center rounded-full border border-border bg-background p-1 shadow shadow-black/5"
>
	<div class="flex -space-x-3">
		<enhanced:img
			class="size-10 rounded-full ring-2 ring-background"
			src={AvatarImg01}
			alt="Avatar 01"
			loading="lazy"
			decoding="async"
		/>
		<enhanced:img
			class="size-10 rounded-full ring-2 ring-background"
			src={AvatarImg02}
			alt="Avatar 02"
			loading="lazy"
			decoding="async"
		/>
		<enhanced:img
			class="size-10 rounded-full ring-2 ring-background"
			src={AvatarImg03}
			alt="Avatar 03"
			loading="lazy"
			decoding="async"
		/>
		<enhanced:img
			class="size-10 rounded-full ring-2 ring-background"
			src={AvatarImg04}
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
