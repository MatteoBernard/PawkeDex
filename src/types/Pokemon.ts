import {Ability} from "./Ability";
import {Move} from "./Move";
import {Type} from "./Type";
import {Stat} from "./Stat";
import {Sprite} from "./Sprite";

export interface Pokemon {
    abilities: Ability[];
    base_experience: number;
    cries: {
        latest: string;
        legacy: string;
    }
    height: number;
    id: number;
    is_default: boolean;
    moves: Move[];
    name: string;
    order: number;
    species: {
        name: string;
        url: string;
    };
    sprites: Sprite;
    stats: Stat[];
    types: Type[];
    weight: number;
}