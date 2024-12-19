import { tick } from 'svelte';

export class LocalStorage<T> {
	#key: string;
	#version = $state(0);
	#listeners = 0;
	#value: T | undefined;

	#handler = (e: StorageEvent) => {
		if (e.storageArea !== localStorage) return;
		if (e.key !== this.#key) return;

		this.#version += 1;
	};

	constructor(key: string, initial?: T) {
		this.#key = key;
		this.#value = initial;

		if (typeof localStorage !== 'undefined') {
			if (localStorage.getItem(key) === null) {
				localStorage.setItem(key, JSON.stringify(initial));
			}
		}
	}

	get current() {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		this.#version;

		const root =
			typeof localStorage !== 'undefined'
				? // eslint-disable-next-line @typescript-eslint/no-explicit-any
					JSON.parse(localStorage.getItem(this.#key) as any)
				: this.#value;

		const proxies = new WeakMap();

		const proxy = (value: unknown) => {
			if (typeof value !== 'object' || value === null) {
				return value;
			}

			let p = proxies.get(value);

			if (!p) {
				p = new Proxy(value, {
					get: (target, property) => {
						// eslint-disable-next-line @typescript-eslint/no-unused-expressions
						this.#version;
						return proxy(Reflect.get(target, property));
					},
					set: (target, property, value) => {
						this.#version += 1;
						Reflect.set(target, property, value);

						if (typeof localStorage !== 'undefined') {
							localStorage.setItem(this.#key, JSON.stringify(root));
						}

						return true;
					}
				});

				proxies.set(value, p);
			}

			return p;
		};

		if ($effect.tracking()) {
			$effect(() => {
				if (this.#listeners === 0) {
					window.addEventListener('storage', this.#handler);
				}

				this.#listeners += 1;

				return () => {
					tick().then(() => {
						this.#listeners -= 1;
						if (this.#listeners === 0) {
							window.removeEventListener('storage', this.#handler);
						}
					});
				};
			});
		}

		return proxy(root);
	}

	set current(value) {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(this.#key, JSON.stringify(value));
		}

		this.#version += 1;
	}
}

export function useLocalStorage<T>(key: string, initial?: T) {
	return new LocalStorage<T>(key, initial);
}
