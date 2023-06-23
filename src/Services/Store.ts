import { Writable, writable } from "svelte/store";
import type { champion, championMastery } from "../Models/champion";

export const champions = writable([])
export const ver = writable("")
export const champMastery: Writable<championMastery[]> = writable(undefined)

export const selectedChampion: Writable<champion> = writable(undefined)
export const selectedChampionMastery: Writable<championMastery> = writable(undefined)

const stored = localStorage.getItem("defaultUsername")

export const username = writable(stored || "")
export const targetChampionName = writable("")

username.subscribe((val) => localStorage.setItem("defaultUsername", val))