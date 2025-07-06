import type { RegistryItem } from '@shadcn-svelte/registry';
import { Context } from 'runed';

export const ComponentCardContext = new Context<RegistryItem>('component-card');
