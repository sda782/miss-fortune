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
    chestState: boolean
}