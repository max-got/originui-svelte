<script lang="ts">
	import Eye from '@lucide/svelte/icons/eye';
	import EyeOff from '@lucide/svelte/icons/eye-off';

	import Input from '$lib/registry/default/ui/input.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';

	let isVisible = $state(false);

	function toggleVisibility() {
		isVisible = !isVisible;
	}

	const uid = $props.id();
</script>

<div class="*:not-first:mt-2">
	<Label for={uid}>Show/hide password input</Label>
	<div class="relative">
		<Input id={uid} class="pe-9" placeholder="Password" type={isVisible ? 'text' : 'password'} />
		<button
			class="text-muted-foreground/80 ring-offset-background hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:ring-ring/30 absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg transition-shadow focus-visible:border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
			type="button"
			onclick={toggleVisibility}
			aria-label={isVisible ? 'Hide password' : 'Show password'}
			aria-pressed={isVisible}
			aria-controls={uid}
		>
			{#if isVisible}
				<EyeOff size={16} aria-hidden="true" />
			{:else}
				<Eye size={16} aria-hidden="true" />
			{/if}
		</button>
	</div>
</div>
