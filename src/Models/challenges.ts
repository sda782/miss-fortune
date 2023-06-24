
export interface ChallengesType {
    challenges: ChallengInfo[]
    preferences: PlayerClientPreferences
    totalPoints: ChallgengePoints
    categoryPoints: Map<string, ChallgengePoints>
}

export interface ChallgengePoints {
    level: string
    current: number
    max: number
    percenttile: number
}
export interface PlayerClientPreferences {
    bannerAccent: string
    title: string
    challengeIds: number[]
    crestBorder: string
    prestigeCrestBorderLevel: number
}

export interface ChallengInfo {
    challengeId: number
    percenttile: number
    level: string
    value: number
    achievedTime: number
}