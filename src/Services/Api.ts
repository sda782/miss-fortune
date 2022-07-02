import axios, { AxiosResponse } from "axios"
import type { account } from "../Models/account"
import type { champion, championMastery } from "../Models/champion"

const dev_key = ""
const rgapi_header = { headers: { 'X-Riot-token': dev_key } }

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
    const res: AxiosResponse = await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`, rgapi_header)
    return res.data
}

export const getChampionsMastery = async (encryptedSummonerId: string): Promise<championMastery[]> => {
    const res: AxiosResponse = await axios.get(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}`, rgapi_header)
    return res.data
}