<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import QrCode from 'lucide-svelte/icons/qr-code';
</script>

<div
	class="inline-flex -space-x-px divide-x divide-primary-foreground/30 rounded-lg shadow-sm shadow-black/[0.04] rtl:space-x-reverse"
>
	<Button
		class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
		size="icon"
		aria-label="QR code"
	>
		<QrCode size={16} stroke-width={2} aria-hidden="true" />
	</Button>
	<Button class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10">
		Sign in
	</Button>
</div>
