import type { ComponentRoutePath } from '$lib/config/routes';

import { createPreviousAccessedStorage } from './previous-accessed-storage.svelte';
import { PreviousAccessedStorage } from './previous-accessed-storage.svelte';

import { beforeEach, describe, expect, it } from 'vitest';

import type {
	ComponentMetadata,
	LocalStorageComponentsData
} from './previous-accessed-storage.svelte';

const mockMetadata = {
	completed: 10,
	path: 'inputs' as ComponentRoutePath,
	todo: 5,
	total: 15
} satisfies ComponentMetadata;

const updatedMetadata = {
	completed: 12,
	path: 'inputs' as ComponentRoutePath,
	todo: 8,
	total: 20
} satisfies ComponentMetadata;

const additionalMetadata = {
	completed: 20,
	path: 'buttons' as ComponentRoutePath,
	todo: 10,
	total: 30
} satisfies ComponentMetadata;

describe('PreviousAccessedStorage', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	describe('Initialization', () => {
		it('should create storage instance with initial metadata', () => {
			const storage = createPreviousAccessedStorage(mockMetadata);
			expect(storage).toBeInstanceOf(PreviousAccessedStorage);

			const components = storage.getCurrentComponents();
			expect(components).toEqual({
				[mockMetadata.path]: {
					completed: mockMetadata.completed,
					todo: mockMetadata.todo,
					total: mockMetadata.total
				}
			} satisfies Partial<LocalStorageComponentsData>);
		});

		it('should initialize with empty data', () => {
			const storage = new PreviousAccessedStorage({});
			expect(storage.getCurrentComponents()).toEqual({});
			expect(storage.isMismatch).toBe(false);
		});
	});

	describe('Component Count Management', () => {
		it('should correctly calculate new component count', () => {
			const storage = createPreviousAccessedStorage(mockMetadata);
			const newCount = storage.getNewComponentCount(updatedMetadata);
			expect(newCount).toBe(updatedMetadata.total - mockMetadata.total);
		});

		it('should return correct count when no previous data exists', () => {
			const storage = new PreviousAccessedStorage({});
			const newCount = storage.getNewComponentCount(mockMetadata);
			expect(newCount).toBe(mockMetadata.total);
		});
	});

	describe('Metadata Updates', () => {
		it('should update component metadata', () => {
			const storage = createPreviousAccessedStorage(mockMetadata);
			storage.updateComponentMetadata(updatedMetadata);

			const components = storage.getCurrentComponents();
			expect(components[updatedMetadata.path]).toEqual({
				completed: updatedMetadata.completed,
				todo: updatedMetadata.todo,
				total: updatedMetadata.total
			});
		});

		it('should preserve existing data when updating metadata', () => {
			const storage = createPreviousAccessedStorage(mockMetadata);
			storage.updateComponentMetadata(additionalMetadata);

			const components = storage.getCurrentComponents();
			expect(components).toEqual({
				[additionalMetadata.path]: {
					completed: additionalMetadata.completed,
					todo: additionalMetadata.todo,
					total: additionalMetadata.total
				},
				[mockMetadata.path]: {
					completed: mockMetadata.completed,
					todo: mockMetadata.todo,
					total: mockMetadata.total
				}
			} satisfies Partial<LocalStorageComponentsData>);
		});
	});

	describe('Mismatch Detection', () => {
		it('should detect mismatch when component stats change', () => {
			const storage = createPreviousAccessedStorage(mockMetadata);
			storage.updateComponentMetadata(updatedMetadata);
			expect(storage.isMismatch).toBe(true);
		});

		it('should not detect mismatch for identical values', () => {
			const storage = createPreviousAccessedStorage(mockMetadata);
			storage.updateComponentMetadata({ ...mockMetadata });
			expect(storage.isMismatch).toBe(false);
		});

		it('should not detect mismatch for different components', () => {
			const storage = createPreviousAccessedStorage(mockMetadata);
			storage.updateComponentMetadata(additionalMetadata);
			expect(storage.isMismatch).toBe(false);
		});
	});

	describe('Storage Operations', () => {
		it('should persist data in localStorage', () => {
			const storage = createPreviousAccessedStorage(mockMetadata);
			const newStorage = createPreviousAccessedStorage(mockMetadata);

			expect(newStorage.getCurrentComponents()).toEqual(storage.getCurrentComponents());
		});

		it('should merge new data with existing localStorage data', () => {
			const storage = createPreviousAccessedStorage(mockMetadata);
			storage.updateComponentMetadata(additionalMetadata);

			const newStorage = createPreviousAccessedStorage(mockMetadata);
			const components = newStorage.getCurrentComponents();

			expect(components).toHaveProperty(mockMetadata.path);
			expect(components).toHaveProperty(additionalMetadata.path);
		});
	});
});
