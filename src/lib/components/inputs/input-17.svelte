<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Input with start select</Label>
	<div class="flex rounded-lg shadow-sm shadow-black/[.04]">
		<div class="relative">
			<select
				class="peer inline-flex h-full appearance-none items-center rounded-s-lg border border-input bg-background pe-8 ps-3 text-sm text-muted-foreground ring-offset-background transition-shadow hover:bg-accent hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
				aria-label="Protocol"
			>
				<option value="https://">https://</option>
				<option value="http://">http://</option>
				<option value="ftp://">ftp://</option>
				<option value="sftp://">sftp://</option>
				<option value="ws://">ws://</option>
				<option value="wss://">wss://</option>
			</select>
			<span
				class="pointer-events-none absolute inset-y-0 end-px flex h-full w-9 items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50"
			>
				<ChevronDown size={16} stroke-width={2} aria-hidden="true" />
			</span>
		</div>
		<Input
			id={uid}
			class="-ms-px rounded-s-none shadow-none focus-visible:z-10"
			placeholder="192.168.1.1"
			type="text"
		/>
	</div>
</div>
