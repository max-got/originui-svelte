<script lang="ts">
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';
</script>

<div class="rounded-lg border border-border px-4 py-3">
	<p class="text-sm">
		<TriangleAlert
			class="-mt-0.5 me-3 inline-flex text-amber-500"
			size={16}
			strokeWidth={2}
			aria-hidden="true"
		/>Some information is missing!
	</p>
</div>
