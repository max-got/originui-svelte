<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import IconFacebook from '~icons/ri/facebook-fill';
	import IconGithub from '~icons/ri/github-fill';
	import IconGoogle from '~icons/ri/google-fill';
	import IconTwitter from '~icons/ri/twitter-x-fill';
</script>

<div class="flex w-full flex-col gap-2">
	<Button variant="outline">
		<IconGoogle
			class="me-3 text-[#DB4437] dark:text-white/60"
			width="16"
			height="16"
			aria-hidden="true"
		/>
		Login with Google
	</Button>
	<Button variant="outline">
		<IconTwitter
			class="me-3 text-[#14171a] dark:text-white/60"
			width="16"
			height="16"
			aria-hidden="true"
		/>
		Login with X
	</Button>
	<Button variant="outline">
		<IconFacebook
			class="me-3 text-[#1877f2] dark:text-white/60"
			width="16"
			height="16"
			aria-hidden="true"
		/>
		Login with Facebook
	</Button>
	<Button variant="outline">
		<IconGithub
			class="me-3 text-[#333333] dark:text-white/60"
			width="16"
			height="16"
			aria-hidden="true"
		/>
		Login with GitHub
	</Button>
</div>
