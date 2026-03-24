<script lang="ts">
	import type { Attachment } from 'svelte/attachments';

	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	import { formatGeneral } from 'cleave-zen';

	const cvcAttachment: Attachment<HTMLInputElement> = (input) => {
		const handleInput = (event: Event) => {
			const target = event.target as HTMLInputElement;
			target.value = formatGeneral(target.value, {
				blocks: [4],
				numericOnly: true
			});
		};

		input.addEventListener('input', handleInput);

		return () => input.removeEventListener('input', handleInput);
	};
</script>

<div class="*:not-first:mt-2">
	<Label for="input-50">Code</Label>
	<Input
		id="input-50"
		type="text"
		placeholder="CVC"
		autocomplete="cc-csc"
		class="peer pe-11"
		{@attach cvcAttachment}
	/>
	<p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
		Built with <a
			class="hover:text-foreground underline"
			href="https://github.com/nosir/cleave-zen"
			target="_blank"
			rel="noopener nofollow"
		>
			cleave-zen
		</a>
	</p>
</div>
