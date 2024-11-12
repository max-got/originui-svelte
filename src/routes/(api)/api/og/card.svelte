<script lang="ts">
	type Props = {
		author: string;

		title: string;
		website: string;
	};

	let { author = 's', title = 's', website = 's' }: Props = $props();
</script>

<div style="display:flex;">
	<p>{title}</p>
</div>
