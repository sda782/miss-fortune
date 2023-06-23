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
    partype: string,
    title: string,
    stats: stats,
    skins: skin[],
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

export interface skin {
    id: number,
    num: null
    name: string,
    chromas: boolean
}

interface stats {
    armor: number,
    armorperlevel: number,
    attackdamage: number,
    attackdamageperlevel: number,
    attackrange: number,
    attackspeed: number,
    attackspeedperlevel: number,
    crit: number,
    critperlevel: number,
    hp: number,
    hpperlevel: number,
    hpregen: number,
    hpregenperlevel: number,
    movespeed: number,
    mp: number,
    mpperlevel: number,
    mpregen: number,
    mpregenperlevel: number,
    spellblock: number,
    spellblockperlevel: number,
}