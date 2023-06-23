import {getAccountIdsByName, getChampionsMastery} from "./Api";
import type {championMastery} from "../Models/champion";
import {setParams} from "./utils";

export const searchUser = async (username: string): Promise<championMastery[]> => {
    const ids = await getAccountIdsByName(username);
    setParams("name", username)
    return await getChampionsMastery(ids.id)
};