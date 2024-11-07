<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import IconFacebook from '~icons/ri/facebook-fill';
	import IconGithub from '~icons/ri/github-fill';
	import IconGoogle from '~icons/ri/google-fill';
	import IconTwitter from '~icons/ri/twitter-x-fill';
</script>

<div class="flex flex-wrap gap-2">
	<Button class="flex-1" variant="outline" aria-label="Login with Google" size="icon">
		<IconGoogle
			class="text-[#DB4437] dark:text-primary"
			width="16"
			height="16"
			aria-hidden="true"
		/>
	</Button>
	<Button class="flex-1" variant="outline" aria-label="Login with Facebook" size="icon">
		<IconFacebook
			class="text-[#1877f2] dark:text-primary"
			width="16"
			height="16"
			aria-hidden="true"
		/>
	</Button>
	<Button class="flex-1" variant="outline" aria-label="Login with X" size="icon">
		<IconTwitter
			class="text-[#14171a] dark:text-primary"
			width="16"
			height="16"
			aria-hidden="true"
		/>
	</Button>
	<Button class="flex-1" variant="outline" aria-label="Login with GitHub" size="icon">
		<IconGithub class="text-black dark:text-primary" width="16" height="16" aria-hidden="true" />
	</Button>
</div>
