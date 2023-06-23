import type { champion, championMastery } from "../Models/champion";
import { setParams } from "./utils";

export const searchChampion = (champions: champion[], targetChampionName: string): champion[] => {

    champions.forEach((champ: champion) => {
        champ.display = champ.name
            .toLowerCase()
            .startsWith(targetChampionName.toLowerCase());
    });
    setParams("champion", targetChampionName)
    return champions
};

export const hasChest = (champion: champion, championMastery: championMastery[]): boolean => {
    let champ: championMastery = findChampionMasteryById(champion.key, championMastery)
    if (champ === undefined) return false;
    return champ.chestGranted;
};
export const getMasteryLvl = (champion: champion, championMastery: championMastery[]): string => {
    let champ: championMastery = findChampionMasteryById(champion.key, championMastery)
    if (champ === undefined) return "";
    return champ.championLevel.toString();
};

export const getMasteryForChampion = (champion: champion, championMastery: championMastery[]): championMastery => {
    let champMastery: championMastery = findChampionMasteryById(champion.key, championMastery)
    return champMastery
}

const findChampionMasteryById = (championId: string, championMastery: championMastery[]): championMastery => {
    return championMastery.find(
        (champ: championMastery) => champ.championId.toString() == championId
    )
}