import { IStat } from "./stat.model";

export interface IPokemon{
    id: number;
    name: string;
    type: string;
    type2?: string;
    sprite: string;
    height: number;
    weight: number;
    abilities: string[];
    hiddenAbility?: string;
    stats: IStat[]

}

