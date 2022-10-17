import { Writable, writable } from "svelte/store";
import type { champion, championMastery } from "../Models/champion";

export const champions = writable([])
export const ver = writable("")
export const champMastery: Writable<championMastery[]> = writable(undefined)

export const selectedChampion: Writable<champion> = writable(undefined)
export const selectedChampionMastery: Writable<championMastery> = writable(undefined)


export const username = writable("")
export const targetChampionName = writable("")