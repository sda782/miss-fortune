import { writable } from "svelte/store";
import type { championState } from "../Models/champion";
import { readFromStorage, writeToStorage } from "./utils";

const cheststatesInit: championState[] = readFromStorage('lolstate')

export const cheststates = writable(cheststatesInit)

cheststates.subscribe(val => {
    writeToStorage('lolstate', val)
})

