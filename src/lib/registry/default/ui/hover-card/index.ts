import Content from './hover-card-content.svelte';

/* eslint-disable perfectionist/sort-named-exports */
import { LinkPreview as HoverCardPrimitive } from 'bits-ui';
const Root = HoverCardPrimitive.Root;
const Trigger = HoverCardPrimitive.Trigger;

export {
	Root,
	Content,
	Trigger,
	Root as HoverCard,
	Content as HoverCardContent,
	Trigger as HoverCardTrigger
};
