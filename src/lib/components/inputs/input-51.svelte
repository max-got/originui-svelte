<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import { cn } from '$lib/utils.js';

	import Check from 'lucide-svelte/icons/check';
	import Eye from 'lucide-svelte/icons/eye';
	import EyeOff from 'lucide-svelte/icons/eye-off';
	import X from 'lucide-svelte/icons/x';

	let password = $state('');
	let isVisible = $state(false);

	function toggleVisibility() {
		isVisible = !isVisible;
	}

	const requirements = [
		{ regex: /.{8,}/, text: 'At least 8 characters' },
		{ regex: /[0-9]/, text: 'At least 1 number' },
		{ regex: /[a-z]/, text: 'At least 1 lowercase letter' },
		{ regex: /[A-Z]/, text: 'At least 1 uppercase letter' }
	] as const;

	const strength = $derived(
		requirements.map((req) => ({
			met: req.regex.test(password),
			text: req.text
		}))
	);

	const strengthScore = $derived(strength.filter((req) => req.met).length);

	function getStrengthColor(score: number) {
		if (score === 0) return 'bg-border';
		if (score <= 1) return 'bg-red-500';
		if (score <= 2) return 'bg-orange-500';
		if (score === 3) return 'bg-amber-500';
		return 'bg-emerald-500';
	}

	function getStrengthText(score: number) {
		if (score === 0) return 'Enter a password';
		if (score <= 2) return 'Weak password';
		if (score === 3) return 'Medium password';
		return 'Strong password';
	}
</script>

<div>
	<!-- Password input field with toggle visibility button -->
	<div class="space-y-2">
		<Label for="input-51">Input with password strength indicator</Label>
		<div class="relative">
			<Input
				id="input-51"
				class="pe-9"
				placeholder="Password"
				type={isVisible ? 'text' : 'password'}
				bind:value={password}
				aria-invalid={strengthScore < 4}
				aria-describedby="password-strength"
			/>
			<button
				class="absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
				type="button"
				onclick={toggleVisibility}
				aria-label={isVisible ? 'Hide password' : 'Show password'}
				aria-pressed={isVisible}
				aria-controls="password"
			>
				{#if isVisible}
					<EyeOff size={16} strokeWidth={2} aria-hidden="true" />
				{:else}
					<Eye size={16} strokeWidth={2} aria-hidden="true" />
				{/if}
			</button>
		</div>
	</div>

	<!-- Password strength indicator -->
	<div
		class="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
		role="progressbar"
		aria-valuenow={strengthScore}
		aria-valuemin={0}
		aria-valuemax={4}
		aria-label="Password strength"
	>
		<div
			class={cn(`h-full transition-all duration-500 ease-out`, getStrengthColor(strengthScore))}
			style:width="{(strengthScore / 4) * 100}%"
		></div>
	</div>

	<!-- Password strength description -->
	<p id="password-strength" class="mb-2 text-sm font-medium text-foreground">
		{getStrengthText(strengthScore)}. Must contain:
	</p>

	<!-- Password requirements list -->
	<ul class="space-y-1.5" aria-label="Password requirements">
		{#each strength as req}
			<li class="flex items-center space-x-2">
				{#if req.met}
					<Check size={16} class="text-emerald-500" aria-hidden="true" />
				{:else}
					<X size={16} class="text-muted-foreground/80" aria-hidden="true" />
				{/if}
				<span class={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}>
					{req.text}
					<span class="sr-only">
						{req.met ? ' - Requirement met' : ' - Requirement not met'}
					</span>
				</span>
			</li>
		{/each}
	</ul>
</div>
