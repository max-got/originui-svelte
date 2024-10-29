<script lang="ts">
	import 'svelte-tel-input/styles/flags.css';
	import type { ChangeEventHandler } from 'svelte/elements';

	import type { CountryCode, E164Number } from 'svelte-tel-input/types';
	import { TelInput, normalizedCountries } from 'svelte-tel-input';

	import Label from '$lib/components/ui/label.svelte';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import Phone from 'lucide-svelte/icons/phone';

	let selectedCountry = $state<CountryCode | null>(null);
	let value = $state<E164Number | null>(null);

	const handleCountryChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
		const { value } = e.currentTarget;
		selectedCountry = (value as CountryCode) || null;
	};
</script>

<div class="space-y-2" dir="ltr">
	<Label for="input-46">Phone number input</Label>
	<div class="flex rounded-lg shadow-sm shadow-black/[.04]">
		<div
			class="relative inline-flex items-center self-stretch rounded-l-lg border border-input bg-background py-2 pe-2 ps-3 text-muted-foreground ring-offset-background transition-shadow focus-within:z-10 focus-within:border-ring focus-within:text-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring/30 focus-within:ring-offset-2 hover:bg-accent hover:text-foreground has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50"
		>
			<div class="inline-flex items-center gap-1" aria-hidden="true">
				<span class="flex h-[16px] w-5 items-center overflow-hidden rounded-sm">
					{#if selectedCountry}
						<span
							class="flag flag-{selectedCountry.toLowerCase()} !h-[13px] !w-5"
							aria-hidden="true"
						></span>
					{:else}
						<Phone size={16} aria-hidden="true" />
					{/if}
				</span>
				<span class="text-muted-foreground/80">
					<ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
				</span>
			</div>
			<select
				onchange={handleCountryChange}
				class="absolute inset-0 text-sm opacity-0"
				aria-label="Select country"
			>
				<option value="">Select a country</option>
				{#each normalizedCountries as country (country.id)}
					<option value={country.id}>
						{country.label}
					</option>
				{/each}
			</select>
		</div>
		<TelInput
			id="input-46"
			required
			placeholder="Enter phone number"
			class="-ml-px flex h-9 w-full rounded-lg rounded-l-none border border-input bg-background px-3 py-2 text-sm text-foreground shadow-none shadow-black/[.04] ring-offset-background transition-shadow placeholder:text-muted-foreground/70 focus-visible:z-10 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			bind:country={selectedCountry}
			bind:value
			options={{
				format: 'international'
			}}
		/>
	</div>
	<p class="mt-2 text-xs text-muted-foreground" role="region" aria-live="polite">
		Built with <a
			class="underline hover:text-foreground"
			href="https://github.com/gyurielf/svelte-tel-input/tree/main"
			target="_blank"
			rel="noopener nofollow"
		>
			svelte-tel-input
		</a>
	</p>
</div>
