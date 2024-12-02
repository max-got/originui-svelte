<script lang="ts">
	import * as DemoComponents from '$lib/demo/demo-component/index.js';
	import PageHeader from '$lib/demo/page-header.svelte';

	let { data } = $props();

	const totalAlerts = data.alertComponents.length;
	const totalBanners = data.bannerComponents.length;
	const totalNotifications = data.notificationComponents.length;
	const totalComponents = totalAlerts + totalBanners + totalNotifications;
</script>

<main>
	<div class="px-4 sm:px-6">
		<div class="mx-auto w-full max-w-6xl">
			<PageHeader title="Alert, Notification, and Banner">
				A growing collection of {totalComponents} alert, notification, and banner components built with
				<span class="text-svelte">Svelte</span> and TailwindCSS.
			</PageHeader>

			<div
				class="grid max-w-6xl grid-cols-1 overflow-hidden border-b border-border/70 sm:grid-cols-2 [&>*]:relative [&>*]:px-1 [&>*]:py-12 [&>*]:before:absolute [&>*]:before:bg-border/70 [&>*]:before:[block-size:100vh] [&>*]:before:[inline-size:1px] [&>*]:before:[inset-block-start:0] [&>*]:before:[inset-inline-start:-1px] [&>*]:after:absolute [&>*]:after:bg-border/70 [&>*]:after:[block-size:1px] [&>*]:after:[inline-size:100vw] [&>*]:after:[inset-block-start:-1px] [&>*]:after:[inset-inline-start:0] sm:[&>*]:px-8 xl:[&>*]:px-12"
			>
				{#each data.alertComponents as component (component.id)}
					<DemoComponents.Demo {component} />
				{/each}
			</div>
			<div
				class="grid max-w-6xl grid-cols-1 overflow-hidden border-b border-border/70 sm:grid-cols-2 [&>*]:relative [&>*]:px-1 [&>*]:py-12 [&>*]:before:absolute [&>*]:before:bg-border/70 [&>*]:before:[block-size:100vh] [&>*]:before:[inline-size:1px] [&>*]:before:[inset-block-start:0] [&>*]:before:[inset-inline-start:-1px] [&>*]:after:absolute [&>*]:after:bg-border/70 [&>*]:after:[block-size:1px] [&>*]:after:[inline-size:100vw] [&>*]:after:[inset-block-start:-1px] [&>*]:after:[inset-inline-start:0] sm:[&>*]:px-8 xl:[&>*]:px-12"
			>
				{#each data.notificationComponents as component (component.id)}
					{#if component.id != 'notification-23'}
						<DemoComponents.Demo class="flex items-center justify-center" {component} />
					{/if}
				{/each}
			</div>
			<div
				class="grid max-w-6xl grid-cols-1 overflow-hidden [&>*]:relative [&>*]:px-1 [&>*]:py-12 [&>*]:before:absolute [&>*]:before:bg-border/70 [&>*]:before:[block-size:100vh] [&>*]:before:[inline-size:1px] [&>*]:before:[inset-block-start:0] [&>*]:before:[inset-inline-start:-1px] [&>*]:after:absolute [&>*]:after:bg-border/70 [&>*]:after:[block-size:1px] [&>*]:after:[inline-size:100vw] [&>*]:after:[inset-block-start:-1px] [&>*]:after:[inset-inline-start:0] sm:[&>*]:px-8 xl:[&>*]:px-12"
			>
				<DemoComponents.Demo component={data.notificationComponents[22]} />
				{#each data.bannerComponents as component (component.id)}
					<DemoComponents.Demo {component} />
				{/each}
			</div>
		</div>
	</div>
</main>
