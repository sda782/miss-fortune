import { type Writable, writable } from "svelte/store";
import type { champion, championMastery } from "../Models/champion";
import { searchUser } from "./userManager";
import type { account } from "../Models/account";
import { getChallengesForUser, getChampionsMastery } from "./Api";
import type { ChallengesType } from "../Models/challenges";

export const champions = writable([])
export const ver = writable("")
export const champMastery: Writable<championMastery[]> = writable(undefined)

export const selectedChampion: Writable<champion> = writable(undefined)
export const selectedChampionMastery: Writable<championMastery> = writable(undefined)

const stored = localStorage.getItem("defaultUsername")

export const username = writable(stored || "")
export const targetChampionName = writable("")

export const challenges: Writable<ChallengesType | undefined> = writable(undefined)

username.subscribe((uname: string) => {
    localStorage.setItem("defaultUsername", uname)
    searchUser(uname).then(async (res: account) => {
        champMastery.set(await getChampionsMastery(res.id))
        challenges.set(await getChallengesForUser(res.puuid))
    })
})