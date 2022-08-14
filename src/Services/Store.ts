import {writable} from "svelte/store";

export const champions = writable([])
export const ver = writable("")
export const champMastery = writable([])

export const username = writable("")
export const targetChampionName = writable("")