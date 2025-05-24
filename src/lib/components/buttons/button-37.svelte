<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import GitForkIcon from '@lucide/svelte/icons/git-fork';
</script>

<div
	class="shadow-xs inline-flex divide-x divide-primary-foreground/30 rounded-md rtl:space-x-reverse"
>
	<Button class="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10">
		<GitForkIcon class="opacity-60" size={16} aria-hidden="true" />
		Fork
		<span
			class="-me-1 ms-1 inline-flex h-5 max-h-full items-center rounded border border-primary-foreground/30 px-1 font-[inherit] text-[0.625rem] font-medium text-primary-foreground/60"
		>
			18
		</span>
	</Button>
	<Button
		class="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
		size="icon"
		aria-label="Options"
	>
		<ChevronDownIcon size={16} aria-hidden="true" />
	</Button>
</div>
