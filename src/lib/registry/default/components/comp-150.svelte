<script lang="ts">
	import MoonIcon from '@lucide/svelte/icons/moon';
	import SunIcon from '@lucide/svelte/icons/sun';

	let theme = $state<'dark' | 'light'>('light');
	const id = $props.id();

	function setTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
	}
</script>

<div class="space-y-4">
	<legend class="text-foreground text-sm leading-none font-medium">
		Dark mode toggle checkbox
	</legend>
	<div class="flex flex-col justify-center">
		<input
			type="checkbox"
			name={id}
			{id}
			class="peer sr-only"
			checked={theme === 'dark'}
			onchange={setTheme}
		/>
		<label
			class="group border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 relative inline-flex size-9 items-center justify-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none peer-focus-visible:ring-[3px]"
			for={id}
			aria-label="Switch to {theme === 'dark' ? 'light' : 'dark'} mode"
		>
			<!-- Note: After dark mode implementation, rely on dark: prefix rather than group-peer-checked: -->
			<MoonIcon
				size={16}
				class="shrink-0 scale-0 opacity-0 transition-all group-peer-checked:scale-100 group-peer-checked:opacity-100"
				aria-hidden="true"
			/>
			<SunIcon
				size={16}
				class="absolute shrink-0 scale-100 opacity-100 transition-all group-peer-checked:scale-0 group-peer-checked:opacity-0"
				aria-hidden="true"
			/>
		</label>
	</div>
</div>
