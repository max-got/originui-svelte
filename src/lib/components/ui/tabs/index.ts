/* eslint-disable perfectionist/sort-named-exports */

import Content from './tabs-content.svelte';
import List from './tabs-list.svelte';
import Trigger from './tabs-trigger.svelte';

import { Tabs as TabsPrimitive } from 'bits-ui';

const Root = TabsPrimitive.Root;

export {
	Root,
	Content,
	List,
	Trigger,
	//
	Root as Tabs,
	Content as TabsContent,
	List as TabsList,
	Trigger as TabsTrigger
};
