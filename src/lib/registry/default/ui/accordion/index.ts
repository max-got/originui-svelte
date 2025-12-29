/* eslint-disable perfectionist/sort-named-exports */
import { Accordion as AccordionPrimitive } from 'bits-ui';

import Content from './accordion-content.svelte';
import Item from './accordion-item.svelte';
import Trigger from './accordion-trigger.svelte';

const Root = AccordionPrimitive.Root;

export {
	Content,
	Content as AccordionContent,
	Item,
	Item as AccordionItem,
	Root,
	Root as Accordion,
	Trigger,
	Trigger as AccordionTrigger
};
