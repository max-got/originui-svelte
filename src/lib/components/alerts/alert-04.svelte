<script lang="ts">
	import CircleAlert from '@lucide/svelte/icons/circle-alert';
</script>

<div class="rounded-lg border border-red-500/50 px-4 py-3 text-red-600">
	<p class="text-sm">
		<CircleAlert
			class="-mt-0.5 me-3 inline-flex opacity-60"
			size={16}
			strokeWidth={2}
			aria-hidden="true"
		/>An error occurred!
	</p>
</div>
