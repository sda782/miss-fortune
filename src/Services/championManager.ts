import type {champion, championMastery} from "../Models/champion";

export const searchChampion = (champions: champion[], targetChampionName: string): champion[] => {

    champions.forEach((champ: champion) => {
        champ.display = champ.name
            .toLowerCase()
            .startsWith(targetChampionName.toLowerCase());
    });
    console.log(champions)
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

const findChampionMasteryById = (championId: string, championMastery: championMastery[]): championMastery => {
    return championMastery.find(
        (champ: championMastery) => champ.championId.toString() == championId
    )
}