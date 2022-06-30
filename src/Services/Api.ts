import axios, { AxiosResponse } from "axios"
import type { champion } from "../Models/champion"

export const getLastestVersion = async (): Promise<string> => {
    const res: AxiosResponse = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
    return res.data[0]
}
export const getChampions = async (version: string): Promise<champion> => {
    const res: AxiosResponse = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
    return res.data.data;
}