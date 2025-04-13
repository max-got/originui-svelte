import type { Action } from 'svelte/action';

export const clickOutside: Action<
	HTMLElement,
	undefined | { ignore?: string },
	{ onclickoutside: (e: CustomEvent<boolean>) => void }
> = (node: HTMLElement, { ignore = '' } = {}) => {
	const handleClick = (event: Event) => {
		const target = event.target as HTMLElement;
		if (!event.target || (ignore && target.closest(ignore))) {
			return;
		}
		if (node && !node.contains(target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickoutside'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
