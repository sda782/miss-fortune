export interface champion {
    version: string,
    id: string,
    key: string,
    name: string,
    image: {
        full: string,
        x: number,
        y: number,
        w: number,
        h: number
    },
    blurb: string,
    display: boolean
}

export interface championMastery {
    championId: number,
    championLevel: number,
    championPoints: number,
    lastPlayTime: number,
    championPointsSinceLastLevel: number,
    championPointsUntilNextLevel: number,
    chestGranted: boolean,
    tokensEarned: number,
    summonerId: string
}