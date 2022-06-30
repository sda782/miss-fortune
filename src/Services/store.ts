import { writable } from "svelte/store";

let initStates: string[] = []
export const cheststates = writable(initStates)

