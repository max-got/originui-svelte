<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import IconFacebook from '~icons/ri/facebook-fill';
	import IconGithub from '~icons/ri/github-fill';
	import IconGoogle from '~icons/ri/google-fill';
	import IconTwitter from '~icons/ri/twitter-x-fill';
</script>

<div class="inline-flex flex-wrap gap-2">
	<Button variant="outline" aria-label="Login with Google" size="icon">
		<IconGoogle width="16" height="16" aria-hidden="true" />
	</Button>
	<Button variant="outline" aria-label="Login with Facebook" size="icon">
		<IconFacebook width="16" height="16" aria-hidden="true" />
	</Button>
	<Button variant="outline" aria-label="Login with X" size="icon">
		<IconTwitter width="16" height="16" aria-hidden="true" />
	</Button>
	<Button variant="outline" aria-label="Login with GitHub" size="icon">
		<IconGithub width="16" height="16" aria-hidden="true" />
	</Button>
</div>
