<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import { useLocale } from '$lib/hooks/use-locale.svelte';

	import { DateField } from 'bits-ui';

	const localeCtx = useLocale();
</script>

<div class="space-y-2">
	<Label class="text-sm font-medium text-foreground">Date input</Label>
	<DateField.Root locale={localeCtx.locale}>
		<DateField.Input
			class="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm shadow-black/[.04] ring-offset-background transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-2 focus-within:ring-ring/30 focus-within:ring-offset-2 data-[disabled]:opacity-50"
		>
			{#snippet children({ segments })}
				<!-- eslint-disable-next-line svelte/require-each-key -->
				{#each segments as { part, value }}
					<DateField.Segment
						{part}
						class="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 focus:bg-accent focus:text-foreground aria-[valuetext=Empty]:text-muted-foreground/70 focus:aria-[valuetext=Empty]:text-foreground data-[disabled]:cursor-not-allowed data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[invalid]:text-destructive data-[segment=literal]:text-muted-foreground/70 data-[disabled]:opacity-50 data-[invalid]:focus:data-[placeholder]:text-destructive-foreground data-[invalid]:focus:text-destructive-foreground data-[invalid]:aria-[valuetext=Empty]:text-destructive"
					>
						{value}
					</DateField.Segment>
				{/each}
			{/snippet}
		</DateField.Input>
	</DateField.Root>
	<p class="mt-2 text-xs text-muted-foreground" role="region" aria-live="polite">
		Built with <a
			class="underline hover:text-foreground"
			href="https://next.bits-ui.com/docs/components/date-field"
			target="_blank"
			rel="noopener nofollow"
		>
			Bits UI DateField
		</a>
	</p>
</div>
