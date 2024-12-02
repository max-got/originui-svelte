/* eslint-disable perfectionist/sort-named-exports */
import type { AvailableOUIComponent } from '$lib/utils/handleComponentSource';

import preview from './preview-component-dialog.svelte';
import component from './preview-component.svelte';

import { getContext, setContext } from 'svelte';

const PREVIEW_CTX_KEY = Symbol('ctx:preview-component-dialog');

type PreviewComponentDialogProps = {
	componentMetadata?: AvailableOUIComponent;
};

class PreviewComponentDialog {
	#abortController = new AbortController();

	componentMetadata = $state<PreviewComponentDialogProps['componentMetadata']>();
	dialogOpen = $state(false);

	constructor(props: PreviewComponentDialogProps) {
		this.componentMetadata = props.componentMetadata;

		$effect(() => {
			window.addEventListener('popstate', this.#handlePopState, {
				signal: this.#abortController.signal
			});

			return () => this.#abortController.abort();
		});
	}

	#handlePopState = () => {
		if (!this.dialogOpen) return;
		this.reset();
	};

	reset = () => {
		this.componentMetadata = undefined;
		this.dialogOpen = false;
	};

	openDialog = (componentMetadata: AvailableOUIComponent): void => {
		this.componentMetadata = componentMetadata;
		this.dialogOpen = true;
	};

	closeDialog = (): void => {
		history.back();
	};
}

const setPreviewComponentDialogCtx = (props: PreviewComponentDialogProps) => {
	return setContext(PREVIEW_CTX_KEY, new PreviewComponentDialog(props));
};

const getPreviewComponentDialogCtx = (): PreviewComponentDialog => {
	return getContext<ReturnType<typeof setPreviewComponentDialogCtx>>(PREVIEW_CTX_KEY);
};

export {
	getPreviewComponentDialogCtx,
	setPreviewComponentDialogCtx,
	//
	preview as Dialog,
	component as Component
};
