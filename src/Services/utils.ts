import type {AxiosResponse} from "axios";
import type {champion} from "../Models/champion";
import {searchUser} from "./userManager";
import {champions, champMastery, targetChampionName, username} from "./Store";
import {searchChampion} from "./championManager";
import {get} from "svelte/store";

let lastGroupLetter = ""
export const showLetter = (name: string): boolean => {
    if (lastGroupLetter.toLowerCase() !== name.toLowerCase()[0]) {
        lastGroupLetter = name.toLowerCase()[0]
        return true;
    }
    return false;
};

const sortCompare = (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
}

export const arrangeChampion = (res: AxiosResponse): champion[] => {
    let champions: champion[] = Object.keys(res.data.data).map((i) => {
        return res.data.data[i]
    });
    champions.forEach((c: champion) => c.display = true)
    champions.sort((a, b) => sortCompare(a, b))
    return champions
}

export const setUpParams = (): void => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((val, key) => {
        switch (key) {
            case "name":
                searchUser(val).then((data) => {
                    champMastery.set(data)
                    username.set(val)
                });
                break
            case "champion":
                champions.set(searchChampion(get(champions), val))
                targetChampionName.set(val)
                break
        }
    })
}