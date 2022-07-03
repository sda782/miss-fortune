import axios, { AxiosResponse } from "axios"
import type { account } from "../Models/account"
import type { champion, championMastery } from "../Models/champion"

export const getLastestVersion = async (): Promise<string> => {
    const res: AxiosResponse = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
    return res.data[0]
}
export const getChampions = async (version: string): Promise<champion[]> => {
    const res: AxiosResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
    let data: champion[] = Object.keys(res.data.data).map((i) => {
        let championData = res.data.data[i]
        return championData
    });
    return data;
}

export const getAccountIdsByName = async (username: string): Promise<account> => {
    const res: AxiosResponse = await axios.get(`https://riot-api-proxy.vercel.app/riotapi/summoner/v4/summoners/by-name/${username}`)
    return res.data
}

export const getChampionsMastery = async (encryptedSummonerId: string): Promise<championMastery[]> => {
    const res: AxiosResponse = await axios.get(`https://riot-api-proxy.vercel.app/riotapi/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}`)
    return res.data
}