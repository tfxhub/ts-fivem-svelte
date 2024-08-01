import type { Item } from '$typings/inventory';
import { writable } from 'svelte/store';

export const DraggedItem = writable<Item | null>(null);
export const MousePosition = writable<{ x: number, y: number }>({ x: 0, y: 0 });