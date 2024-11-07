<script module lang="ts">
	// [!code collapse-start]
	/**
	 * IMPORTANT: This component was built for demo purposes only and has not been tested in production.
	 * It serves as a proof of concept for a date picker.
	 * If you're interested in collaborating to create a more robust, production-ready
	 * headless component, your contributions are welcome!
	 */
	import { getContext, setContext } from 'svelte';

	const LOCALE_CONTEXT_KEY = Symbol('ctx:locale');
	interface LocaleOptions {
		locale?: string;
	}

	function getDefaultLocale(): string {
		if (typeof navigator !== 'undefined' && navigator.language) {
			return navigator.language;
		}
		return 'en-US';
	}

	export class LocaleManager {
		#locale = $state<string>('');

		constructor(options: LocaleOptions = {}) {
			this.#locale = options.locale ?? getDefaultLocale();
		}

		get locale(): string {
			return this.#locale;
		}

		set locale(value: string) {
			this.#locale = value;
		}
	}

	export function useLocale(options: LocaleOptions = {}): LocaleManager {
		const contextLocale = getContext<LocaleManager | undefined>(LOCALE_CONTEXT_KEY);

		if (contextLocale) {
			return contextLocale;
		}

		const localeManager = new LocaleManager(options);
		setContext(LOCALE_CONTEXT_KEY, localeManager);

		return localeManager;
	}
	// [!code collapse-end]
</script>

<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';

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
				{#each segments as segment}
					<DateField.Segment
						part={segment.part}
						class="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 focus:bg-accent focus:text-foreground aria-[valuetext=Empty]:text-muted-foreground/70 focus:aria-[valuetext=Empty]:text-foreground data-[disabled]:cursor-not-allowed data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[invalid]:text-destructive data-[segment=literal]:text-muted-foreground/70 data-[disabled]:opacity-50 data-[invalid]:focus:data-[placeholder]:text-destructive-foreground data-[invalid]:focus:text-destructive-foreground data-[invalid]:aria-[valuetext=Empty]:text-destructive"
					>
						{segment.value}
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
