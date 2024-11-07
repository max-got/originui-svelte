<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	import Mail from 'lucide-svelte/icons/mail';
</script>

<div class="space-y-2">
	<Label for="input-10">Input with end icon</Label>
	<div class="relative">
		<Input id="input-10" class="peer pe-9" placeholder="Email" type="email" />
		<div
			class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50"
		>
			<Mail size={16} stroke-width={2} aria-hidden="true" />
		</div>
	</div>
</div>
