<script lang="ts">
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
</script>

<div class="rounded-lg border border-border px-4 py-3">
	<p class="text-sm">
		<CircleAlert
			class="-mt-0.5 me-3 inline-flex text-red-500"
			size={16}
			strokeWidth={2}
			aria-hidden="true"
		/>An error occurred!
	</p>
</div>
