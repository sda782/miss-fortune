import axios, { AxiosResponse } from "axios"
import type { account } from "../Models/account"
import type { champion, championMastery } from "../Models/champion"
import { arrangeChampion } from "./utils";

export const getLatestVersion = async (): Promise<string> => {
    const res: AxiosResponse = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
    return res.data[0]
}
export const getChampions = async (version: string): Promise<champion[]> => {
    const res: AxiosResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
    return arrangeChampion(res);
}

export const getChampion = async (championKey: string, version: string): Promise<champion> => {
    const res: AxiosResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${championKey}.json`)

    let champions: champion[] = Object.keys(res.data.data).map((i) => {
        return res.data.data[i]
    });

    return champions[0];
}

export const getAccountIdsByName = async (username: string): Promise<account> => {
    const res: AxiosResponse = await axios.get(`https://riot-api-proxy.vercel.app/riotapi/summoner/v4/summoners/by-name/${username}`)
    return res.data
}

export const getChampionsMastery = async (encryptedSummonerId: string): Promise<championMastery[]> => {
    const res: AxiosResponse = await axios.get(`https://riot-api-proxy.vercel.app/riotapi/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}`)
    return res.data
}