import {getAccountIdsByName, getChampionsMastery} from "./Api";
import type {championMastery} from "../Models/champion";

export const searchUser = async (username:string): Promise<championMastery[]> => {
    const ids = await getAccountIdsByName(username);
    return await getChampionsMastery(ids.id)
};